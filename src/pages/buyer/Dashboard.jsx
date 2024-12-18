import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard';
import TopBar from '../../components/TopBar/TopBar';

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    // Initialize cart count
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  }, []);

  const handleAddToCart = (product) => {
    try {
      // Get current cart or initialize an empty array
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Add the product details (not just ID)
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
      });

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Update cart count
      setCartCount(cart.length);

      // Show success message
      setCartMessage('Product successfully added to cart!');
      setTimeout(() => setCartMessage(null), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleFavorite = (productId) => {
    console.log('Favorite product:', productId);
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={styles.container}>
      <TopBar cartCount={cartCount} />
      {cartMessage && <p style={styles.successMessage}>{cartMessage}</p>}
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
  );
};

const styles = {
  container: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' },
  successMessage: { color: 'green', fontWeight: 'bold', textAlign: 'center' },
};

export default BuyerDashboard;
