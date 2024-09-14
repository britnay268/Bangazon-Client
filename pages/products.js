import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/ProductData';
import { addProductToOrder } from '../api/OrderData';
import CategoriesButton from '../components/CategoriesButton';
import { getCategoryById } from '../api/CategoryData';

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

  const productsbyCategorgory = async (categoryId) => {
    // getCategoryById(categoryId).then(setProducts);
    const categoryData = await getCategoryById(categoryId);
    setProducts(categoryData.products);
  };

  return (
    <div>
      <CategoriesButton filterBy={productsbyCategorgory} filterAll={getAllTheProducts} />
      <div className="product-page">
        {products.length === 0 ? <h1>You have no Products</h1> : products.map((product) => (
        // The addProduct is using the api to
          <ProductCard key={product.id} productObj={product} addProduct={addProductToCart} />
        ))}
      </div>
    </div>
  );
}
