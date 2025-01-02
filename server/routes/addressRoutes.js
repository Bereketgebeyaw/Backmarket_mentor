import express from 'express';
import { createAddress, getOrders} from "../controllers/addressController.js"; 
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = express.Router();


router.post('/create', createAddress);
router.get('/get', authenticateToken, getOrders);

export default router;
