import express from 'express';
import multer from 'multer';
import db from '../db.js';
import mime from 'mime-types';

const router = express.Router();

// Multer setup for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route to add a product
router.post('/', upload.single('image'), async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file ? req.file.buffer : null;
  const imageType = req.file ? mime.extension(req.file.mimetype) : null;

  if (!name || !description || !price || !category || !image) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const query = `
      INSERT INTO products (name, description, price, image, image_type, category)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const values = [name, description, price, image, imageType, category];
    const result = await db.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Server error');
  }
});

// GET route to fetch all products
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products');
    
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
