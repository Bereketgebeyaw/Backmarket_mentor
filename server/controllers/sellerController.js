import db from "../db.js"; // Replace with your actual database connection
import { sendApprovalEmail, sendDenialEmail } from "./mailer.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getPendingSellers = async (req, res) => {
  try {
    // Fetch sellers with status 'pending', including relevant fields, by joining users table
    const result = await db.query(
      `SELECT sellers.*, users.name, users.email, users.password 
       FROM sellers 
       JOIN users ON sellers.user_id = users.id
       WHERE sellers.status = 'pending'`
    );

    const sellers = result.rows.map((seller) => {
      // If the seller has a kebele_id (binary), convert to base64 if it exists
      if (seller.kebele_id) {
        seller.kebele_id = `data:application/pdf;base64,${seller.kebele_id.toString(
          "base64"
        )}`;
      }

      // If the seller has a business_license (binary), convert to base64 if it exists
      if (seller.business_license) {
        seller.business_license = `data:application/pdf;base64,${seller.business_license.toString(
          "base64"
        )}`;
      }

      // If the seller has a tin_certificate (binary), convert to base64 if it exists
      if (seller.tin_certificate) {
        seller.tin_certificate = `data:application/pdf;base64,${seller.tin_certificate.toString(
          "base64"
        )}`;
      }

      // If the seller has a vat_certificate (binary), convert to base64 if it exists
      if (seller.vat_certificate) {
        seller.vat_certificate = `data:application/pdf;base64,${seller.vat_certificate.toString(
          "base64"
        )}`;
      }

      // Return the seller information
      return seller;
    });

    res.json(sellers);
  } catch (error) {
    console.error("Error fetching sellers:", error);
    res.status(500).send("Server error");
  }
};


export const getOrders = async (req, res) => {
  const userId = req.userId; // Retrieved from the middleware

  try {
    console.log("Fetching orders of seller:", userId);

   
    const orderProductsResult = await db.query(
      `SELECT 
    op.product_id, 
    op.quantity, 
    op.order_id,
    op.status,
    c.product_name, 
    p.price, 
    c.product_description 
  FROM 
    order_products op
  JOIN 
    products p 
    ON op.product_id = p.id
  JOIN 
    catalogs c 
    ON p.catalog_id = c.id
  WHERE 
    p.owner_id = $1
  `,
      [userId]
    );

  
const orders = orderProductsResult.rows;

    if (orders.length === 0) {
      console.log("No orders found for the seller.");
      return res.status(200).json({ message: "No orders found.", orders: [] });
    }
  const ordersWithDetails = await Promise.all(
    orders.map(async (order) => {
      const result = await db.query(
        `SELECT 
         o.id AS order_id, 
       
         o.created_at, 
         a.id AS address_id, 
         a.street, 
         a.city, 
         a.state, 
         a.zip_code, 
         a.country
       FROM orders o
       JOIN addresses a ON o.address_id = a.id
       WHERE o.id = $1
       ORDER BY o.created_at DESC`,
        [order.order_id]
      );

      
      return {
        product_id: order.product_id,
        quantity: order.quantity,
        order_id: order.order_id,
        product_name: order.product_name,
        price: order.price,
        status: order.status,
        product_description: order.product_description,
        order: result.rows,
      };
    })
  );

 
 

  res.status(200).json({
    message: "Orders retrieved successfully.",
    orders: ordersWithDetails,
  });
   
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



export const approveSeller = async (req, res) => {
  const { id } = req.params;
  try {
    // Update seller status to approved
    const result = await db.query(
      `UPDATE sellers SET status = 'approved' WHERE id = $1 RETURNING id, user_id, status`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Seller not found" });
    }

    const seller = result.rows[0];

    // Get user email and password
    const userResult = await db.query(
      "SELECT email, password FROM users WHERE id = $1",
      [seller.user_id]
    );
    const user = userResult.rows[0];

    if (user) {
      // Send approval email
      const tempPassword = crypto.randomBytes(8).toString("hex"); // Generate a random password
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      await db.query(
        "UPDATE users SET password = $1, password_reset = $2 WHERE id = $3",
        [hashedPassword, "yes", seller.user_id]
      );

    
      sendApprovalEmail(user.email, tempPassword);
    }

    res.status(200).json({ message: "Seller approved", seller });
  } catch (error) {
    console.error("Error approving seller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

  
  // Deny a seller
 

 export const denySeller = async (req, res) => {
   const { id } = req.params;
   const { reason } = req.body; // Get the denial reason from the request body

   try {
     // Update seller status to denied
     const result = await db.query(
       `UPDATE sellers SET status = 'denied' WHERE id = $1 RETURNING id, user_id, status`,
       [id]
     );

     if (result.rowCount === 0) {
       return res.status(404).json({ error: "Seller not found" });
     }

     const seller = result.rows[0];

     // Get user email
     const userResult = await db.query(
       "SELECT email FROM users WHERE id = $1",
       [seller.user_id]
     );
     const user = userResult.rows[0];

     if (user) {
       // Send denial email
       sendDenialEmail(user.email, reason);
     }

     res.status(200).json({ message: "Seller denied", seller });
   } catch (error) {
     console.error("Error denying seller:", error.message);
     res.status(500).json({ error: "Internal server error" });
   }
 };

export const getSellers = async (req, res) => {
  try {
    const result = await db.query(`SELECT business_name , user_id FROM sellers`);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching sellers:", err.message);
    res.status(500).send("Server Error");
  }
};


  
 