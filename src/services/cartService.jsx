import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/cart'; // Replace with your backend URL

// Function to add an item to the cart
export const addToCart = async (userId, productId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, {
      product_id: productId,
      user_id: userId,
    });
    return response.data; // Returns the newly added cart item
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};
