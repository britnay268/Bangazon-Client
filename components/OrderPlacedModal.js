import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function OrderPlacedModal({ onClose }) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.push('/');
  };

  const { cartId } = router.query;

  return (
    <div
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show onHide={onClose}>
        <Modal.Body>
          <p>Your order has been placed!</p>
          <Link passHref href={`/order/${cartId}`}>
            <Button variant="link">View Order Details</Button>
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

OrderPlacedModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
