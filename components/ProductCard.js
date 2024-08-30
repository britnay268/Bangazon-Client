import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';

export default function ProductCard({ productObj, addProduct }) {
  const router = useRouter();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { user } = useAuth();
  const userId = user.user.id;

  const handleAddToCart = () => {
    // The addProduct is passing the parameters to the api in the addProduct function when the ProductCard component is being used.
    addProduct(productObj.id, userId).then(() => {
      setIsAddedToCart(true);
    }); // Use the passed productId
  };

  return (
    <div>
      <Card style={{ width: '55rem', display: 'grid', gridTemplateColumns: '200px auto' }}>
        <Card.Img variant="top" src={productObj.imageUrl} />
        <Card.Body>
          <Card.Title>{productObj.name}</Card.Title>
          <Card.Text>{productObj?.user?.username}</Card.Text>
          <Card.Text>{productObj.description}</Card.Text>
          <Card.Text>Price: ${productObj.price}</Card.Text>
          <Card.Text>{productObj.quantity > 0 ? 'In Stock' : 'Out of Stock'}</Card.Text>
          <Link passHref href={`/products/${productObj.id}`}>
            <Button variant="link">Details</Button>
          </Link>
          {router.asPath !== '/cart'
            ? (
              <><Button onClick={handleAddToCart}>Add to Cart</Button>
                {isAddedToCart && <span>Product added to cart.</span>}
              </>
            )
            : <Button>Delete</Button>}
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
  addProduct: PropTypes.func,
};

ProductCard.defaultProps = {
  addProduct: () => {},
};
