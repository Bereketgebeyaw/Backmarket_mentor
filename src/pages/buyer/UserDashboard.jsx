import React, { useEffect, useState } from "react";
import { fetchProducts ,fetchProductsBySubCategory, fetchProductsBySearch } from "../../services/productService";
import ProductCard from "../../components/ProductCard";

import UserTopbar from "../../components/TopBar/UserTopbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/bottomBar/Footer";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [searchResults, setSearchResults] = useState([]); // State for search results

  const userRole = "buyer";

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    // Initialize cart count
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0)); // Initialize with total quantity of items in cart
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim()) {
        try {
          const data = await fetchProductsBySearch(searchQuery);
          setSearchResults(data);
        } catch (error) {
          console.error("Error during search:", error);
        }
      } else {
        setSearchResults(products); // If search query is empty, show all products
      }
    };

  
    handleSearch();
  }, [searchQuery, products]); // Trigger search when query changes
const handleSubcategorySelect = async (subcategoryId) => {
  setLoading(true);
  try {
    const data = await fetchProductsBySubCategory(subcategoryId);
    setProducts(data);
  } catch (error) {
    console.error("Failed to load products for subcategory:", error);
  } finally {
    setLoading(false);
  }
};

  const handleAddToCart = async (product) => {
    try {
      const cartId = JSON.parse(localStorage.getItem("cartId"));
      const quantity = 1;

      const response = await fetch("http://localhost:5000/api/dashboard/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Update cart count locally
        setCartCount((prevCount) => prevCount + quantity);

        // Save cart details to localStorage for persistence
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = [
          ...currentCart,
          { id: product.id, quantity, name: product.name, price: product.price },
        ];
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Provide feedback to the user
        setCartMessage(`Added ${product.name} to your cart!`);
        setTimeout(() => setCartMessage(null), 3000); // Clear message after 3 seconds
      } else {
        const errorData = await response.json();
        console.error("Error adding product to cart:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFavorite = (productId) => {
    console.log("Favorite product:", productId);
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sidebar role={userRole} />

        {/* Main Content */}
        <div style={{ flex: 1, padding: "20px" }}>
          <UserTopbar
            cartCount={cartCount}
            onSubcategorySelect={handleSubcategorySelect}
          />
        
          {/* Search Bar */}
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "10px",
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
                display: "block",
              }}
            />
          </div>
          {cartMessage && (
            <p
              style={{
                color: "green",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {cartMessage}
            </p>
          )}
          <Outlet /> {/* This will render child routes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              gap: "1.3rem",
              backgroundColor: "#f0f0f0",
            }}
          >
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onFavorite={() => handleFavorite(product.id)}
                />
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
