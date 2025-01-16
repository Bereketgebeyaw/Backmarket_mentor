const CartCard = ({ product, onQuantityChange }) => {
  const imageSrc = product.image
    ? `data:image/png;base64,${product.image}`
    : "";

  return (
    <div style={styles.cartItem}>
      <div style={styles.cartItemContent}>
        {product.image && (
          <img
            src={imageSrc}
            alt={product.price}
            style={styles.cartItemImage}
          />
        )}
        <h3 style={styles.cartItemTitle}>{product.price}</h3>
        <p style={styles.cartItemPrice}>Price: ${product.price}</p>
        <div style={styles.quantityControls}>
          <button
            style={styles.quantityButton}
            onClick={() => onQuantityChange(product.id, -1)} // Decrease quantity
          >
            -
          </button>
          <span style={styles.quantity}>{product.quantity}</span>
          <button
            style={styles.quantityButton}
            onClick={() => onQuantityChange(product.id, 1)} // Increase quantity
          >
            +
          </button>
        </div>
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
    margin: "10px",
    border: "1px solid transparent",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "center",
    background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    maxWidth: "300px",
    width: "100%",
  },
  cartItemContent: {
    padding: "10px",
    width: "100%",
  },
  cartItemImage: {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  },
  cartItemTitle: {
    fontSize: "1.4rem",
    color: "#2c3e50",
    marginBottom: "8px",
    fontWeight: "bold",
    fontFamily: "'Poppins', sans-serif",
  },
  cartItemPrice: {
    fontSize: "1.2rem",
    color: "#27ae60",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  quantityButton: {
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  quantity: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#555",
  },
};




export default CartCard;