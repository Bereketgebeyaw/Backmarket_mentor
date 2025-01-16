import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './UserTopbar.css'; // Import the CSS file

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
    const removedItem = updatedCart.splice(index, 1);

    try {
      const response = await fetch("http://localhost:5000/api/dashboard/update-cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          productId: removedItem[0].id,
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

    console.log(updatedCart[index].id)
    
    
    try {
      const response = await fetch("http://localhost:5000/api/dashboard/update-cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          productId: updatedCart[index].id,
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
            productId: updatedCart[index].id,
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
    navigate("/PaymentPage");
  };

  return (
    <div className="topBara">
      <div className="logoContainera">
        <img
          src=".png"
          alt="Logo"
          className="logo"
        />
        <span className="taglinea">Our Marketplace</span>
      </div>
      <div className="menua">
        <a href="#men" className="menuItema">MEN</a>
        <a href="#women" className="menuItema">WOMEN</a>
        <a href="#kids" className="menuItema">KIDS</a>
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