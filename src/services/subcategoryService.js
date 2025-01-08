import axios from 'axios';

export const fetchSubcategoriesByCategory = async (categoryId) => {
  try {
    console.log(categoryId); // Corrected console.log
    const response = await axios.get(`http://localhost:5000/subcategory/${categoryId}`);
    console.log('fetched'); 
    console.log(response.data); // Corrected console.log
    return response.data; // Return the subcategories data
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw new Error('Failed to fetch subcategories');
  }
};
