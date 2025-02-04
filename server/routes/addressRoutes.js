import express from 'express';
import { createAddress, getOrders,postcontact ,getcontact,deletecontact} from "../controllers/addressController.js"; 
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = express.Router();


router.post('/create', createAddress);
router.get('/get', authenticateToken, getOrders);
router.post('/contact', postcontact);
router.get('/admincontact', getcontact);
router.delete('/deletecontact/:id', deletecontact)



export default router;
