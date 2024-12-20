import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const TopBar = ({ cartCount }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  // Load cart items when dropdown is opened
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
    navigate("/login"); // Navigate to the login page
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1); // Remove the item by index

    // Update localStorage and state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1; // Increase quantity by 1

    // Update localStorage and state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1; // Decrease quantity by 1
    }

    // Update localStorage and state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };
const handleCheckout = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // Check if the user is logged in

  if (!isLoggedIn) {
    const proceedToAccount = window.confirm(
      "You need to create an account or log in to proceed with checkout. Do you want to create an account or log in?"
    );

    if (proceedToAccount) {
      // Store cartItems in localStorage
    
      window.location.href = "/login";
    }
  } else {
    alert("Proceeding to checkout...");
    // Add your checkout logic here
  }
};


  
  
  

  return (
    <div style={styles.topBar}>
      <div style={styles.logoContainer}>
        <img
          src=".png"
          alt="Logo"
          style={styles.logo}
        />
        <span style={styles.tagline}>Our Marketplace</span>
      </div>
      <div style={styles.menu}>
        <a href="#men" style={styles.menuItem}>
          MEN
        </a>
        <a href="#women" style={styles.menuItem}>
          WOMEN
        </a>
        <a href="#kids" style={styles.menuItem}>
          KIDS
        </a>
        <a href="#jewelry" style={styles.menuItem}>
          Jewelry
        </a>
        <a href="#electronics" style={styles.menuItem}>
          Electronics
        </a>
        <a href="#perfume" style={styles.menuItem}>
          Perfume
        </a>
        <a href="#kitchen" style={styles.menuItem}>
          Kitchen Item
        </a>
        <a href="#gift" style={styles.menuItem}>
          Gift Card
        </a>
      </div>
      <div style={styles.rightSection}>
        <select style={styles.currencyDropdown}>
          <option value="ETB">ETB (Br)</option>
          <option value="USD">USD ($)</option>
        </select>
        <div style={styles.cartContainer} onClick={toggleDropdown}>
          <span style={styles.cartIcon}>🛒</span>
          {cartCount > 0 && <span style={styles.cartCount}>{cartCount}</span>}
          {isDropdownVisible && (
            <div style={styles.dropdown}>
              <h4>Cart Items</h4>
              {cartItems.length > 0 ? (
                <>
                  <ul style={styles.cartList}>
                    {cartItems.map((item, index) => (
                      <li key={index} style={styles.cartItem}>
                        <div style={styles.cartItemDetails}>
                          <strong>{item.name}</strong> - ${item.price}
                          <div style={styles.quantityControls}>
                            <button
                              style={styles.quantityButton}
                              onClick={() => handleDecreaseQuantity(index)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              style={styles.quantityButton}
                              onClick={() => handleIncreaseQuantity(index)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          style={styles.removeButton}
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
                  <button style={styles.checkoutButton} onClick={handleCheckout}>
                    Checkout
                  </button>
                </>
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>
          )}
        </div>
        <button style={styles.loginButton} onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

const styles = {
  topBar: {
    marginTop:"0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f5ec",
    padding: "10px 20px",
    borderBottom: "2px solid #ccc",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "50px",
    marginRight: "10px",
  },
  tagline: {
    color: "#b1975b",
    fontSize: "18px",
    fontWeight: "bold",
  },
  menu: {
    display: "flex",
    gap: "15px",
  },
  menuItem: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    padding: "5px 10px",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  
  
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  currencyDropdown: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px",
  },
  cartContainer: {
    position: "relative",
    cursor: "pointer",
  },
  cartIcon: {
    fontSize: "24px",
  },
  cartCount: {
    position: "absolute",
    top: "-5px",
    right: "-10px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    top: "40px",
    right: "0",
    width: "300px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    padding: "10px",
    borderRadius: "8px",
    color: "#333",
  },
  cartList: {
    listStyle: "none",
    padding: "0",
    margin: "0",
    maxHeight: "200px",
    overflowY: "auto",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 0",
    borderBottom: "1px solid #ddd",
  },
  cartItemDetails: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#ddd",
    border: "none",
    padding: "5px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "0 5px",
  },
  checkoutButton: {
    marginTop: "10px",
    width: "100%",
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },



  loginButton: {
    backgroundColor: "#b1975b",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TopBar;