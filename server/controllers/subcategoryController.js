// subcategoryController.js
import db from "../db.js";

// Controller function to add a subcategory
export const addSubcategory = async (req, res) => {
  const { name, description, category_id } = req.body;

  // Validate input
  if (!name || !category_id) {
    return res.status(400).json({ message: "Name and category_id are required." });
  }

  try {
    // Insert query for the subcategory
    const query = `
      INSERT INTO subcategories (name, description, category_id)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [name, description || null, category_id];
    const result = await db.query(query, values);

    // Send the created subcategory as the response
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
// subcategoryController.js
export const getSubcategoriesByCategory = async (req, res) => {
    const { categoryId } = req.params;
  
    try {
      const query = `
        SELECT * FROM subcategories WHERE category_id = $1;
      `;
      const result = await db.query(query, [categoryId]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No subcategories found for this category." });
      }
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  