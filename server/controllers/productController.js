import db from '../db.js';
import mime from 'mime-types';
import express from "express";
import multer from "multer";
import { authenticateToken } from "../middleware/authMiddleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export const getProductsBySubCategory = async (req, res) => {
    const { subcategoryId } = req.params;
   try {
    
     const query = "SELECT * FROM products p Join catalogs c on p.catalog_id = c.id WHERE p.quantity_in_stock > 0 and c.subcategory_id = $1";
     const result = await db.query(query, [subcategoryId]);

     const products = result.rows.map((product) => {
       if (product.image) {
         const imageType = product.image_type || "jpeg"; // Default to 'jpeg' if null
         product.image = `data:image/${imageType};base64,${product.image.toString(
           "base64"
         )}`;
       }
       return product;
     });

     res.json(products);
   } catch (error) {
     console.error("Error fetching products:", error);
     res.status(500).send("Server error");
   }
 };