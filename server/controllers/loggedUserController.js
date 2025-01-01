import bcrypt from "bcrypt";
import db from "../db.js";
import jwt from "jsonwebtoken";

// Login for Buyer Dashboard

  

// Fetch Cart Products for Buyer Dashboard
export const getCartProductsForDashboard = async (req, res) => {
  const userId = req.userId; // Retrieved from middleware

  try {
    const { rows: cart } = await db.query("SELECT * FROM cart WHERE user_id = $1", [userId]);

    if (cart.length === 0) {
      return res.status(404).json({ message: "Cart not found for the user." });
    }

    const cartId = cart[0].id;

    const { rows: cartProducts } = await db.query(
      `
      SELECT p.id, cp.quantity, p.name, p.price, encode(p.image, 'base64') AS image
      FROM cart_products cp
      JOIN products p ON cp.product_id = p.id
      WHERE cp.cart_id = $1
      `,
      [cartId]
    );

    res.status(200).json({
      message: "Cart products fetched successfully.",
      products: cartProducts,
    });
  } catch (error) {
    console.error("Error fetching cart products for dashboard:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const addProductToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId; // Retrieved from middleware
  
    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required." });
    }
  
    try {
      // Check if the cart exists for the authenticated user
      const { rows: cartRows } = await db.query("SELECT * FROM cart WHERE user_id = $1", [userId]);
  
      if (cartRows.length === 0) {
        return res.status(404).json({ message: "Cart not found for the user." });
      }
  
      const cartId = cartRows[0].id;
  
      // Check if the product exists
      const { rows: productRows } = await db.query("SELECT * FROM products WHERE id = $1", [productId]);
      if (productRows.length === 0) {
        return res.status(404).json({ message: "Product not found." });
      }
  
      // Add product to cart (update quantity if it already exists)
      const { rows: existingItem } = await db.query(
        "SELECT * FROM cart_products WHERE cart_id = $1 AND product_id = $2",
        [cartId, productId]
      );
  
      if (existingItem.length > 0) {
        // Update quantity if product is already in the cart
        await db.query(
          "UPDATE cart_products SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3",
          [quantity, cartId, productId]
        );
      } else {
        // Insert new product to the cart
        await db.query(
          "INSERT INTO cart_products (cart_id, product_id, quantity) VALUES ($1, $2, $3)",
          [cartId, productId, quantity]
        );
      }
  
      res.status(200).json({ message: "Product added to cart successfully." });
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };

  