import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/ProductData';
import { addProductToOrder } from '../api/OrderData';

export default function ShowProducts() {
  const [products, setProducts] = useState([]);

  const getAllTheProducts = () => {
    getProducts().then(setProducts);
  };

  useEffect(() => {
    getAllTheProducts();
  }, []);

  const addProductToCart = async (productId, userId) => {
    addProductToOrder(productId, userId);

    // Update quantity of product that is added to cart
    setProducts(products.map((product) => (product.id === productId ? { ...product, quantity: product.quantity - 1 } : product)));
  };

  return (
    <div className="product-page">
      {products.length === 0 ? <h1>You have no Products</h1> : products.map((product) => (
        // The addProduct is using the api to
        <ProductCard key={product.id} productObj={product} addProduct={addProductToCart} />
      ))}
    </div>
  );
}
