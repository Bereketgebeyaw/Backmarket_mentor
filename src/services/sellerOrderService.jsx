import axios from "axios";

export const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Ensure token exists in localStorage

    if (!token) {
      throw new Error("User is not authenticated.");
    }

    const response = await axios.get("http://localhost:5000/api/sellers/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   console.log(response.data.orders);
    return response.data.orders; 
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "An error occurred while fetching orders."
    );
  }
};
