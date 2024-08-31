import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import getPaymentTypes from '../../api/PaymentTypeData';

export default function CheckoutForm({ obj }) {
  const [formInput, setFormInput] = useState({ ...obj });
  const [paymentTypes, setPaymentTypes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getPaymentTypes().then(setPaymentTypes);
  }, []);

  return (
    <>
      <Form>
        <h2 className="text-white mt-5">Checkout</h2>

        <FloatingLabel controlId="floatingInput1" label="Payment Type" className="mb-3">
          <Form.Select
            aria-label="Payment Type"
            name="paymentTypeId"
            className="mb-3"
            value={formInput.paymentTypeId}
            onChange={handleChange}
            required
          >
            <option value="">Select a payment type</option>
            {
              paymentTypes.map((p) => (
                <option
                  key={p.id}
                  value={p.id}
                >
                  {p.type}
                </option>
              ))
            }
          </Form.Select>
        </FloatingLabel>

        <div>
          <Button>Place Order</Button>
        </div>
      </Form>
    </>
  );
}

CheckoutForm.propTypes = {
  obj: PropTypes.shape({
    paymentTypeId: PropTypes.number,
  }).isRequired,
};
