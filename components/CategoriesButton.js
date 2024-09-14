import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getCategories } from '../api/CategoryData';

export default function CategoriesButton({ filterBy, filterAll }) {
  const [categories, setCategories] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // So I want to show the category name without call an api to get all categories so I passed the category name as a prop with the id that is needed for the api
  const handleCategoryClick = (category) => {
    filterBy(category.id, category.name); // Pass both category ID and name
  };

  return (
    <div className="category-buttons">
      {router.asPath === '/products'
        ? <Button onClick={() => filterAll()}>All</Button>
        : ''}

      {
        categories.map((category) => (
          <Button key={category.id} onClick={() => handleCategoryClick(category)}>{category.name}</Button>
        ))
      }
    </div>
  );
}

CategoriesButton.propTypes = {
  filterBy: PropTypes.func.isRequired,
  filterAll: PropTypes.func,
};

CategoriesButton.defaultProps = {
  filterAll: () => {},
};
