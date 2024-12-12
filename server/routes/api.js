const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Route: Get All Users
router.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route: Add a New User
router.post("/users", async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [first_name, last_name, username, email, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
