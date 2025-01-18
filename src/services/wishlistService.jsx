// src/services/wishlistService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/dashboard/wishlist";

const getWishlistProducts = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist products:", error);
    throw error;
  }
};

export { getWishlistProducts };
