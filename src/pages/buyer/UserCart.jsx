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
    padding: "16px", // Reduced padding for a tighter layout
    textAlign: "left",
    maxWidth: "900px", // Reduced max width for a compact layout
    margin: "0 auto",
  },
  cartContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start", // Center align the cards
    gap: "16px", // Slightly reduced gap between cards
    marginTop: "16px",
  },
};
export default UserCart;
