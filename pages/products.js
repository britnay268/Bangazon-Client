import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/ProductData';
import { addProductToOrder } from '../api/OrderData';

export default function ShowProducts() {
  const [products, setProducts] = useState([]);

  const getAllTheProducts = () => {
    getProducts().then(setProducts);
  };

  // console.warn(userId);

  useEffect(() => {
    getAllTheProducts();
  }, []);

  return (
    <div className="product-page">
      {products.length === 0 ? <h1>You have no Products</h1> : products.map((product) => (
        // The addProduct is using the api to
        <ProductCard key={product.id} productObj={product} addProduct={addProductToOrder} />
      ))}
    </div>
  );
}
