import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Link from 'next/link';
import { getLatestProducts } from '../api/ProductData';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

function Home() {
  // const { user } = useAuth();
  const [products, setProducts] = useState([]);

  // const theLatestProducts = () => {
  //   getLatestProducts().then(setProducts);
  // };

  // getLatestProducts().then(setProducts);
  // console.warn(products);

  useEffect(() => {
    getLatestProducts().then(setProducts);
    // theLatestProducts();
  }, []);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Feature Products</th>
            <th>
              <Link passHref href="/products">
                <Button variant="success">See All Products</Button>
              </Link>
            </th>
            {/* <th colSpan={8}>Last Name</th>
            <th>Username</th> */}
          </tr>
        </thead>
        <tbody>
          {
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>
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
