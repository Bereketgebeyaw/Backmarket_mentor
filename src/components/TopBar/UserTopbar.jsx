import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import './UserTopbar.css'; 

const UserTopbar = ({ cartCount }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart items from the API when dropdown is opened
  useEffect(() => {
    if (isDropdownVisible) {
      const fetchCartItems = async () => {
        try {
          const token = localStorage.getItem("authToken"); // Get token from localStorage
          const response = await axios.get("http://localhost:5000/api/dashboard/cart-products", {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
            },
          });
          setCartItems(response.data.products); // Set cart items received from API
        } catch (error) {
          console.error("Error fetching cart products:", error);
        }
      };
      

      fetchCartItems();
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
    const removedItem = updatedCart.splice(index, 1);

    try {
      const response = await axios.put(
        "http://localhost:5000/api/dashboard/update-cart",
        {
          productId: removedItem[0].id,
          quantity: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
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
      const response = await axios.put(
        "http://localhost:5000/api/dashboard/update-cart",
        {
          productId: updatedCart[index].id,
          quantity: updatedCart[index].quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
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
        const response = await axios.put(
          "http://localhost:5000/api/dashboard/update-cart",
          {
            productId: updatedCart[index].id,
            quantity: updatedCart[index].quantity,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.status === 200) {
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
    navigate("/PaymentPage");
  };

  return (
    <div className="topBara">
      <div className="logoContainera">
        <img
          src="/image/buna-bank-logo.png"
          alt="Logo"
          className="logo"
        />
        <span className="taglinea">Our Marketplace</span>
      </div>
      <div className="menua">
        <a href="#men" className="menuItema">Men</a>
        <a href="#women" className="menuItema">Women</a>
        <a href="#kids" className="menuItema">Kids</a>
        <a href="#jewelry" className="menuItema">Jewelry</a>
        <a href="#electronics" className="menuItema">Electronics</a>
        <a href="#perfume" className="menuItema">Perfume</a>
        <a href="#kitchen" className="menuItema">Kitchen Item</a>
        <a href="#gift" className="menuItema">Gift Card</a>
      </div>
      <div className="rightSectiona">
        <select className="currencyDropdowna">
          <option value="ETB">ETB (Br)</option>
          <option value="USD">USD ($)</option>
        </select>
        <div className="cartContainera" onClick={toggleDropdown}>
          <span className="cartIcona">🛒</span>
          {cartCount > 0 && <span className="cartCounta">{cartCount}</span>}
          {isDropdownVisible && (
            <div className="dropdowna">
              <h4>Cart Items</h4>
              {cartItems.length > 0 ? (
                <>
                  <ul className="cartLista">
                    {cartItems.map((item, index) => (
                      <li key={index} className="cartItema">
                        <div className="cartItemDetailsa">
                          <strong>{item.name}</strong> - ${item.price}
                          <div className="quantityControlsa">
                            <button
                              className="quantityButtona"
                              onClick={() => handleDecreaseQuantity(index)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="quantityButtona"
                              onClick={() => handleIncreaseQuantity(index)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          className="removeButtona"
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
                  <button className="checkoutButtona" onClick={handleCheckout}>
                    Checkout
                  </button>
                </>
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>
          )}
        </div>
        <button className="loginButtona" onClick={handleLogin}>Log out</button>
      </div>
    </div>
  );
};

export default UserTopbar;
