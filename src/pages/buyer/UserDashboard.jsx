import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchProductsBySearch,
  fetchProductsBySubCategory,
} from "../../services/productService";
import ProductCard from "../../components/ProductCard";
import UserTopbar from "../../components/TopBar/UserTopbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/bottomBar/Footer";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortOrder, setSortOrder] = useState("");

  const userRole = "buyer";

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    // Initialize cart count
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
        setLoading(true);
        try {
          const data = await fetchProductsBySearch(searchQuery);
          setFilteredProducts(data);
        } catch (error) {
          console.error("Error during search:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredProducts(products); // Reset to all products if search is empty
      }
    };

    fetchSearchResults();
  }, [searchQuery, products]);

  useEffect(() => {
      // Apply sorting when sortOrder changes
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === "low-to-high") {
          return a.price - b.price;
        } else if (sortOrder === "high-to-low") {
          return b.price - a.price;
        }
        return 0; // Default, no sorting
      });
  
      setFilteredProducts(sortedProducts);
    }, [sortOrder]);

  const handleSubcategorySelect = async (subcategoryId) => {
    setLoading(true);
    try {
      const data = await fetchProductsBySubCategory(subcategoryId);
      setProducts(data);
      setFilteredProducts(data); // Update filtered products for the selected subcategory
    } catch (error) {
      console.error("Failed to load products for subcategory:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Update sortOrder state
  };


  const handleAddToCart = async (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProductIndex = cart.findIndex((item) => item.id === product.id);

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
      } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalItems);

      setCartMessage("Product successfully added to cart!");
      setTimeout(() => setCartMessage(null), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
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

          {/* Search Input */}
          <div style={{ textAlign: "center", marginBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "100%",
              maxWidth: "500px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            autoFocus
          />

          {/* Sort Dropdown - Visible only when searchQuery has a value */}
          {searchQuery.trim() && (
            <select
              value={sortOrder}
              onChange={handleSortChange}
              style={{
                padding: "5px 10px",
                fontSize: "14px",
                marginLeft: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
              }}
            >
              <option value="">Sort by Price</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          )}
        </div>


          {/* Cart Message */}
          {cartMessage && (
            <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>
              {cartMessage}
            </p>
          )}

          {/* Product Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))
            ) : (
              <p style={{ textAlign: "center", width: "100%" }}>No products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
