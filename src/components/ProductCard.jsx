import React from 'react';

const ProductCard = ({ product, onAddToCart, onFavorite }) => {
  return (
    <div style={styles.card}>
      {/* Product Image */}
      {product.image ? (
        <div style={styles.imageContainer}>
          <img src={product.image} alt={product.name} style={styles.image} />
        </div>
      ) : (
        <div style={styles.placeholder}>No Image Available</div>
      )}

      {/* Product Name */}
      <h3 style={styles.name}>{product.name}</h3>

      {/* Product Description */}
      <p style={styles.description}>{product.description}</p>

      {/* Product Price */}
      <p style={styles.price}>${product.price}</p>

      {/* Action Buttons */}
      <div style={styles.actions}>
        <button style={styles.cartButton} onClick={() => onAddToCart(product.id)}>
          Add to Cart 🛒
        </button>
        <button style={styles.favoriteButton} onClick={() => onFavorite(product.id)}>
          ♥️ Favorite
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    marginTop:"30px",
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    maxWidth: '300px',
    margin: 'auto',
  },
  imageContainer: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    borderRadius: '12px',
    marginBottom: '15px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain', // Ensures the entire image fits within the container
  },
  placeholder: {
    width: '100%',
    height: '200px',
    backgroundColor: '#e0e0e0',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#b0b0b0',
    marginBottom: '15px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2c3e50',
    margin: '10px 0',
  },
  description: {
    fontSize: '14px',
    color: '#7f8c8d',
    marginBottom: '10px',
    minHeight: '40px',
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2980b9',
    margin: '10px 0',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  cartButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  favoriteButton: {
    backgroundColor: '#9b59b6', // Changed to purple
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};

export default ProductCard;
