import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../services/sellerOrderService"; // Adjust the path if needed

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
          console.log(data);
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
            key={order.order_id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <p>Status: {order.status}</p>
            <h3>Order ID: {order.order_id}</h3>
            {order.order.length > 0 && (
              <>
                <p>
                  Created At:{" "}
                  {new Date(order.order[0].created_at).toLocaleString()}
                </p>
                <h4>Address:</h4>
                <p>
                  {order.order[0].street}, {order.order[0].city},{" "}
                  {order.order[0].state} {order.order[0].zip_code},{" "}
                  {order.order[0].country}
                </p>
              </>
            )}
            <h4>Products:</h4>
            <ul>
              <li>
                {order.product_name} - Quantity: {order.quantity}
              </li>
            </ul>
            <p>Price: ${order.price}</p>
            <p>Description: {order.product_description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerOrders;
