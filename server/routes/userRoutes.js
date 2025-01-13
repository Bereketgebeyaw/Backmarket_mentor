import express from 'express';
import {
  signupUser,
  loginUser,
  getCartProducts,
  PasswordReset,
} from "../controllers/userController.js"; // Import both controllers
import { authenticateToken } from "../middleware/authMiddleware.js";
import multer from "multer";
import mime from "mime-types";



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
 
const router = express.Router();

// POST route for signup
router.post('/signup', upload.fields([
   { name: "businessLicense", maxCount: 1 },
   { name: "tinCertificate", maxCount: 1 },
   { name: "vatCertificate", maxCount: 1 },
   { name: "kebeleId", maxCount: 1 },
 ]),signupUser);

// POST route for login
router.post('/login', loginUser);
router.post("/reset", authenticateToken,PasswordReset);
router.get("/cart", authenticateToken, getCartProducts);
export default router;
