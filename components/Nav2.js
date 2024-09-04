import Link from 'next/link';
import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export default function Nav2() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container style={{
        display: 'flex', justifyContent: 'center',
      }}
      >
        <Link passHref href="/">
          <Navbar.Brand className="appName">Bangazon</Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}
