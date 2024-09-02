/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import { getUsersOrders } from '../api/UserData';
import { useAuth } from '../utils/context/authContext';
import SearchBar from './forms/SearchBar';

export default function NavBar() {
  const [cart, setCart] = useState([]);

  const { user } = useAuth();
  const userId = user.user.id;

  useEffect(() => {
    getUsersOrders(userId).then(setCart);
  }, [userId]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Bangazon</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto dflex">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/products">
              <Nav.Link>Products</Nav.Link>
            </Link>
            <SearchBar />
          </Nav>
          <div className="d-flex">
            <Link passHref href="/profile">
              <Nav.Link style={{ color: 'white' }}>Profile</Nav.Link>
            </Link>
            <div className="ms-4">
              <Link passHref href={`/cart/${cart.id}`}>
                <Nav.Link style={{ color: 'white' }}>Cart</Nav.Link>
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
