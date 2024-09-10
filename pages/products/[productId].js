/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Nav } from 'react-bootstrap';
import { getProductById } from '../../api/ProductData';
import { addProductToOrder } from '../../api/OrderData';
import { useAuth } from '../../utils/context/authContext';
import AddedToCartModal from '../../components/AddedToCartModal';

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const router = useRouter();
  const { productId } = router.query;

  const { user } = useAuth();
  const userId = user.user.id;

  useEffect(() => {
    getProductById(productId).then(setProductDetails);
  }, [productId]);

  return (
    <div className="productDetailPage">
      <img src={productDetails.imageUrl} alt={productDetails.name} />
      <div className="productDetailContent">
        <div>
          <h2>{productDetails.name}</h2>
          <Link passHref href={`/sellerspage/${productDetails.user?.id}`}>
            <Nav.Link variant="link"> <strong>Seller:</strong> {productDetails.user?.username}</Nav.Link>
          </Link>
          <p><strong>Found in</strong> {productDetails.category?.name}</p>
          <hr />
          <p>{productDetails.description}</p>
        </div>
        <div>
          <p className={productDetails.quantity > 0 ? 'inStock' : 'outOfStock'} style={{ marginBottom: '0px' }}>{productDetails.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
          <p>Price Per Unit: {productDetails.price}</p>
          {productDetails.quantity <= 0 ? '' : <Button onClick={() => addProductToOrder(productId, userId).then(() => { setIsAddedToCart(true); })}>Add to Cart</Button>}
          {isAddedToCart && <AddedToCartModal onClose={() => setIsAddedToCart(false)} />}
        </div>
      </div>
    </div>
  );
}
