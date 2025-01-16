import bcrypt from "bcrypt";
import db from "../db.js";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
  
 
  const {
    name,
    email,
    password,
    isSeller,
    businessName,
    storeDescription,
    physicalAddress,
    bankAccount,
    categories,
    subcategories,
    termsAccepted,
  } = req.body;
   

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  try {
    // Check if the email already exists
    const { rows: existingUsers } = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const { rows } = await db.query(
      "INSERT INTO users (name, email, password, role, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        name,
        email,
        hashedPassword,
        isSeller ? "seller" : "user",
        new Date().toISOString(),
      ]
    );

    const newUser = rows[0];

    // If the user is a seller, create a seller record
    if (isSeller) {
      const businessLicense = req.files?.businessLicense
        ? req.files.businessLicense[0].buffer
        : null;
      const tinCertificate = req.files?.tinCertificate
        ? req.files.tinCertificate[0].buffer
        : null;
      const vatCertificate = req.files?.vatCertificate
        ? req.files.vatCertificate[0].buffer
        : null;
      const kebeleId = req.files?.kebeleId
        ? req.files.kebeleId[0].buffer
        : null;

      if (
        !businessName ||
        !storeDescription ||
        !physicalAddress ||
        !bankAccount ||
        !categories ||
        !subcategories ||
        !termsAccepted ||
        !businessLicense ||
        !tinCertificate ||
        !vatCertificate ||
        !kebeleId
      ) {
        return res.status(400).send("All fields are required.");
      }

      // Insert user data into the database
      const query = `
        INSERT INTO sellers (
          user_id, 
          business_name, 
          store_description, 
          kebele_id, 
          business_license, 
          tin_certificate, 
          vat_certificate, 
          physical_address, 
          bank_account, 
          categories, 
          subcategories, 
          terms_accepted, 
          created_at
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;
      `;

      const values = [
        newUser.id,
        businessName,
        storeDescription,
        kebeleId,
        businessLicense,
        tinCertificate,
        vatCertificate,
        physicalAddress,
        bankAccount,
        categories,
        subcategories,
        termsAccepted,
        new Date().toISOString(),
      ];
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Is Seller:", isSeller);
      console.log("Business Name:", businessName);
      console.log("Store Description:", storeDescription);
      console.log("Physical Address:", physicalAddress);
      console.log("Bank Account:", businessLicense);
      console.log("Categories:", kebeleId);
      console.log("Subcategories:", tinCertificate);
      console.log("Terms Accepted:", vatCertificate);

      const result = await db.query(query, values);

      return res.status(201).json({
        message: "Seller created successfully.",
        seller: result.rows[0],
      });
    }

    // Create a default cart and wishlist for regular users
    await db.query("INSERT INTO cart (user_id) VALUES ($1)", [newUser.id]);
    await db.query(
      "INSERT INTO wishlists (user_id, name, created_at, updated_at) VALUES ($1, $2, $3, $4)",
      [
        newUser.id,
        "My Wishlist", // Default wishlist name
        new Date().toISOString(),
        new Date().toISOString(),
      ]
    );

    return res.status(201).json({
      message: "User created successfully.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    // Log more detailed error information
    console.error("Error during signup:", error.message);
    console.error("Error stack:", error.stack); // Provides more context on where the error occurred

    // If the error has a response (e.g., from a failed request to an external service)
    if (error.response) {
      console.error("Response error data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // If the request was made but no response was received
      console.error("Request error data:", error.request);
    } else {
      // General error in setting up the request or something else
      console.error("Error message:", error.message);
    }
    res.status(500).json({ message: "Server error. Please try again later." });
  }

};


export const loginUser = async (req, res) => {
  console.log("Login Request Body:", req.body); // Debug incoming request

  const { email, password, cartItems, favorites } = req.body;

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

    // Fetch seller-specific data if user is a seller
    let seller = null;
    if (user.role === "seller") {
      const { rows: sellerData } = await db.query(
        "SELECT * FROM sellers WHERE user_id = $1",
        [user.id]
      );
      seller = sellerData[0]; // If the user is a seller, get the seller data
    }

    // For regular users, handle cart items and favorites
    if (user.role !== "seller") {
      // Handle cart items
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

          if (!product_id || !quantity) {
            console.error("Invalid product or quantity:", item);
            continue;
          }

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

      // Handle favorite items
      if (favorites && Array.isArray(favorites) && favorites.length > 0) {
        // Get the user's wishlist
        const { rows: wishlist } = await db.query(
          "SELECT * FROM wishlists WHERE user_id = $1",
          [user.id]
        );

        if (!wishlist || wishlist.length === 0) {
          throw new Error("Wishlist not found for user.");
        }

        const wishlistId = wishlist[0].id;

        for (const favorite of favorites) {
          const { id: productId } = favorite;

          if (!productId) {
            console.error("Invalid product ID in favorites:", favorite);
            continue;
          }

          // Check if the product is already in the wishlist
          const { rows: existingWishlistProduct } = await db.query(
            "SELECT * FROM wishlist_products WHERE wishlist_id = $1 AND product_id = $2",
            [wishlistId, productId]
          );

          if (existingWishlistProduct.length === 0) {
            await db.query(
              "INSERT INTO wishlist_products (wishlist_id, product_id) VALUES ($1, $2)",
              [wishlistId, productId]
            );
          }
        }
      }
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "your_secret_key",
      {
        expiresIn: "1h",
      }
    );
console.log('seller');
    // If the user is a seller, navigate to the seller dashboard
    console.log(seller);
    if (user.role === "seller") {
      return res.status(200).json({
        message: "Login successful. Redirecting to Seller Dashboard.",
        token,
        user,
        seller,
        redirectTo: "/seller-dashboard",
      });
    }

    // If the user is not a seller, proceed as normal
    res.status(200).json({ message: "Login successful.", token, user });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



export const getCartProducts = async (req, res) => {
  const userId = req.userId; // Retrieved from the middleware

  try {
    // Fetch cart and products (same logic as before)
    const { rows: cart } = await db.query("SELECT * FROM cart WHERE user_id = $1", [userId]);

    if (cart.length === 0) {
      return res.status(404).json({ message: "Cart not found for the user." });
    }

    const cartId = cart[0].id;

    const { rows: cartProducts } = await db.query(
      `
    SELECT p.id, cp.quantity, c.product_name, p.price, encode(p.image, 'base64') AS image
    FROM cart_products cp
    JOIN products p ON cp.product_id = p.id Join catalogs c ON p.catalog_id = c.id
    WHERE cp.cart_id = $1
      `,
      [cartId]
    );

    res.status(200).json({ message: "Cart products fetched successfully.", products: cartProducts });
  } catch (error) {
    console.error("Error fetching cart products:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



export const PasswordReset = async (req, res) => {
  try {
   
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. User ID is missing." });
    }

    // Extract the new password from the request body
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "New password is required." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    const result = await db.query(
      "UPDATE users SET password = $1, password_reset = $2 WHERE id = $3 RETURNING id",
      [hashedPassword, "no", userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    // Respond with success message
    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while updating the password." });
  }
};
