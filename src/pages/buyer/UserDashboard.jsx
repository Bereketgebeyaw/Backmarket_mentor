import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productService";
import ProductCard from "../../components/ProductCard";

import UserTopbar from "../../components/TopBar/UserTopbar";

import Sidebar from "../../components/Sidebar/Sidebar";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState(null);

  const userRole = "buyer"
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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar role={userRole} />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <UserTopbar cartCount={cartCount} />
        {cartMessage && (
          <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>
            {cartMessage}
          </p>
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {products.length > 0 ? (
            products.map((product) => (
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
  );
};

export default UserDashboard;
