import React, { useEffect, useState } from 'react';
import CheckoutForm from '../../../components/forms/CheckoutForm';
import { getUsersOrders } from '../../../api/UserData';
import { useAuth } from '../../../utils/context/authContext';
import CartProducts from '../../../components/CartProducts';

export default function Checkout() {
  const [cart, setCart] = useState({});

  const { user } = useAuth();
  const userId = user.user.id;

  useEffect(() => {
    getUsersOrders(userId).then(setCart);
  }, [userId]);

  return (
    <div>
      <CheckoutForm obj={cart} />
      {cart.products?.map((product) => (
        <CartProducts key={product.id} productObj={product} />
      ))}
    </div>
  );
}
