// server/controllers/cartController.js
import pool from '../db.js'; // Use ES Module import syntax

// Controller function to add an item to the cart
export const addToCart = async (req, res) => {
  const { product_id, user_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cart (product_id, user_id) VALUES ($1, $2) RETURNING *',
      [product_id, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).send('Server error');
  }
};

// Controller function to get the cart items for a user
export const getCart = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = $1',
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).send('Server error');
  }
};
