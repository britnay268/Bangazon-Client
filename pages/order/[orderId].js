/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getOrderById } from '../../api/OrderData';
import OrderCards from '../../components/OrderCards';

export default function OrderDetails() {
  const [order, setOrder] = useState([]);

  const router = useRouter();

  const { orderId } = router.query;

  const theOrderDetails = () => {
    getOrderById(orderId).then(setOrder);
  };

  useEffect(() => {
    theOrderDetails();
  }, []);

  return (
    <div>
      <h2 style={{ marginTop: '25px' }}>Most Recent Orders</h2>
      <div>
        {order.length === 0
          ? <h1>You have no Completed Orders</h1>
          : <OrderCards key={order.id} orderObj={order} />}
      </div>
    </div>
  );
}
