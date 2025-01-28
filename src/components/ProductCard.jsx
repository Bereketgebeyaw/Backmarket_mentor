import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import './ProductCard.css';

const ProductCard = ({ product, isFavorite, onAddToCart, onFavorite, seller, showSeller }) => {
  return (
    <div className="card">
      <div className="imageContainer">
        <img src={product.image} alt={product.product_name} className="image" />
      </div>

      <h3 className="name">{product.product_name}</h3>
      <p className="description">{product.product_description}</p>
      <p className="price">${product.price}</p>

      {/* Always render the seller name container to maintain layout */}
      <div className="sellerContainer">
        {showSeller && seller ? (
          <p className="seller_name">Seller: {seller.business_name}</p>
        ) : (
          <p className="seller_name" style={{ visibility: 'hidden' }}>Seller: Placeholder</p> // Placeholder to maintain space
        )}
      </div>

      <div className="actions">
        <button className="cartButton" onClick={() => onAddToCart(product)}>
          Add to Cart 🛒
        </button>
        
        <button
          className="favoriteButton"
          style={{ color: isFavorite ? "red" : "gray" }}
          onClick={() => onFavorite(product)}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;