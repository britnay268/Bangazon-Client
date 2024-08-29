/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getProductById } from '../../api/ProductData';

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState([]);

  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    getProductById(productId).then(setProductDetails);
  }, [productId]);

  return (
    <>
      <img src={productDetails.imageUrl} alt={productDetails.name} style={{ width: '300px' }} />
      <h2>{productDetails.name}</h2>
      <div>
        <h6>Seller: </h6>
        <Link href={`/sellerspage/${productDetails.user?.id}`} passHref>
          <Button variant="link">{productDetails.user?.username}</Button>
        </Link>
      </div>
      <p>Category: {productDetails.category?.name}</p>
      <p>{productDetails.description}</p>
      <p>{productDetails.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
      <p>Price Per Unit: {productDetails.price}</p>
    </>
  );
}
