// server/routes/userRoutes.js
import express from 'express';
import { signupUser } from '../controllers/userController.js';

const router = express.Router();

// POST route for signup
router.post('/signup', signupUser);

export default router;
