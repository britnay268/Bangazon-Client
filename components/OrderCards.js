/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  Button, Card, ListGroup, Nav,
} from 'react-bootstrap';
import Link from 'next/link';
import { BiDetail } from 'react-icons/bi';
// import Link from 'next/link';
// import { Button } from 'bootstrap';
// import { BiDetail } from 'react-icons/bi';

export default function OrderCards({ orderObj }) {
  return (
    <>
      <ListGroup style={{ marginBottom: '20px' }}>
        <ListGroup.Item>
          <div><strong>Order Number:</strong> {orderObj.orderNum}</div>
          <div><strong>Order Date:</strong> {orderObj.datePlaced.split('T')[0]}</div>
        </ListGroup.Item>

        {orderObj.products.map((product) => (
          <ListGroup.Item key={product.id}>
            <Card className="checkout-card">
              <Card.Img variant="top" src={product.imageUrl} />
              <Card.Body>
                <div className="productDetails">
                  <div>
                    <Card.Title>{product.name}</Card.Title>
                    <Link passHref href={`/sellerspage/${product.user.id}`}>
                      <Nav.Link variant="link" style={{ color: 'black', marginBottom: '50px' }}>{product?.user?.username}</Nav.Link>
                    </Link>
                  </div>
                  <div>
                    <Card.Text className="price">Price: ${product.price}</Card.Text>
                    <Card.Text className={product.quantity > 0 ? 'inStock' : 'outOfStock'}>{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</Card.Text>
                  </div>
                </div>
                <Link passHref href={`/products/${orderObj.id}`}>
                  <Button variant="link" className="element detailsBtn"><BiDetail /></Button>
                </Link>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}

      </ListGroup>
    </>
  );
}

OrderCards.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    orderNum: PropTypes.number,
    datePlaced: PropTypes.string,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
        quantity: PropTypes.number,
        imageUrl: PropTypes.string,
        user: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          username: PropTypes.string,
          seller: PropTypes.bool,
        }),
      }),
    ).isRequired,
  }).isRequired,
};
