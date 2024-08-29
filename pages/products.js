import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/ProductData';

export default function ShowProducts() {
  const [products, setProducts] = useState([]);

  const getAllTheProducts = () => {
    getProducts().then(setProducts);
  };
  // console.warn(products);

  useEffect(() => {
    getAllTheProducts();
  }, []);

  return (
    <div>
      {products.length === 0 ? <h1>You have no Products</h1> : products.map((product) => (
        <ProductCard key={product.id} productObj={product} />
      ))}
    </div>
  );
}
