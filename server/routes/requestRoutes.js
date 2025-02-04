// routes/sellerRoutes.js
import express from "express";

import {Request,getRequests,approveRequest,rejectRequest} from '../controllers/requestController.js'
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/approve/:id',approveRequest);
router.post('/reject/:id',rejectRequest);
router.post('/', authenticateToken ,Request);

router.get('/' ,getRequests);

export default router;
