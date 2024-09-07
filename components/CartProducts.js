/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillDelete } from 'react-icons/ai';
import { BiDetail } from 'react-icons/bi';

export default function CartProducts({ productObj, deleteProduct }) {
  const router = useRouter();

  const handleDeleteFromCart = () => {
    deleteProduct(productObj.id);
  };

  return (
    <div>
      <Card className="checkout-card">
        <Card.Img variant="top" src={productObj.imageUrl} />
        <Card.Body>
          <div className="productDetails">
            <div>
              <Card.Title>{productObj.name}</Card.Title>
              <Link passHref href={`/sellerspage/${productObj.user.id}`}>
                <Nav.Link variant="link" style={{ color: 'black', marginBottom: '50px' }}>{productObj?.user?.username}</Nav.Link>
              </Link>
            </div>
            <div>
              <Card.Text className="price">Price: ${productObj.price}</Card.Text>
              <Card.Text className={productObj.quantity > 0 ? 'inStock' : 'outOfStock'}>{productObj.quantity > 0 ? 'In Stock' : 'Out of Stock'}</Card.Text>
            </div>
          </div>
          {router.asPath.includes('checkout')
            ? (
              <Link passHref href={`/products/${productObj.id}`}>
                <Button variant="link" className="element detailsBtn"><BiDetail /></Button>
              </Link>
            )
            : (
              <div className="btnAlign">
                <Link passHref href={`/products/${productObj.id}`}>
                  <Button variant="link" className="element detailsBtn"><BiDetail /></Button>
                </Link>
                <Button variant="link" style={{ color: 'red' }} onClick={handleDeleteFromCart}><AiFillDelete />
                </Button>
              </div>
            )}
        </Card.Body>
      </Card>
    </div>
  );
}

CartProducts.propTypes = {
  productObj: PropTypes.shape({
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
  }).isRequired,
  deleteProduct: PropTypes.func,
};

CartProducts.defaultProps = {
  deleteProduct: () => {},
};
