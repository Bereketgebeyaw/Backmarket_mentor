import db from "../db.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
// Controller to handle adding a catalog item
import { sendRequestApprovalEmail,sendRequestDenialEmail } from "./mailer.js";
export const Request= async (req, res) => {
  const {
    product_name,
    product_description,
    category_id,
    subcategory_id,
    brand,
    model,
    size,
    message,
    // Capture index terms from request body
  } = req.body;
  const userId = req.userId; 
  console.log(req.body);
  console.log(req.userId);
  try {
    // Insert the catalog item into the database, including index_terms
    const query = `
      INSERT INTO requests (requester,message,product_name, product_description,  category_id, subcategory_id, brand, model, size, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, NOW(), NOW())
      RETURNING *;
    `;

    const values = [
        userId,
        message,
      product_name,
      product_description,
      category_id,
      subcategory_id,
      brand,
      model,
      size,
    
     
    ];

    const result = await db.query(query, values);

    // Send the inserted catalog item back to the client
    res.status(201).json({
      message: "request added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error insertion request:", error);
    res.status(500).json({ message: "Failed to create request", error });
  }
};



export const getRequests = async (req, res) => {
  
  
    try {
      const query = `
          SELECT 
    requests.*, 
    categories.name AS category_name, 
    subcategories.name AS subcategory_name
FROM 
    requests
JOIN 
    categories ON requests.category_id = categories.id
JOIN 
    subcategories ON requests.subcategory_id = subcategories.id
WHERE 
    requests.status = 'pending';

        `;
      const result = await db.query(query);
  
      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "No pending request found." });
      }
  console.log(result.rows)
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error fetching requests:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  
  export const approveRequest = async (req, res) => {
    const { id } = req.params;
   
    try {
      
      const result = await db.query(
        `UPDATE requests SET status = 'approved' WHERE id = $1 RETURNING id, requester, status`,
        [id]
      );
 
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "request not found" });
      }
 
      const request = result.rows[0];
 
      // Get user email
      const userResult = await db.query(
        "SELECT email FROM users WHERE id = $1",
        [request.requester]
      );
      const user = userResult.rows[0];
 
      if (user) {
        // Send denial email
        sendRequestApprovalEmail(user.email,request.id);
      }
 
      res.status(200).json({ message: "request approved", request });
    } catch (error) {
      console.error("Error approving seller:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  export const rejectRequest = async (req, res) => {
    const { id } = req.params;
   
    try {
      
      const result = await db.query(
        `UPDATE requests SET status = 'rejected' WHERE id = $1 RETURNING id, requester, status`,
        [id]
      );
 
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "request not found" });
      }
 
      const request = result.rows[0];
 
      // Get user email
      const userResult = await db.query(
        "SELECT email FROM users WHERE id = $1",
        [request.requester]
      );
      const user = userResult.rows[0];
 
      if (user) {
        // Send denial email
        sendRequestDenialEmail(user.email,request.id);
      }
 
      res.status(200).json({ message: "request rejected", request });
    } catch (error) {
      console.error("Error rejecting seller:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };