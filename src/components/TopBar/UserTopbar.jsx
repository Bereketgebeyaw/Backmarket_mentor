import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const UserTopbar = ({ cartCount }) => {
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

  const handleRemoveFromCart = async (index) => {
    const updatedCart = [...cartItems];
    const removedItem = updatedCart.splice(index, 1)[0];
  
    try {
      const response = await fetch("http://localhost:5000/api/dashboard/update-cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          productId: removedItem.productId,
          quantity: 0,
        }),
      });
  
      if (response.ok) {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      } else {
        console.error("Failed to remove item from cart.");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
   
  
  const handleIncreaseQuantity = async (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
  
    try {
      const response = await fetch("http://localhost:5000/api/dashboard/update-cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          productId: updatedCart[index].productId,
          quantity: updatedCart[index].quantity,
        }),
      });
  
      if (response.ok) {
        // Update local storage and state
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update cart.");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  

  const handleDecreaseQuantity = async (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
  
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/update-cart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            productId: updatedCart[index].productId,
            quantity: updatedCart[index].quantity,
          }),
        });
  
        if (response.ok) {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCartItems(updatedCart);
        } else {
          console.error("Failed to update cart.");
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };
const handleCheckout = () => {
  navigate("/user/");
}


  
  
  

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
        <button style={styles.loginButton} onClick={handleLogin}>Log out</button>
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)" ,
    padding: "10px 20px",
    borderBottom: "2px solid #ccc",
    position:"fixed",
    fontFamily: 'sans-serif',

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
    color: "#00c04b",
    fontSize: "18px",
    fontWeight: "bold",
  },
  menu: {
    display: "flex",
    gap: "15px",
    fontFamily: 'sans-serif',
  },
  menuItem: {
    textDecoration: "none",
    color: "#333",
    padding: "5px 10px",
    borderRadius: "5px",
   
  },
  
  
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  currencyDropdown: {
    border: "1px solid #00c04b",
    borderRadius: "5px",
    padding: "5px",
    backgroundColor: "none",
    
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
    backgroundColor: "#00c04b",
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
    borderBottom: "1px solid #00c04b",
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
    backgroundColor: "#00c04b",
    color: "#fff",
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "##00c04b",
    color: "#fff",
    border: "none",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },



  loginButton: {
    
    color: "black",
    border: "0.1rem solid #00c04b",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "none",
  },
};

export default UserTopbar;