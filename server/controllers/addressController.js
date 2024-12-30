import db from "../db.js";

export const createAddress = async (req, res) => {
  const { street, city, state, zip_code, country } = req.body;

  // Validate input
  if (!street || !city || !state || !zip_code || !country) {
    return res.status(400).json({
      message: "Street, City, State, ZIP Code, and Country are required.",
    });
  }

  try {
    // Insert the new address into the database
    await db.query(
      `INSERT INTO addresses (street, city, state, zip_code, country) 
       VALUES ($1, $2, $3, $4, $5)`,
      [street, city, state, zip_code, country]
    );

    res.status(201).json({
      message: "Address created successfully.",
    });
  } catch (error) {
    console.error("Error during address creation:", error.message);

    // Handle specific database errors
    if (error.code === "23505") {
      res.status(409).json({ message: "Duplicate address entry." });
    } else {
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  }
};
