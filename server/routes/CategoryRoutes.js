import express from 'express';
import {createCategory, getCategory,} from "../controllers/categoryController.js"; 

const router = express.Router();

router.get('', getCategory);
router.post('/create', createCategory);

export default router;
