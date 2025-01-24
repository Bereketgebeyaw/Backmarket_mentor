import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchProductsBySearch,
  fetchProductsBySubCategory, // Added this import
} from "../../services/productService";
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
    // Load all products initially
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
    // Fetch products by search query or show all
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
        setLoading(true);
        try {
          const data = await fetchProductsBySearch(searchQuery);
          setFilteredProducts(data);
        } catch (error) {
          console.error("Failed to fetch search results:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredProducts(products); // Reset to all products if search is empty
      }
    };

    fetchSearchResults();
  }, [searchQuery, products]);

  const handleSubcategorySelect = async (subcategoryId) => {
    setLoading(true);
    try {
      const data = await fetchProductsBySubCategory(subcategoryId);
      setProducts(data);
      setFilteredProducts(data); // Update filtered products when subcategory changes
    } catch (error) {
      console.error("Failed to load products for subcategory:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddToCart = (product) => {
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

      const updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


 
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

 

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <TopBar cartCount={cartCount} onSubcategorySelect={handleSubcategorySelect} />
      <div style={{ margin: "20px auto", padding: "20px", maxWidth: "1200px" }}>
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
        {cartMessage && <p style={{ color: "green", fontWeight: "bold" }}>{cartMessage}</p>}

        {/* Product Cards */}
        <div
          style={{
            display: "grid",
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
              />
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%" }}>No products found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
