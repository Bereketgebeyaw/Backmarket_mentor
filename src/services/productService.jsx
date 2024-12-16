import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/products');
    console.log('Fetched Products:', response.data); // Debugging
    return response.data; 
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
