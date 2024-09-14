/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Link from 'next/link';
import { getLatestProducts } from '../api/ProductData';
import CategoriesButton from '../components/CategoriesButton';
import { getCategoryById } from '../api/CategoryData';
import ProductCard from '../components/ProductCard';
import { addProductToOrder } from '../api/OrderData';

function Home() {
  const [products, setProducts] = useState([]);

  // This is implemented to show the table based only for the latest products and not for products by category
  const [showTable, setShowTable] = useState(true);
  // This is to store the categoryname from
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    getLatestProducts().then(setProducts);
  }, []);

  const addProductToCart = async (productId, userId) => {
    addProductToOrder(productId, userId);

    // Update quantity of product that is added to cart
    setProducts(products.map((product) => (product.id === productId ? { ...product, quantity: product.quantity - 1 } : product)));
  };

  const productsbyCategory = async (categoryID, catName) => {
    const categoryData = await getCategoryById(categoryID);
    setProducts(categoryData.products);

    setCategoryName(catName);
    setShowTable(false);
  };

  return (
    <div style={{ margin: '10px 80px' }}>
      <CategoriesButton filterBy={productsbyCategory} />
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
            <h6 style={{ marginTop: '20px', marginBottom: '0px' }}>{categoryName} ({products.length})</h6>
            <div className="categoryLinks">
              {/* Added slice to show only 3 products */}
              {products.slice(0, 3).map((product) => (
                <Link passHref href={`/products/${product.id}`}>
                  <Button variant="link">{product.name}</Button>
                </Link>
              ))}
            </div>
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
