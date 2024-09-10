import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getUsersOrders } from '../api/UserData';

export default function AddedToCartModal({ onClose }) {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  const handleClose = () => {
    onClose();
    router.push('/products');
  };

  const { user } = useAuth();
  const userId = user?.user?.id;

  useEffect(() => {
    getUsersOrders(userId).then(setCart);
  }, [userId]);

  return (
    <div
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show onHide={onClose}>
        <Modal.Body>
          <p><strong>Added To Cart!</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Link passHref href={`/cart/${cart.id}`}>
            <Button variant="primary">Proceed To Checkout</Button>
          </Link>
          <Button variant="primary" onClick={handleClose}>Continue Shopping</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

AddedToCartModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
