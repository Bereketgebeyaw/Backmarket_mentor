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


// Approve a seller
export const approveSeller = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query(
        `UPDATE sellers SET status = 'approved' WHERE id = $1 RETURNING id, status`,
        [id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Seller not found' });
      }
  
      res.status(200).json({ message: 'Seller approved', seller: result.rows[0] });
    } catch (error) {
      console.error('Error approving seller:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Deny a seller
  export const denySeller = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query(
        `UPDATE sellers SET status = 'denied' WHERE id = $1 RETURNING id, status`,
        [id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Seller not found' });
      }
  
      res.status(200).json({ message: 'Seller denied', seller: result.rows[0] });
    } catch (error) {
      console.error('Error denying seller:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
