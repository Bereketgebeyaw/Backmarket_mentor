import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:5000/category");
    console.log("Fetched Categories:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching Categories:", error);
    return [];
  }
};
