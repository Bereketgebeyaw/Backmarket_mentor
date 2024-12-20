import bcrypt from "bcrypt";
import db from "../db.js";


export const signupUser = async (req, res) => {
  const { name, email, password,cartItems } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  try {
   
    const { rows: existingUsers } = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

 
    const { rows } = await db.query(
      "INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, new Date().toISOString()]
    );

    const newUser = rows[0];

   
    await db.query("INSERT INTO cart (user_id) VALUES ($1)", [newUser.id]);

    
    res.status(201).json({
      message: "User created successfully.",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


export const loginUser = async (req, res) => {
  console.log("Login Request Body:", req.body); // Debug incoming request

  const { email, password, cartItems } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Check if cartItems exist and is a non-empty array
    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
      const { rows: cart } = await db.query(
        "SELECT * FROM cart WHERE user_id = $1",
        [user.id]
      );

      if (!cart || cart.length === 0) {
        throw new Error("Cart not found for user.");
      }

      const cartId = cart[0].id;

      for (const item of cartItems) {
        const { product_id, quantity } = item;

        // Validate product_id and quantity
        if (!product_id || !quantity) {
          console.error("Invalid product or quantity:", item); // Debug invalid cart item
          continue; // Skip this item to avoid SQL error
        }

        // Check if product already exists in cart
        const { rows: existingCartProduct } = await db.query(
          "SELECT * FROM cart_products WHERE cart_id = $1 AND product_id = $2",
          [cartId, product_id]
        );

        if (existingCartProduct.length > 0) {
          await db.query(
            "UPDATE cart_products SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3",
            [quantity, cartId, product_id]
          );
        } else {
          await db.query(
            "INSERT INTO cart_products (cart_id, product_id, quantity) VALUES ($1, $2, $3)",
            [cartId, product_id, quantity]
          );
        }
      }
    }

    res.status(200).json({ message: "Login successful.", user });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
