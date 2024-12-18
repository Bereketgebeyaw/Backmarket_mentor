// src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Cart Context
const CartContext = createContext();

// Cart Provider to wrap around components where we want to access the cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to fetch the cart items for the user from the server
  const getCartItems = async (userId) => {
    try {
      const response = await axios.get(`/api/cart/${userId}`);
      setCart(response.data);  // Update the cart state with fetched data
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // Function to add a product to the cart
  const addToCart = async (userId, productId) => {
    try {
      // Send the request to the server to add the product to the user's cart
      await axios.post('/api/cart', { user_id: userId, product_id: productId });
      getCartItems(userId); // After adding, update the cart items
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // Return the CartProvider with the cart state and functions passed to children components
  return (
    <CartContext.Provider value={{ cart, addToCart, getCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access CartContext
export const useCart = () => React.useContext(CartContext);
