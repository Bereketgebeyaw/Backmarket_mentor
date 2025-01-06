import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ product, isFavorite, onAddToCart, onFavorite }) => {
  const handleFavoriteClick = () => {
    onFavorite(product); // Add or remove from favorites
  };

  return (
    
    <div style={styles.card} >
      

      {/* Product Image */}
      <div style={styles.imageContainer}>
        <img src={product.image} alt={product.name} style={styles.image} />
      </div>

      {/* Product Name */}
      <h3 style={styles.name}>{product.name}</h3>

      {/* Product Description */}
      <p style={styles.description}>{product.description}</p>

      {/* Product Price */}
      <p style={styles.price}>${product.price}/price</p>

      {/* Action Buttons */}
      <div style={styles.actions}>
        <button style={styles.cartButton} onClick={() => onAddToCart(product)}>
          Add to Cart 🛒
          </button>
          
          <button
          style={{
            ...styles.favoriteButton,
            color: isFavorite ? "red" : "gray", // Dynamically change color
          }}
          onClick={handleFavoriteClick}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>

       
       
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    marginTop: "4.5rem",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    fontFamily: 'sans-serif',
   

  },
  

  imageContainer: {
    height: "200px",
    overflow: "hidden",
    borderRadius: "12px",
    marginBottom: "-28px",
    marginTop: "-1.5rem",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2c3e50",
    margin: "10px 0",
    textAlign: "left",
  },
  description: {
    fontSize: "14px",
    color: "#7f8c8d",
    marginBottom: "10px",
    textAlign: "left",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2980b9",
    textAlign: "left",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  cartButton: {
    backgroundColor: "#00c04b",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    width:"15rem",
    borderRadius: "100px",
    
    cursor: "pointer",
  },
  favoriteButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    marginTop: " -35rem",
    transition: "color 0.3s ease",
  },
};

export default ProductCard;
