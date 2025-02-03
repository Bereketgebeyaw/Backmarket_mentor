// routes/sellerRoutes.js
import express from "express";

import {Request,getRequests} from '../controllers/requestController.js'
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', authenticateToken ,Request);
router.get('/' ,getRequests);

export default router;
