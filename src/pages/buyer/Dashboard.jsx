import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/productService';
import { addToCart } from '../../services/cartService'; // Import cart service
import ProductCard from '../../components/ProductCard';

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState(null); // State to show success messages
  const userId = 1; // Replace with actual logged-in user's ID (e.g., from auth context)

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
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      // Call backend API to add product to cart
      const result = await addToCart(userId, productId);
      console.log('Product added to cart:', result);

      // Update UI to show success message
      setCartMessage('Product successfully added to cart!');
      setTimeout(() => setCartMessage(null), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const handleFavorite = (productId) => {
    console.log('Favorite product:', productId);
    // Add backend logic for favoriting the product
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={styles.container}>
      
      {cartMessage && <p style={styles.successMessage}>{cartMessage}</p>}
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product.id)}
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
