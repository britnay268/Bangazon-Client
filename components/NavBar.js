/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { getUsersOrders } from '../api/UserData';
import { useAuth } from '../utils/context/authContext';
import SearchBar from './forms/SearchBar';

export default function NavBar() {
  const [cart, setCart] = useState([]);

  const { user } = useAuth();
  const userId = user?.user?.id;

  useEffect(() => {
    getUsersOrders(userId).then(setCart);
  }, [userId]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      data-bs-theme="light"
      style={{
        display: 'flex', flexDirection: 'column', padding: '0px', margin: '0px',
      }}
    >
      <Container style={{ margin: '0px', padding: '0px' }}>
        <Link passHref href="/">
          <Navbar.Brand className="appName">Bangazon</Navbar.Brand>
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
            <Link passHref href="/orders">
              <Nav.Link>Orders</Nav.Link>
            </Link>
            <SearchBar />
          </Nav>
          <div className="d-flex">
            <Link passHref href="/profile">
              <Nav.Link>@{user?.user?.username}</Nav.Link>
            </Link>
            <div className="ms-4 cart">
              <Link passHref href={`/cart/${cart.id}`}>
                <Nav.Link><FaShoppingCart />
                </Nav.Link>
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
