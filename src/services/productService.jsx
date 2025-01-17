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
export const fetchProductsBySubCategory = async (subcategoryId) => {
  try {
    console.log(subcategoryId); // Corrected console.log
    const response = await axios.get(
      `http://localhost:5000/products/${subcategoryId}`
    );
    console.log("fetched");
    console.log(response.data); // Corrected console.log
    return response.data; // Return the subcategories data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};