import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Link from 'next/link';
import { getLatestProducts } from '../api/ProductData';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getLatestProducts().then(setProducts);
  }, []);

  return (
    <div style={{ margin: '80px' }}>
      <Table>
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
                <td>{p.name}</td>
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
    </div>
  );
}

export default Home;
