import express from "express";
import { addCatalogItem } from "../controllers/catalogController.js";

const router = express.Router();

// Route to insert catalog data
router.post("/", addCatalogItem);

export default router;
