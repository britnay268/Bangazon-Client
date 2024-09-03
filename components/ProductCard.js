/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { BiDetail } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useAuth } from '../utils/context/authContext';

export default function ProductCard({ productObj, addProduct, deleteProduct }) {
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

  const handleDeleteFromCart = () => {
    deleteProduct(productObj.id);
  };

  return (
    <div>
      <Card className="product-card">
        <Card.Img src={productObj.imageUrl} />
        <Card.Body>
          <div className="productInfo">
            <div className="productDetails">
              <Card.Title>{productObj.name}</Card.Title>
              <Link passHref href={`/sellerspage/${productObj?.user?.id}`}>
                <Nav.Link variant="link" style={{ marginBottom: '15px' }}>{productObj?.user?.username}</Nav.Link>
              </Link>
              <Card.Text className="price">${productObj.price}</Card.Text>
              <Card.Text className={productObj.quantity > 0 ? 'inStock' : 'outOfStock'}>{productObj.quantity > 0 ? 'In Stock' : 'Out of Stock'}</Card.Text>
            </div>
            <div className="productButtons">
              {router.asPath.startsWith('/cart')
                ? (
                  <div className="btnAlign">
                    <Button variant="link" style={{ color: 'red' }} onClick={handleDeleteFromCart}><AiFillDelete />
                    </Button>
                  </div>
                )
                : (
                  <div className="btnAlign">
                    <Link passHref href={`/products/${productObj.id}`}>
                      <Button className="btnAlign" variant="link"><BiDetail />
                      </Button>
                    </Link>
                    <Button variant="link" style={{ color: 'rgb(20, 205, 20)' }} onClick={handleAddToCart}>
                      <TbShoppingCartPlus />
                    </Button>
                    {isAddedToCart && <span>Product added to cart.</span>}
                  </div>
                )}
            </div>
          </div>
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
      id: PropTypes.number,
      name: PropTypes.string,
      username: PropTypes.string,
      seller: PropTypes.bool,
    }),
  }).isRequired,
  addProduct: PropTypes.func,
  deleteProduct: PropTypes.func,
};

ProductCard.defaultProps = {
  addProduct: () => {},
  deleteProduct: () => {},
};
