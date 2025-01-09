// routes/sellerRoutes.js
import express from "express";
import { getPendingSellers } from "../controllers/sellerController.js";


const router = express.Router();

// GET route for fetching pending sellers
router.get("/pending", getPendingSellers);

export default router;
