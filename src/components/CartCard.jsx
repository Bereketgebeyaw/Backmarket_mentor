import React from "react";

const CartCard = ({ product }) => {
  const imageSrc = product.image
    ? `data:image/png;base64,${product.image}` // For PNG image type
    : ''; 


  return (

    <div style={styles.cartItem}>
      <div style={styles.cartItemContent}>
        {/* Render the product image */}
        {product.image && (
          <img
            src={imageSrc}
            alt={product.name}
            style={styles.cartItemImage}
          />
        )}
        <h3 style={styles.cartItemTitle}>{product.name}</h3>
        <p style={styles.cartItemPrice}>Price: ${product.price}</p>
        <p style={styles.cartItemQuantity}>Quantity: {product.quantity}</p>
      </div>
    </div>
  );
};


const styles = {
  cartItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px", // Smaller margin for a compact design
    border: "1px solid #e0e0e0",
    borderRadius: "8px", // Slightly reduced radius for subtle curves
    padding: "16px", // Reduced padding for compactness
    textAlign: "center",
    backgroundColor: "#ffffff",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", // Lighter shadow for a cleaner look
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    maxWidth: "280px", // Reduced card width for a tighter layout
    width: "100%",
  },
  cartItemContent: {
    padding: "8px", // Reduced padding inside the card
    width: "100%",
  },
  cartItemImage: {
    width: "100%",
    height: "auto",
    borderRadius: "6px", // Smaller radius for a cleaner look
    marginBottom: "12px", // Less space below the image
    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.1)", // Softer shadow
  },
  cartItemTitle: {
    fontSize: "1.2rem", // Reduced font size for compactness
    color: "#333",
    marginBottom: "6px",
    fontWeight: "600",
  },
  cartItemPrice: {
    fontSize: "1.1rem", // Slightly smaller font for better balance
    color: "#27ae60",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  cartItemQuantity: {
    fontSize: "0.9rem", // Smaller font for less emphasis
    color: "#555",
  },
};



export default CartCard;