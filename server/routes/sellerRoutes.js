// routes/sellerRoutes.js
import express from "express";
import { getPendingSellers,approveSeller, denySeller } from "../controllers/sellerController.js";


const router = express.Router();

// GET route for fetching pending sellers
router.get("/pending", getPendingSellers);
router.put('/:id/approve', approveSeller);
router.put('/:id/deny', denySeller);

export default router;
