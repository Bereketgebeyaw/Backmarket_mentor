import express from 'express';
import { signupUser, loginUser } from '../controllers/userController.js'; // Import both controllers

const router = express.Router();

// POST route for signup
router.post('/signup', signupUser);

// POST route for login
router.post('/login', loginUser);

export default router;
