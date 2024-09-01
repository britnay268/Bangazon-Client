import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSellersProducts } from '../../api/UserData';
import ProductCard from '../../components/ProductCard';

export default function SellersPage() {
  const [sellersProducts, setSellersProducts] = useState([]);

  const router = useRouter();
  const { sellerId } = router.query;

  useEffect(() => {
    getSellersProducts(sellerId).then(setSellersProducts);
  }, [sellerId]);

  // console.warn(sellersProducts);
  return (
    <div>
      {(sellersProducts.length === 0) ? <h1>You have no Products</h1> : sellersProducts.map((product) => (
        <ProductCard key={product.id} productObj={product} />
      ))}
    </div>
  );
}
