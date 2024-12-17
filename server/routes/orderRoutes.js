import express from 'express';
import { addOrder, getOrders } from '../controllers/orderController.js';  // Adjust the import path if necessary

const router = express.Router();

// Route to add a new order
router.post('/', addOrder);

// Route to get all orders for a user
router.get('/:user_id', getOrders);

export default router;
