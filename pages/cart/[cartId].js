/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getUsersOrders } from '../../api/UserData';
import { deleteProductFromOrder } from '../../api/OrderData';
import CartProducts from '../../components/CartProducts';

export default function Cart() {
  const [cart, setCart] = useState([]);

  const router = useRouter();

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
  }, [cart.Id]);

  return (
    <div>
      <h2 style={{ textAlign: 'center', width: '100%', marginTop: '10px' }}>Shopping Cart</h2>
      <div className="shoppingCart">
        <h5>Subtotal: ${cart.totalPrice}</h5>

        {/* If there are no products in the cart, they can't proceed to checkout */}
        {
        cart?.products?.length !== 0
          ? (
            <Link href={`/cart/${cartId}/checkout`} passHref>
              <Button className="checkoutBtn">Proceed to Checkout</Button>
            </Link>
          )
          : ''
      }
      </div>
      <div>
        {/* Loop through each order in cart */}
        {cart?.products?.length === 0
          ? <h1>You have no Products</h1>
          : cart.products?.map((product) => (
            <CartProducts key={product.id} productObj={product} deleteProduct={deleteProductFromCart} />
          ))}
      </div>
    </div>
  );
}
