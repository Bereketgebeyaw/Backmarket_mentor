import express from 'express';
import multer from 'multer';
import db from '../db.js';
import mime from 'mime-types';
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getProductsBySubCategory } from "../controllers/productController.js";

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
    const { catalog_id, price, quantity_in_stock, shelf_life } = req.body;
    const image = req.file ? req.file.buffer : null;
    const imageType = req.file ? mime.extension(req.file.mimetype) : null;

    if (!catalog_id || !price || !quantity_in_stock || !image || !shelf_life) {
      return res.status(400).send("All fields are required.");
    }
   console.log("Data to be inserted:", {
     catalog_id,
     price,
     quantity_in_stock,
     imageType,
     shelf_life,
     owner_id: req.userId, // Log the owner ID
   });
    if (req.userRole !== "admin" && req.userRole !== "seller") {
      return res
        .status(403)
        .json({ message: "You are not authorized to add products." });
    }

    console.log("Data to be inserted:", {
      catalog_id,
      price,
      quantity_in_stock,
      imageType,
      shelf_life,
      owner_id: req.userId, // Log the owner ID
    });

    try {
      const query = `
        INSERT INTO products (catalog_id, price, quantity_in_stock, image, image_type, shelf_life, owner_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
      `;
      const values = [
        catalog_id,
        price,
        quantity_in_stock,
        image,
        imageType,
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
      "SELECT p.id AS product_id,p.catalog_id,p.price,p.image,p.image_type, p.owner_id,p.quantity_in_stock, p.shelf_life, p.created_at AS product_created_at, p.updated_at AS product_updated_at,c.id AS catalog_id,c.product_name,c.product_description,c.category_id,c.subcategory_id,c.brand,c.model,c.size,c.created_at AS catalog_created_at,c.updated_at AS catalog_updated_at FROM products p JOIN catalogs c ON p.catalog_id = c.id WHERE p.quantity_in_stock > 0"
    );
    console.log(result);
    
    const products = result.rows.map((product) => {
      if (product.image) {
        const imageType = product.image_type || 'jpeg'; // Default to 'jpeg' if null
        product.image = `data:image/${imageType};base64,${product.image.toString('base64')}`;
      }
      return product;
    });
    console.log(products);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server error');
  }
});



router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send("Search query is required.");
  }

  try {
    const searchQuery = `
      SELECT p.*, c.product_name
      FROM products p
      JOIN catalogs c ON p.catalog_id = c.id
      WHERE c.product_name ILIKE $1 OR c.index_terms::text ILIKE $1
      AND p.quantity_in_stock > 0 
    `;
    const result = await db.query(searchQuery, [`%${query.toLowerCase()}%`]);

    const products = result.rows.map((product) => {
      if (product.image) {
        const imageType = product.image_type || "jpeg"; // Default image type
        product.image = `data:image/${imageType};base64,${product.image.toString(
          "base64"
        )}`;
      }
      return product;
    });

    res.json(products);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).send("Server error");
  }
});



router.get("/:subcategoryId", getProductsBySubCategory);
export default router;