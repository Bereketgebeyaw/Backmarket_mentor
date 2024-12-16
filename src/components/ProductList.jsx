// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product Listing</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => {}}
              onFavorite={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
