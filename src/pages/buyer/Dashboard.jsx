import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchProductsBySearch,
  fetchProductsBySubCategory,
} from "../../services/productService";
import ProductCard from "../../components/ProductCard";
import TopBar from "../../components/TopBar/TopBar";
import Footer from "../../components/bottomBar/Footer";
import axios from "axios";

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const loadProductsAndSellers = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData);
        setFilteredProducts(productData);

        const sellerResponse = await axios.get('http://localhost:5000/api/sellers/sellers');
        setSellers(sellerResponse.data);
      } catch (error) {
        console.error("Failed to load products or sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProductsAndSellers();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setIsSearchActive(!!searchQuery.trim());

      try {
        if (searchQuery.trim()) {
          const data = await fetchProductsBySearch(searchQuery);
          setFilteredProducts(data);
        } else {
          setFilteredProducts(products);
        }
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, products]);

  useEffect(() => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOrder === "low-to-high") return a.price - b.price;
      if (sortOrder === "high-to-low") return b.price - a.price;
      return 0;
    });

    setFilteredProducts(sortedProducts);
  }, [sortOrder]);

  const handleSubcategorySelect = async (subcategoryId) => {
    setLoading(true);
    try {
      const data = await fetchProductsBySubCategory(subcategoryId);
      setProducts(data);
      setFilteredProducts(data);
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
    setSortOrder(event.target.value);
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

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ background: "#eeeeee" }}>
      <TopBar cartCount={cartCount} onSubcategorySelect={handleSubcategorySelect} />
      <div style={{ margin: "20px auto", padding: "20px", maxWidth: "1200px", marginTop: "6rem" }}>
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
              borderRadius: "10rem",
              border: "1px solid #ccc",
              marginTop: "-1rem",
            }}
            autoFocus
          />
          {searchQuery.trim() && (
            <select
              value={sortOrder}
              onChange={handleSortChange}
              style={{
                padding: "5px 10px",
                fontSize: "14px",
                marginLeft: "0rem",
                width: "10%",
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

        {cartMessage && <p style={{ color: "green", fontWeight: "bold" }}>{cartMessage}</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "3.1rem",
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const seller = sellers.find(seller => seller.user_id === product.owner_id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  seller={seller}
                  isFavorite={favorites.some((fav) => fav.id === product.id)}
                  onAddToCart={handleAddToCart}
                  showSeller={isSearchActive} // Pass whether to show seller
                />
              );
            })
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