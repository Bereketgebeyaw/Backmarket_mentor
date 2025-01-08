import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import './TopBar.css'; // Import the external CSS file

const TopBar = ({ cartCount }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDropdownVisible) {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    }
  }, [isDropdownVisible]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  }; 

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      const proceedToAccount = window.confirm(
        "You need to create an account or log in to proceed with checkout. Do you want to create an account or log in?"
      );
      if (proceedToAccount) {
        window.location.href = "/login";
      }
    } else {
      alert("Proceeding to checkout...");
    }
  };

  return (
    <div className="topBar">
      <div className="logoContainer">
        <img
          src=".png"
          alt="Logo"
          className="logo"
        />
        <span className="tagline">Our Marketplace</span>
      </div>
      <div className="menu">
        <a href="/" className="menuItem">MEN</a>
        <a href="/" className="menuItem">WOMEN</a>
        <a href="/" className="menuItem">KIDS</a>
        <a href="/" className="menuItem">Jewelry</a>
        <a href="/" className="menuItem">Electronics</a>
        <a href="/" className="menuItem">Perfume</a>
        <a href="/" className="menuItem">Kitchen Item</a>
        <a href="/wishlists" className="menuItem">WishList</a>
      </div>
      <div className="rightSection">
        <select className="currencyDropdown">
          <option value="ETB">ETB (Br)</option>
          <option value="USD">USD ($)</option>
        </select>
        <div className="cartContainer" onClick={toggleDropdown}>
          <span className="cartIcon">🛒</span>
          {cartCount > 0 && <span className="cartCount">{cartCount}</span>}
          {isDropdownVisible && (
            <div className="dropdown">
              <h4>Cart Items</h4>
              {cartItems.length > 0 ? (
                <>
                  <ul className="cartList">
                    {cartItems.map((item, index) => (
                      <li key={index} className="cartItem">
                        <div className="cartItemDetails">
                          <strong>{item.name}</strong> - ${item.price}
                          <div className="quantityControls">
                            <button
                              className="quantityButton"
                              onClick={() => handleDecreaseQuantity(index)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="quantityButton"
                              onClick={() => handleIncreaseQuantity(index)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          className="removeButton"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromCart(index);
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button className="checkoutButton" onClick={handleCheckout}>
                    Checkout
                  </button>
                </>
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>
          )}
        </div>
        <button className="loginButton" onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default TopBar;