import db from "../db.js";

// Controller to handle adding a catalog item
export const addCatalogItem = async (req, res) => {
  const {
    product_name,
    product_description,
    category_id,
    subcategory_id,
    brand,
    model,
    size,
  } = req.body;

  try {
    // Insert the catalog item into the database
    const query = `
      INSERT INTO catalogs (product_name, product_description, category_id, subcategory_id, brand, model, size, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING *;
    `;

    const values = [
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
      message: "Catalog item added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error inserting catalog item:", error);
    res.status(500).json({ message: "Failed to add catalog item", error });
  }
};
