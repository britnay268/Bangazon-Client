import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export default function OrderPlacedModal({ onClose }) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.push('/');
  };

  return (
    <div
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show onHide={onClose}>
        <Modal.Body>
          <p>Your order has been placed!</p>
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
