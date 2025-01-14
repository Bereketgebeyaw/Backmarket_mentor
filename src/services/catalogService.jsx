import axios from "axios";

export const fetchCatalogsBySubCategory = async (subcategoryId) => {
  try {
    console.log(subcategoryId); // Corrected console.log
    const response = await axios.get(
      `http://localhost:5000/catalogs/${subcategoryId}`
    );
    console.log("fetched");
    console.log(response.data); // Corrected console.log
    return response.data; // Return the subcategories data
  } catch (error) {
    console.error("Error fetching catalogs:", error);
    throw new Error("Failed to fetch catalogs");
  }
};
