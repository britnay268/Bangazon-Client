import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET User's Orders
const getUsersOrders = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/user/${userId}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCompletedOrders = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/user/${userId}/orders/completed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET User details
const getUserById = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET Seller's Products
const getSellersProducts = (sellerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/sellers/${sellerId}/products`, {
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
  getUsersOrders, getUserById, getSellersProducts, getCompletedOrders,
};
