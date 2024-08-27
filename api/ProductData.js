import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Get all products
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

// GET Product details
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

// Search Product
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

// GET the 20 latest products meaning last prooduct entered to the first product that makes the 20th product
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
