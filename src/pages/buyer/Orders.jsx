import React, { useState, useEffect } from 'react';

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders when the component mounts or userId changes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/orders/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);  // Save the fetched orders
        } else {
          setError('Failed to fetch orders');
        }
      } catch (error) {
        setError('Error fetching orders');
        console.error(error);
      } finally {
        setLoading(false);  // Set loading to false when the fetch is complete
      }
    };

    fetchOrders();
  }, [userId]);  // Run the effect when userId changes

  // Render the component
  if (loading) {
    return <p>Loading your orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Product:</strong> {order.product_name}<br />
              <strong>Quantity:</strong> {order.quantity}<br />
              <strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
