import axios from "axios";


export const fetchCartProducts = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Ensure token exists in localStorage

    if (!token) {
      throw new Error("User is not authenticated.");
    }

    const response = await axios.get("http://localhost:5000/api/users/cart", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data.products; 
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "An error occurred while fetching cart products."
    );
  }
};
