import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchProductsBySubCategory,
} from "../../services/productService"; // Add fetchProductsBySubCategory
import ProductCard from "../../components/ProductCard";
import TopBar from "../../components/TopBar/TopBar";
import Footer from "../../components/bottomBar/Footer";

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query


 
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data); // Set filtered products to all initially
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
    // Filter products based on search query
    const result = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(result);
  }, [searchQuery, products]); // Re-run the filter whenever the query or products change

  const handleAddToCart = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the product already exists in the cart
      const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // If product exists, increase its quantity by 1
        cart[existingProductIndex].quantity += 1;
      } else {
        // If product does not exist, add it to the cart with quantity 1
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }

      // Update localStorage and cart count
      localStorage.setItem("cart", JSON.stringify(cart));
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalItems);
      setCartMessage("Product successfully added to cart!");
      setTimeout(() => setCartMessage(null), 3000);
      const updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
    
      window.location.href = '/user-dashboard';
    }
  }, );
  
  const handleFavorite = (product) => {
    try {
      const updatedFavorites = [...favorites];

      const existingIndex = updatedFavorites.findIndex(
        (fav) => fav.id === product.id
      );

      if (existingIndex !== -1) {
        updatedFavorites.splice(existingIndex, 1);
      } else {
        updatedFavorites.push(product);
      }

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) return <p>Loading products...</p>;

 return (
  <div >
    <TopBar
      cartCount={cartCount}
      onSubcategorySelect={handleSubcategorySelect}
    />

    {/* Main Container */}
    <div
      style={{
        margin: "20px auto",
        padding: "20px",
        maxWidth: "1200px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Search Input */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
  />
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
          backgroundColor: "#f0f0f0",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.some((fav) => fav.id === product.id)}
              onAddToCart={handleAddToCart}
              onFavorite={handleFavorite}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            No products available.
          </p>
        )}
      </div>
    </div>

    {/* Footer */}
    <Footer />
  </div>
);

};

export default BuyerDashboard;
