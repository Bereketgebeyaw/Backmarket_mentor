import db from "../db.js";
import jwt from "jsonwebtoken";

let isProcessing = false;

export const createAddress = async (req, res) => {
  // Prevent multiple simultaneous requests
  if (isProcessing) {
    console.log("Request is already being processed.");
    return res
      .status(400)
      .json({ message: "Request is already being processed." });
  }

  isProcessing = true;

  const { address, token } = req.body;

  console.log("Request Body:", req.body); // Debug logs
  console.log("Address:", address);
  console.log("Token:", token);

  if (
    !address?.street ||
    !address.city ||
    !address.state ||
    !address.zip_code ||
    !address.country
  ) {
    console.log("Validation failed: Missing required fields");
    isProcessing = false;
    return res.status(400).json({
      message: "Street, City, State, ZIP Code, and Country are required.",
    });
  }

  if (!token) {
    console.log("Validation failed: Missing token");
    isProcessing = false;
    return res.status(400).json({ message: "Token is required." });
  }

  try {
    // Decode the token to get the user ID
    const secretKey = "your_secret_key"; // Ensure this matches the key used during token generation
    const decoded = jwt.verify(token, secretKey); // Verify the token with the correct secret key
    const userId = decoded.userId; // Extract userId from the token payload

    if (!userId) {
      console.log("Invalid token: User ID not found");
      isProcessing = false;
      return res.status(401).json({ message: "Invalid token." });
    }

    console.log("User ID from token:", userId);

    console.log("Fetching user's cart...");
    const cartResult = await db.query(
      `SELECT id FROM cart WHERE user_id = $1`,
      [userId]
    );

    let cartId = null;
    if (cartResult.rows.length > 0) {
      cartId = cartResult.rows[0].id;
      console.log("Cart found with ID:", cartId);

      // Fetch cart products
      console.log("Fetching cart products...");
      const cartProductsResult = await db.query(
        `SELECT product_id, quantity FROM cart_products WHERE cart_id = $1`,
        [cartId]
      );

      const cartProducts = cartProductsResult.rows;

      if (cartProducts.length <= 0) {
        console.log("No products found in the cart.");
        isProcessing = false;
        return res.status(400).json({
          message:
            "Your cart is empty. Please add products before creating an order.",
        });
      } else {
        console.log("Cart products found:", cartProducts);

        // Check if the address already exists
        console.log("Checking if the address already exists...");
        const existingAddressResult = await db.query(
          `SELECT id FROM addresses 
          WHERE street = $1 AND city = $2 AND state = $3 AND zip_code = $4 AND country = $5`,
          [
            address.street,
            address.city,
            address.state,
            address.zip_code,
            address.country,
          ]
        );

        let addressId;
        if (existingAddressResult.rows.length > 0) {
          addressId = existingAddressResult.rows[0].id;
          console.log("Address already exists with ID:", addressId);
        } else {
          console.log("Address not found, inserting into database...");
          const insertResult = await db.query(
            `INSERT INTO addresses (street, city, state, zip_code, country) 
            VALUES ($1, $2, $3, $4, $5) RETURNING id`,
            [
              address.street,
              address.city,
              address.state,
              address.zip_code,
              address.country,
            ]
          );
          addressId = insertResult.rows[0].id;
          console.log("Address inserted successfully with ID:", addressId);
        }

        // Insert the order into the orders table
        console.log("Inserting order...");
        const orderResult = await db.query(
          `INSERT INTO orders (user_id, address_id, status) 
          VALUES ($1, $2, $3) RETURNING id`,
          [userId, addressId, "pending"]
        );

        const orderId = orderResult.rows[0].id;
        console.log("Order created successfully with ID:", orderId);

        // Insert the products into order_products
        console.log("Inserting products into order_products...");
        for (const product of cartProducts) {
          await db.query(
            `INSERT INTO order_products (order_id, product_id, quantity) 
            VALUES ($1, $2, $3)`,
            [orderId, product.product_id, product.quantity]
          );
          console.log(
            `Product ID ${product.product_id} added to order ${orderId}`
          );
        }

        // Delete the products from the cart
        console.log("Deleting products from cart...");
        await db.query(`DELETE FROM cart_products WHERE cart_id = $1`, [
          cartId,
        ]);
        console.log("Cart products deleted successfully.");

        // Send success response
        isProcessing = false;
        return res.status(201).json({
          message: "Order created successfully and cart cleared.",
          orderId,
          addressId,
        });
      }
    } else {
      console.log("No cart found for the user.");
      isProcessing = false;
      return res.status(400).json({
        message:
          "Cart not found. Please add products to your cart before proceeding.",
      });
    }
  } catch (error) {
    isProcessing = false;
    console.error("Error during address or order creation:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
