import React from 'react';
// import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function ProductCard() {
  return (
    <div>
      <Card style={{ width: '55rem', display: 'grid', gridTemplateColumns: '200px auto' }}>
        <Card.Img variant="top" src="https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600nw-2227567913.jpg" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up
            the
            bulk of the cards content.
          </Card.Text>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>

        </Card.Body>
      </Card>
    </div>
  );
}

// ProductCard.propTypes = {
//   productObj: PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     price: PropTypes.number,
//     description: PropTypes.string,
//     quantity: PropTypes.number,
//     imageUrl: PropTypes.string,
//     user: PropTypes.shape({
//       name: PropTypes.string,
//       username: PropTypes.string,
//       seller: PropTypes.bool,
//     }),
//     categories: PropTypes.shape({
//       name: PropTypes.string,
//     }),
//   }).isRequired,
// };
