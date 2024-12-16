import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard';

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleAddToCart = (productId) => {
    console.log('Add to cart:', productId);
    // Add backend logic for adding to the cart
  };

  const handleFavorite = (productId) => {
    console.log('Favorite product:', productId);
    // Add backend logic for favoriting the product
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={styles.container}>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onFavorite={handleFavorite}
          />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

const styles = {
  container: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }
};

export default BuyerDashboard;
