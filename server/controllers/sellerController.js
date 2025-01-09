import db from "../db.js"; // Replace with your actual database connection

export const getPendingSellers = async (req, res) => {
  try {
    const pendingSellers = await db.query(
      `SELECT id, user_id, business_name, store_description, status, created_at 
       FROM sellers 
       WHERE status = 'pending'`
    );

    res.status(200).json(pendingSellers.rows); // Ensure rows contain the seller data
  } catch (error) {
    console.error("Error fetching pending sellers:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
