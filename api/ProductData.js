import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getProductById = (productId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const searchProducts = (searchInput) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/product/search?searchInput=${searchInput}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchInput),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getLatestProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/latest`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getProducts, getProductById, searchProducts, getLatestProducts,
};
