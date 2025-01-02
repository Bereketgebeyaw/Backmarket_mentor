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
        
         console.log("Updating product quantities...");
         for (const product of cartProducts) {
           await db.query(
             `UPDATE products 
          SET quantity_in_stock = quantity_in_stock - $1 
          WHERE id = $2`,
             [product.quantity, product.product_id]
           );
         }
          console.log("Updating product quantities...");
    for (const product of cartProducts) {
      const quantityInStockResult = await db.query(
        `SELECT quantity_in_stock FROM products WHERE id = $1`,
        [product.product_id]
      );

      const quantityInStock = quantityInStockResult.rows[0].quantity_in_stock;

      if (quantityInStock === 0) {
        await db.query(
          `DELETE FROM cart_products WHERE product_id = $1`,
          [product.product_id]
        );
      } else  {
        await db.query(
          `UPDATE cart_products 
           SET quantity = $1 
           WHERE product_id = $2 AND quantity > $1`,
          [quantityInStock, product.product_id]
        );
      }}
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

export const getOrders = async (req, res) => {
  const userId = req.userId; // Retrieved from the middleware

  try {
    console.log("Fetching orders for user ID:", userId);

    // Fetch all orders with their address details for the current user
    const ordersResult = await db.query(
      `SELECT 
         o.id AS order_id, 
         o.status, 
         o.created_at, 
         a.id AS address_id, 
         a.street, 
         a.city, 
         a.state, 
         a.zip_code, 
         a.country
       FROM orders o
       JOIN addresses a ON o.address_id = a.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );

    const orders = ordersResult.rows;

    if (orders.length === 0) {
      console.log("No orders found for the user.");
      return res.status(200).json({ message: "No orders found.", orders: [] });
    }

    // Fetch products for each order
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const productsResult = await db.query(
          `SELECT 
             op.product_id, 
             op.quantity, 
             p.name, 
             p.price, 
             p.description 
           FROM order_products op
           JOIN products p ON op.product_id = p.id
           WHERE op.order_id = $1`,
          [order.order_id]
        );

        return {
          order_id: order.order_id,
          status: order.status,
          created_at: order.created_at,
          address: {
            id: order.address_id,
            street: order.street,
            city: order.city,
            state: order.state,
            zip_code: order.zip_code,
            country: order.country,
          },
          products: productsResult.rows,
        };
      })
    );

    console.log("Orders fetched successfully:", ordersWithDetails);

    res.status(200).json({
      message: "Orders retrieved successfully.",
      orders: ordersWithDetails,
    });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

