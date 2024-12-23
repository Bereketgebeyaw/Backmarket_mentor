import React, { useEffect, useState } from "react";
import { fetchCartProducts } from "../../services/UserCartService";
import CartCard from "../../components/CartCard";

const UserCart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch cart products using the service
  const getCartProducts = async () => {
    try {
      const products = await fetchCartProducts();
      setCartProducts(products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getCartProducts();
  }, []);

  // Loading or error states
  if (loading) return <div className="loading">Loading your cart...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2>Your Cart</h2>
      {cartProducts.length === 0 ? (
        <p>No products in your cart.</p>
      ) : (
        <div style={styles.cartContainer}>
          {cartProducts.map((product) => (
            <CartCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "left", // Align text to the left
    maxWidth: "1200px", // Set a maximum width for the container
    margin: "0 auto", // Center the container on the page (horizontally only)
  },
  cartContainer: {
    display: "flex", // Flexbox for horizontal layout
    flexWrap: "wrap", // Allow wrapping to the next row if space runs out
    justifyContent: "flex-start", // Align cards to the left
    gap: "20px", // Space between cards
    marginTop: "20px",
  },
};
export default UserCart;
