import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import './UserTopbar.css'; 
import { fetchCategories } from "../../services/categoryService";
import { fetchSubcategoriesByCategory } from "../../services/subcategoryService";


const UserTopbar = ({ cartCount, onSubcategorySelect, setCartCount }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showAllItems, setShowAllItems] = useState(false); // Track if all items are shown
  const navigates = useNavigate();

  const handleViewMore = () => {
   
    navigate('/user-dashboard/veiw'); // Replace with your actual path
};
  const navigate = useNavigate();
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
    
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    loadCategories();
  }, []);
  
  const handleCartUpdate = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Load cart items from the API when dropdown is opened
  useEffect(() => {
    if (isDropdownVisible) {
      const fetchCartItems = async () => {
        try {
          const token = localStorage.getItem("authToken"); // Get token from localStorage
          const response = await axios.get(
            "http://localhost:5000/api/dashboard/cart-products",
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include token in the Authorization header
              },
            }
          );
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

  const handleLogout = () => {
    console.log("Logging out..."); // Debugging log
    localStorage.removeItem("cart"); // Ensure this is executed
    alert("Are you sure you want to log out?");
    window.location.href = '/'; // Redirect to home or login page
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

  // cartCount = cartItems.reduce((total, item) => total + item.quantity, cartCount);

  return (
    <div className="topBara">
      <div className="logoContainera">
        <img src="/image/buna-bank-logo.png" alt="Logo" className="logo" />
        <span className="taglinea">Our Marketplace</span>
      </div>
      <div className="menus">
        {categories.map((category) => (
          <div key={category.id} className="menuItemContainer"  onMouseEnter={() => handleMenuClick(category.id)}
  onMouseLeave={() => setActiveMenu(null)}>
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
                      handleSubcategoryClick(sub.id);
                    }}
                  >
                    {sub.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        <a href="/wishlists" className="menuItem">
          WishList
        </a>
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
                    {cartItems.slice(0, showAllItems ? cartItems.length : 3).map((item, index) => (
                      <li key={index} className="cartItema">
                        <div className="cartItemDetailsa">
                          <strong>{item.product_name}</strong>  ${item.price}
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
                  {!showAllItems && (
                    <button className="viewMoreButtona" onClick={handleViewMore} >
                      View More
                    </button>
                  )}
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
        <button className="loginButtona" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserTopbar;
