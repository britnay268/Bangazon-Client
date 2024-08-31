import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUsersOrders } from '../../api/UserData';
import ProductCard from '../../components/ProductCard';
import { deleteProductFromOrder } from '../../api/OrderData';

export default function Cart() {
  const [cart, setCart] = useState([]);

  const router = useRouter();
  // console.warn(router);

  const { cartId } = router.query;

  const { user } = useAuth();
  const userId = user.user.id;

  const usersCart = async () => {
    await getUsersOrders(userId).then(setCart);
  };

  const deleteProductFromCart = async (productId) => {
    if (window.confirm('Delete this product?')) {
      await deleteProductFromOrder(cartId, productId);
      // Update the cart state after successful deletion
      // Explanation: Iterates through and see if the product id in the cart is not equal to productId that was removed amd keeps that product and store it in the updatedCart so it can dynamically update the cart after a product is deleted. updatedCart is a new array of products excluding the deleted product.
      const updatedCart = cart.products.filter((p) => p.id !== productId);

      // Calculate the new totalPrice by iterating through the updated products array and summing their prices.
      const newTotalPrice = updatedCart.reduce((total, product) => total + product.price, 0);

      setCart({ ...cart, products: updatedCart, totalPrice: newTotalPrice });
    }
  };

  useEffect(() => {
    usersCart();
  }, []);

  return (
    <div>
      <h5>Subtotal: ${cart.totalPrice}</h5>
      {/* Loop through each order in cart */}
      {cart?.products?.length === 0
        ? <h1>You have no Products</h1>
        : cart.products?.map((product) => (
          <ProductCard key={product.id} productObj={product} deleteProduct={deleteProductFromCart} />
        ))}
    </div>
  );
}
