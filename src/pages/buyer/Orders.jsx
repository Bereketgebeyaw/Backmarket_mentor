import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../services/orderService"; // Adjust the path if needed

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h3>Order ID: {order.id}</h3>
            <p>Status: {order.status}</p>
            <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
            <h4>Address:</h4>
            <p>
              {order.address.street}, {order.address.city}, {order.address.state}{" "}
              {order.address.zipCode}, {order.address.country}
            </p>
            <h4>Products:</h4>
            <ul>
              {order.products.map((product) => (
                <li key={product.id}>
                  {product.name} - Quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;