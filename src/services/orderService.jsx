import axios from "axios";

export const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Ensure token exists in localStorage

    if (!token) {
      throw new Error("User is not authenticated.");
    }

    const response = await axios.get("http://localhost:5000/orders/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Process the response to extract and shape data
    const orders = response.data.orders.map((order) => ({
      id: order.id,
      status: order.status,
      createdAt: order.created_at,
      address: {
        street: order.address.street,
        city: order.address.city,
        state: order.address.state,
        zipCode: order.address.zip_code,
        country: order.address.country,
      },
      products: order.products.map((product) => ({
        id: product.product_id,
        name: product.name,
        quantity: product.quantity,
      })),
    }));

    return orders; // Return structured data for frontend use
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "An error occurred while fetching orders."
    );
  }
};
