import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import getPaymentTypes from '../../api/PaymentTypeData';
import { updateOrder } from '../../api/OrderData';
import OrderPlacedModal from '../OrderPlacedModal';

export default function CheckoutForm({ obj }) {
  const [formInput, setFormInput] = useState({ ...obj });
  const [paymentTypes, setPaymentTypes] = useState([]);

  // This is to set the state of the modal from being or closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      // In this case i parse the value since I need the value to be an integer verse a string and I only a m dealing with one value in the form
      [name]: parseInt(value, 10),
    }));
  };

  const randomInt = Math.floor(Math.random() * 9000) + 1000;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput, datePlaced: new Date(), completed: true, orderNum: randomInt,
    };
    // console.warn(payload, obj.id);
    updateOrder(obj.id, payload).then(() => {
      setIsModalOpen(true);
    });
  };

  useEffect(() => {
    getPaymentTypes().then(setPaymentTypes);
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ width: '20rem' }}>
        <h2 className="text-white mt-5">Checkout</h2>
        <h5>Total: ${obj.totalPrice}</h5>

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
          <Button type="submit">Place Order</Button>
        </div>
        {
          isModalOpen && <OrderPlacedModal onClose={() => setIsModalOpen(false)} />
        }
      </Form>
    </>
  );
}

CheckoutForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    paymentTypeId: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
};
