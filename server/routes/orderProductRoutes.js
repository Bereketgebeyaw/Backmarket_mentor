import express from 'express';
import { getOrderProductsOfaSeller } from "../controllers/orderProductsController.js"; // Import both controllers
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = express.Router();


router.get("/get", authenticateToken, getOrderProductsOfaSeller);
export default router;
