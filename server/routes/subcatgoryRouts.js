// subcategoryRoutes.js
import express from "express";
import { addSubcategory, getSubcategoriesByCategory } from "../controllers/subcategoryController.js";

const router = express.Router();

// POST route to add a subcategory
router.post("/", addSubcategory);
router.get("/:categoryId", getSubcategoriesByCategory);


export default router;
