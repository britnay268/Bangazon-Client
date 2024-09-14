import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getCategories } from '../api/CategoryData';

export default function CategoriesButton({ filterBy, filterAll }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div className="category-buttons">
      <Button onClick={() => filterAll()}>All</Button>
      {
        categories.map((category) => (
          <Button key={category.id} onClick={() => filterBy(category.id)}>{category.name}</Button>
        ))
      }
    </div>
  );
}

CategoriesButton.propTypes = {
  filterBy: PropTypes.func.isRequired,
  filterAll: PropTypes.func.isRequired,
};
