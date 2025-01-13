import db from "../db.js"; // Replace with your actual database connection
import { sendApprovalEmail, sendDenialEmail } from "./mailer.js";

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
      sendApprovalEmail(user.email, user.password);
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

  
