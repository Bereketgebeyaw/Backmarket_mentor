// server/controllers/userController.js
import db from '../db.js';  // Make sure your db.js is correctly imported

export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
    // Query to insert the user into the database
    const query = 'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, email, password, new Date().toISOString()];

    const result = await db.query(query, values);
    const newUser = result.rows[0];

    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
};
