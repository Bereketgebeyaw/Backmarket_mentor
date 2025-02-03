import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";
import { fetchCategories } from "../../services/categoryService";
import { fetchSubcategoriesByCategory } from "../../services/subcategoryService";

const TopBar = ({ onSubcategorySelect , cartCount, setCartCount }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  // Fetch categories on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(total);
  }, [cartItems]);
  

  // Load cart items from local storage
  const loadCartItems = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  };

  useEffect(() => {
    loadCartItems(); // Load cart items when component mounts
  }, []);

  const toggleDropdown = () => {
    if (!isDropdownVisible) {
      loadCartItems(); // Refresh cart items when dropdown is opened
    }
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleMenuClick = async (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
    if (activeMenu !== menuId) {
      const fetchedSubcategories = await fetchSubcategoriesByCategory(menuId);
      setSubcategories(fetchedSubcategories);
    }
  };

  const handleSubcategoryClick = (subcategoryId) => {
    onSubcategorySelect(subcategoryId);
  };

  const updateCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart); // Update state to reflect changes
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    updateCart(updatedCart);
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

  // Calculate cart count dynamically
// cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="topBar">
      <div className="logoContainer">
        <img src="/image/buna-bank-logo.png" alt="Logo" className="logo" />
        <span className="tagline">Our Marketplace</span>
      </div>
      <div className="menus">
        {categories.map((category) => (
          <div key={category.id} className="menuItemContainer" onMouseEnter={() => handleMenuClick(category.id)}
            onMouseLeave={() => setActiveMenu(null)}>
            <a href="#" className="menuItem" onClick={(e) => {
              e.preventDefault();
              handleMenuClick(category.id);
            }}>
              {category.name}
            </a>
            {activeMenu === category.id && subcategories.length > 0 && (
              <div className="subMenu">
                {subcategories.map((sub) => (
                  <a key={sub.id} href="#" className="subMenuItem" onClick={(e) => {
                    e.preventDefault();
                    handleSubcategoryClick(sub.id);
                  }}>
                    {sub.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        <a href="/wishlists" className="menuItem">WishList</a>
      </div>
      <div className="rightSection">
        <select className="currencyDropdown">
          <option value="ETB">ETB (Br)</option>
          <option value="USD">USD ($)</option>
        </select>
        <div className="cartContainer" onClick={toggleDropdown}>
          <span className="cartIcon">🛒</span>
          {cartCount > 0 && <span className="cartCount">{cartCount}</span>} {/* Display cart count here */}
          {isDropdownVisible && (
            <div className="dropdown">
              <h4>Cart Items</h4>
              {cartItems.length > 0 ? (
                <>
                  <ul className="cartList">
                    {cartItems.map((item, index) => (
                      <li key={index} className="cartItem">
                        <div className="cartItemDetails">
                          <strong>{item.name}</strong> ${item.price}
                          <div className="quantityControls">
                            <button className="quantityButton" onClick={() => handleDecreaseQuantity(index)}>-</button>
                            <span>{item.quantity}</span>
                            <button className="quantityButton" onClick={() => handleIncreaseQuantity(index)}>+</button>
                          </div>
                        </div>
                        <button className="removeButton" onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromCart(index);
                        }}>
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button className="checkoutButton" onClick={handleCheckout}>Checkout</button>
                </>
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>
          )}
        </div>
        <button className="loginButton" onClick={() => navigate("/login")}>Log In</button>
      </div>
    </div>
  );
};

export default TopBar;