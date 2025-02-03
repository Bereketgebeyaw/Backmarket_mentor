import db from "../db.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
// Controller to handle adding a catalog item
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
