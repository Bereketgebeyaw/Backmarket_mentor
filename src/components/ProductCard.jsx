import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import './ProductCard.css'; // Import the CSS file

const ProductCard = ({ product, isFavorite, onAddToCart, onFavorite }) => {


  return (
    <div className="card">
      {/* Product Image */}
      <div className="imageContainer">
        <img src={product.image} alt={product.product_name} className="image" />
      </div>

      {/* Product Name */}
      <h3 className="name">{product.product_name}</h3>

      {/* Product Description */}
      <p className="description">{product.product_description}</p>

      {/* Product Price */}
      <p className="price">${product.price}</p>

      {/* Action Buttons */}
      <div className="actions">
        <button className="cartButton" onClick={() => onAddToCart(product)}>
          Add to Cart 🛒
        </button>

        <button
          className="favoriteButton"
          style={{ color: isFavorite ? "red" : "gray" }} // Keep dynamic style for favorite button
          onClick={() => onFavorite(product)}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;