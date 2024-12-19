import db from '../db.js'; 


export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
    // Check if email already exists
    const { rows: existingUsers } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Insert user into the database with plain-text password
    const { rows } = await db.query(
      'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, new Date().toISOString()]
    );

    const newUser = rows[0];
    res.status(201).json({
      message: 'User created successfully.',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


// Login Functionality
export const loginUser = async (req, res) => {
  const email =req.body.email;
  const password=req.body.password;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if the user exists in the database
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = rows[0];

    // Compare the plain-text password
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Successful login
    res.status(200).json({
      message: 'Login successful.',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
