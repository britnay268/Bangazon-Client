import React, { useEffect, useState } from 'react';
import { getCompletedOrders } from '../api/UserData';
import { useAuth } from '../utils/context/authContext';
import OrderCards from '../components/OrderCards';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  const { user } = useAuth();

  const userId = user.user.id;

  const completedOrders = () => {
    getCompletedOrders(userId).then(setOrders);
  };

  useEffect(() => {
    completedOrders();
  }, []);

  return (
    <div>
      <h2 style={{ marginTop: '25px' }}>Completed Orders</h2>
      <div>
        {orders.length === 0
          ? <h1>You have no Completed Orders</h1>
          : orders.map((order) => (
            <OrderCards key={order.id} orderObj={order} />
          ))}
      </div>
    </div>
  );
}
