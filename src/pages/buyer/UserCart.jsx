import React, { useEffect, useState } from "react";
import { fetchCartProducts } from "../../services/UserCartService";
import CartCard from "../../components/CartCard";
import { useNavigate } from "react-router-dom";
import PaymentPage from "../../components/PaymentPage";
const UserCart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); 
  // Fetch cart products using the service
  const getCartProducts = async () => {
    try {
      const products = await fetchCartProducts();
      setCartProducts(products);
      calculateTotal(products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

// Calculate total price
const calculateTotal = (products) => {
  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  setTotalPrice(total.toFixed(2)); // Keep 2 decimal places for price
};


// Handle quantity changes
const handleQuantityChange = (id, delta) => {
  const updatedProducts = cartProducts.map((product) =>
    product.id === id
      ? { ...product, quantity: Math.max(product.quantity + delta, 1) } // Ensure quantity doesn't go below 1
      : product
  );
  setCartProducts(updatedProducts);
  calculateTotal(updatedProducts); // Recalculate total price
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
        <>
          <div style={styles.cartContainer}>
            {cartProducts.map((product) => (
              <CartCard
                key={product.id}
                product={product}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
          <div style={styles.totalPrice}>
            <h3>Total Price: ${totalPrice}</h3>
          </div>
          <button
            style={styles.paymentButton}
            onClick={() => navigate("/PaymentPage")} // Navigate to the payment page
          >
            Continue to Payment
          </button>
        </>
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
    marginTop: "3rem"
  },
  cartContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start", // Center align the cards
    gap: "16px", // Slightly reduced gap between cards
    marginTop: "16px",
  },
  totalPrice: {
    marginTop: "24px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    textAlign: "right",
    color: "#2c3e50",
  },
  paymentButton: {
    marginTop: "16px",
    padding: "10px 20px",
    background: "#38170c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    textAlign: "right",
  },
};
export default UserCart;
