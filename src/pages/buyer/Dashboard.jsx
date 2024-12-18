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
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ id: product.id, name: product.name, price: product.price });
      localStorage.setItem('cart', JSON.stringify(cart));
      setCartCount(cart.length);
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
    <div style={{ paddingTop: '60px' /* Ensure space for fixed TopBar */ }}>
      <TopBar cartCount={cartCount} />
      {cartMessage && <p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center' }}>{cartMessage}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {products.length > 0
          ? products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onFavorite={() => handleFavorite(product.id)}
              />
            ))
          : <p>No products available.</p>}
      </div>
    </div>
  );
};

export default BuyerDashboard;
