import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  fetchProducts,
  fetchProductsBySearch,
  fetchProductsBySubCategory,
} from "../../services/productService";
import ProductCard from "../../components/ProductCard";
import UserTopbar from "../../components/TopBar/UserTopbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/bottomBar/Footer";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const userRole = "buyer";

  useEffect(() => {
    const loadProductsAndSellers = async () => {
      setLoading(true);
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);

        const sellerResponse = await axios.get('http://localhost:5000/api/sellers/sellers');
        setSellers(sellerResponse.data);
      } catch (error) {
        console.error("Failed to load products or sellers:", error);
      } finally {
        setLoading(false);
      }

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    };

    loadProductsAndSellers();
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
        <Sidebar role={userRole} />

        <div style={{ flex: 1, padding: "20px" }}>
          <UserTopbar
            cartCount={cartCount}
            onSubcategorySelect={handleSubcategorySelect}
          />

          <div style={{ marginBottom: "20px", textAlign: "center", marginTop: "6rem" }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "100%",
                maxWidth: "500px",
                borderRadius: "5rem",
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9"
              }}
            />
          </div>

          {cartMessage && (
            <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>
              {cartMessage}
            </p>
          )}
{/* hslfhlhfsdhk */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
              backgroundColor: "#f9f9f9",
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
                    onAddToCart={() => handleAddToCart(product)}
                     showSeller={isSearchActive} // Pass whether to show seller
                  />
                );
              })
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