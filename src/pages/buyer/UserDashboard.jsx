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


  const [sortOrder, setSortOrder] = useState("");


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
    setSortOrder(event.target.value); // Update sortOrder state
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
          cartId,
         
          productId: product.product_id,
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
          { productId: product.product_id, quantity, productName: product.product_name },
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
           <select style={{width:"15%"}}>
              <option value="">Sort by Price</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
        </div>


          {cartMessage && (
            <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>
              {cartMessage}
            </p>
          )}

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