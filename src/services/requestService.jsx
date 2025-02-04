import axios from 'axios';

export const fetchRequests = async () => {
  try {
   
    const response = await axios.get(`http://localhost:5000/request`);
    console.log('fetched'); 
    console.log(response.data); // Corrected console.log
    return response.data; // Return the subcategories data
  } catch (error) {
    console.error('Error fetching requests:', error);
    throw new Error('Failed to fetch requests');
  }
};
