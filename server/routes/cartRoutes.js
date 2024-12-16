import express from 'express';
import { addToCart, getCart } from '../controllers/cartController.js';

const router = express.Router();

// Add a product to the cart
router.post('/add', addToCart);

// Get all items in the user's cart
router.get('/:user_id', getCart);

export default router;
