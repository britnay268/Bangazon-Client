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

  getLatestProducts().then(setProducts);
  // console.warn(products);

  useEffect(() => {
    getLatestProducts().then(setProducts);
    // theLatestProducts();
  }, [products]);

  return (
    <div>
      {/* <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Your Bio: {user.bio}</p>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button> */}
      <Table>
        <thead>
          <tr>
            <th colSpan={8}>#</th>
            {/* <th colSpan={8}>Last Name</th>
            <th>Username</th> */}
          </tr>
        </thead>
        <tbody>
          {
            products.map((p) => (
              <tr>
                <td>{p.name}</td>
                {/* <td colSpan={8}>Mark</td>
                <td>@mdo</td> */}
                <td>
                  <Link passHref href={`/products/${p.Id}`}>
                    <Button variant="link">Link</Button>
                  </Link>
                </td>
              </tr>
            ))
          }
          {/* <tr>
            <td>1</td>
            <td colSpan={8}>Mark</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td colSpan={8}>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={8}>Larry the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
