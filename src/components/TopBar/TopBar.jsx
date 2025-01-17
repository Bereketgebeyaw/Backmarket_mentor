import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";
import { fetchCategories } from "../../services/categoryService";
import { fetchSubcategoriesByCategory } from "../../services/subcategoryService";

const TopBar = ({ cartCount, onSubcategorySelect }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleMenuClick = async (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
    if (activeMenu !== menuId) {
      const fetchedSubcategories = await fetchSubcategoriesByCategory(menuId);
      setSubcategories(fetchedSubcategories);
    }
  };

  const handleSubcategoryClick = (subcategoryId) => {
    onSubcategorySelect(subcategoryId); // Call the parent function with the subcategory ID
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
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
        <img src=".png" alt="Logo" className="logo" />
        <span className="tagline">Our Marketplace</span>
      </div>
      <div className="menu">
        {categories.map((category) => (
          <div key={category.id} className="menuItemContainer">
            <a
              href="#"
              className="menuItem"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick(category.id);
              }}
            >
              {category.name}
            </a>
            {activeMenu === category.id && subcategories.length > 0 && (
              <div className="subMenu">
                {subcategories.map((sub) => (
                  <a
                    key={sub.id}
                    href="#"
                    className="subMenuItem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubcategoryClick(sub.id); // Trigger product update
                    }}
                  >
                    {sub.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
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
        <button className="loginButton" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default TopBar;
