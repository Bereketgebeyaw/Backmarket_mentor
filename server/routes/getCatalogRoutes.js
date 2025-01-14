// subcategoryRoutes.js
import express from "express";
import {
  getCatalogsBySubCategory,
} from "../controllers/getCatalogController.js";

const router = express.Router();


router.get("/:subcategoryId", getCatalogsBySubCategory);


export default router;
