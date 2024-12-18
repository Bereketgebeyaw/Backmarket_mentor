import React, { useState, useEffect } from "react";

const TopBar = ({ cartCount }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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
    const userConfirmed = window.confirm(
      "You need to create an account or sign in to proceed with checkout. Do you want to continue?"
    );

    if (userConfirmed) {
      // Redirect to the signup or login page
      window.location.href = "/signup"; // Replace with the actual route for your signup page
    }
  };

  return (
    <div style={styles.topBar}>
      <h1>Buyer</h1>
      <div style={styles.cartContainer} onClick={toggleDropdown}>
        <span style={styles.cartIcon}>🛒</span>
        {cartCount > 0 && <span style={styles.cartCount}>{cartCount}</span>}

        {/* Dropdown */}
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
                          e.stopPropagation(); // Prevent dropdown toggle
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
    </div>
  );
};

const styles = {
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
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
    top: "30px",
    right: "0",
    width: "250px",
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
  removeButton: {
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
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
};

export default TopBar;
