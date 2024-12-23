import React from "react";

const CartCard = ({ product }) => {
  return (

    <div style={styles.cartItem}>
      <div style={styles.cartItemContent}>
        <h3 style={styles.cartItemTitle}>{product.name}</h3>
        <p style={styles.cartItemPrice}>Price: ${product.price}</p>
        <p style={styles.cartItemQuantity}>Quantity: {product.quantity}</p>
      </div>
    </div>
  );
};


const styles = {
  cartItem: {
   
    marginTop: "20px",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    maxWidth: "2500px",
    margin: "10px",
    // Flexbox for responsive cards
  },
  cartItemContent: {
    padding: "30px",
  },
  cartItemTitle: {
    fontSize: "1.4em",
    color: "#333",
    marginBottom: "8px",
  },
  cartItemPrice: {
    fontSize: "1.2em",
    margin: "5px 0",
    color: "#28a745", // Attractive green for price
    fontWeight: "bold",
  },
  cartItemQuantity: {
    fontSize: "1.1em",
    margin: "5px 0",
    color: "#555",
  },
  
};

export default CartCard;