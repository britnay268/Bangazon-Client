/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { searchProducts } from '../../api/ProductData';
import ProductCard from '../../components/ProductCard';
import { addProductToOrder } from '../../api/OrderData';

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter();
  const { searchInput } = router.query;

  const getSearchResults = async () => {
    const results = await searchProducts(searchInput);
    setSearchResults(results);
  };

  useEffect(() => {
    getSearchResults();
  }, [searchInput]);

  return (
    <div>
      {
        searchResults?.length === 0
          ? (<h1 style={{ color: 'firebrick', textAlign: 'center' }}>No results are found for {searchInput}</h1>)
          : searchResults.map((results) => (
            <ProductCard key={results.id} productObj={results} addProduct={addProductToOrder} />
          ))
      }
    </div>
  );
}
