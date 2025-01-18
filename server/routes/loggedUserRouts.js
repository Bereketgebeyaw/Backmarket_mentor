import express from "express";
import { getCartProductsForDashboard,addProductToCart,updateCartProductQuantity,getWishlistProducts} from '../controllers/loggedUserController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Login route for buyer dashboard


// Fetch cart products for buyer dashboard
router.get("/cart-products", authenticateToken, getCartProductsForDashboard);

router.post("/add-to-cart", authenticateToken, addProductToCart);

router.put("/update-cart", authenticateToken, updateCartProductQuantity);

router.get("/wishlist", authenticateToken, getWishlistProducts);

export default router;
