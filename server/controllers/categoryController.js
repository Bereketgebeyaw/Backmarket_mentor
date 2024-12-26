import db from "../db.js";

export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  // Validate input
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and Description are required." });
  }

  try {
    // Insert the new category into the database
    await db.query(
      "INSERT INTO categories (name, description) VALUES ($1, $2)",
      [name, description]
    );

    res.status(201).json({
      message: "Category created successfully.",
    });
  } catch (error) {
    console.error("Error during Category creation:", error.message);

    // Handle specific database errors
    if (error.code === "23505") {
      // Example: Unique constraint violation
      res.status(409).json({ message: "Category name already exists." });
    } else {
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  }
};
