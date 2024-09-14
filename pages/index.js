/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Link from 'next/link';
import { getLatestProducts, getProducts } from '../api/ProductData';
import CategoriesButton from '../components/CategoriesButton';
import { getCategoryById } from '../api/CategoryData';
import ProductCard from '../components/ProductCard';
import { addProductToOrder } from '../api/OrderData';

function Home() {
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  // This is implemented to show the table based only for the latest products and not for products by category
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    getLatestProducts().then(setProducts);
  }, []);

  const getAllTheProducts = () => {
    getProducts().then(setProducts);
    setCategoryId(null);
    // If the show table is true, set the show table to false to show all the products in the product card when a user clicks the All category button as the getAllTheProducts function is called in the ProductCard
    if (showTable) {
      setShowTable(false);
    }
  };

  const addProductToCart = async (productId, userId) => {
    addProductToOrder(productId, userId);

    // Update quantity of product that is added to cart
    setProducts(products.map((product) => (product.id === productId ? { ...product, quantity: product.quantity - 1 } : product)));
  };

  const productsbyCategorgory = async (categoryID) => {
    // getCategoryById(categoryId).then(setProducts);
    const categoryData = await getCategoryById(categoryID);
    setProducts(categoryData.products);
    setCategoryId(categoryId);
    setShowTable(false);
  };

  return (
    <div style={{ margin: '10px 80px' }}>
      <CategoriesButton filterBy={productsbyCategorgory} filterAll={getAllTheProducts} />
      {showTable
        ? (
          <Table style={{ marginTop: '40px' }}>
            <thead>
              <tr>
                <th style={{ fontSize: 'larger' }}>Latest Products</th>
                <th className="seeAllProducts">
                  <Link passHref href="/products">
                    <Button variant="success">See All Products</Button>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {
            products.map((p) => (
              <tr key={p.id}>
                <td><img src={p.imageUrl} alt="productImage" className="prodImage" />{p.name}</td>
                <td className="productLinks">
                  <Link passHref href={`/products/${p.id}`}>
                    <Button variant="link">https://{p.name}/details</Button>
                  </Link>
                </td>
              </tr>
            ))
          }
            </tbody>
          </Table>
        )
        : (
          <div>
            <div className="product-page">
              {products.length === 0 ? <h1>You have no Products</h1> : products.map((product) => (
                // The addProduct is using the api to
                <ProductCard key={product.id} productObj={product} addProduct={addProductToCart} />
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

export default Home;
