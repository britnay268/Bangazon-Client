import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

export default function ProductCard({ productObj }) {
  return (
    <div>
      <Card style={{ width: '55rem', display: 'grid', gridTemplateColumns: '200px auto' }}>
        <Card.Img variant="top" src={productObj.imageUrl} />
        <Card.Body>
          <Card.Title>{productObj.name}</Card.Title>
          <Card.Text>{productObj.user.username}</Card.Text>
          <Card.Text>{productObj.description}</Card.Text>
          <Card.Text>Price: ${productObj.price}</Card.Text>
          <Card.Text>{productObj.quantity > 0 ? 'In Stock' : 'Out of Stock'}</Card.Text>
          <Link passHref href={`/products/${productObj.id}`}>
            <Button variant="link">Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    quantity: PropTypes.number,
    imageUrl: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      seller: PropTypes.bool,
    }),
  }).isRequired,
};
