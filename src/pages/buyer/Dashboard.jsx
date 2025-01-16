import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productService";
import ProductCard from "../../components/ProductCard";
import TopBar from "../../components/TopBar/TopBar";
import Footer from "../../components/bottomBar/Footer";

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState(null);
  const [favorites, setFavorites] = useState([]);
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
          quantity: 1, // Initialize with quantity 1
        });
      }

      // Update localStorage and cart count
      localStorage.setItem("cart", JSON.stringify(cart));
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0); // Total cart count based on quantity
      setCartCount(totalItems); // Update cart count
      setCartMessage("Product successfully added to cart!");
      setTimeout(() => setCartMessage(null), 3000);
       const updatedFavorites = favorites.filter(
         (fav) => fav.id !== product.id
       );
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
    <div style={{ paddingTop: "0px" /* Ensure space for fixed TopBar */ }}>
      <TopBar cartCount={cartCount} />
      {cartMessage && (
        <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>
          {cartMessage}
        </p>
      )}
      <div
        style={{
          display: "grid",
          backgroundColor: "#f0f0f0",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "4.3rem",
          paddingLeft: "2rem",
          paddingRight: "1rem",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.some((fav) => fav.id === product.id)}
              onAddToCart={handleAddToCart}
              onFavorite={handleFavorite}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <div
        style={{
          position: "relative",
          marginTop: "1rem",
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default BuyerDashboard;
