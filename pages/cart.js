/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getUsersOrders } from '../api/UserData';
import ProductCard from '../components/ProductCard';

export default function Cart() {
  const [cart, setCart] = useState([]);

  const { user } = useAuth();
  const userId = user.user.id;

  const usersCart = async () => {
    await getUsersOrders(userId).then(setCart);
  };

  useEffect(() => {
    usersCart();
  }, []);

  return (
    <div>
      {/* Loop through each order in cart */}
      {cart.products?.map((product) => (
        <ProductCard key={product.id} productObj={product} />
      ))}
    </div>
  );
}
