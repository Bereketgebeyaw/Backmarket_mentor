import db from '../db.js';  // Correct import from db.js

// Add a new order
export const addOrder = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
        const result = await db.query(  // Use 'db' instead of 'pool'
            'INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [user_id, product_id, quantity || 1]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding order:', err);
        res.status(500).send('Server error');
    }
};

// Get all orders for a user
export const getOrders = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await db.query(  // Use 'db' instead of 'pool'
            'SELECT * FROM orders JOIN products ON orders.product_id = products.id WHERE orders.user_id = $1',
            [user_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send('Server error');
    }
};
