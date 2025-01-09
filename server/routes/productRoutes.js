import express from 'express';
import multer from 'multer';
import db from '../db.js';
import mime from 'mime-types';
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route to add a product
router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    const {
      name,
      description,
      price,
      quantity_in_stock,
      category,
      subcategory,
      brand,
      price_range,
      size,
      target_demographics,
      shelf_life,
    } = req.body;
    const image = req.file ? req.file.buffer : null;
    const imageType = req.file ? mime.extension(req.file.mimetype) : null;

    if (
      !name ||
      !description ||
      !price ||
      !quantity_in_stock ||
      !image ||
      !subcategory ||
      !brand ||
      !price_range ||
      !size ||
      !target_demographics ||
      !shelf_life
    ) {
      return res.status(400).send("All fields are required.");
    }
     if (req.userRole !== "admin" && req.userRole !== "seller") {
       return res
         .status(403)
         .json({ message: "You are not authorized to add products." });
     }
     
    console.log("Data to be inserted:", {
      name,
      description,
      price,
      quantity_in_stock,
      imageType,
      subcategory,
      brand,
      price_range,
      size,
      target_demographics,
      shelf_life,
      owner_id: req.userId, // Log the owner ID
    });

    try {
     const query = `
      INSERT INTO products (name, description, price, quantity_in_stock, image, image_type, subcategory_id, brand, price_range, size, target_demographics, shelf_life, owner_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;
    `;
     const values = [
       name,
       description,
       price,
       quantity_in_stock,
       image,
       imageType,
       subcategory,
       brand,
       price_range,
       size,
       target_demographics,
       shelf_life,
       req.userId, // Use the user ID from the token
     ];
      const result = await db.query(query, values);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).send("Server error");
    }
  }
);


// GET route to fetch all products
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM products WHERE quantity_in_stock > 0"
    );

    
    const products = result.rows.map((product) => {
      if (product.image) {
        const imageType = product.image_type || 'jpeg'; // Default to 'jpeg' if null
        product.image = `data:image/${imageType};base64,${product.image.toString('base64')}`;
      }
      return product;
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server error');
  }
});

export default router;
