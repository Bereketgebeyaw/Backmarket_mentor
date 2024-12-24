import express from 'express';
import { signupUser, loginUser,getCartProducts } from '../controllers/userController.js'; // Import both controllers
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = express.Router();

// POST route for signup
router.post('/signup', signupUser);

// POST route for login
router.post('/login', loginUser);

router.get("/cart", authenticateToken, getCartProducts);
export default router;
