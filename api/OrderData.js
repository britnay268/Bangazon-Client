import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET all Orders
const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders`, {
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

// GET Order Details
const getOrderById = (orderId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/order/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

// Create an Order
const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Add Product to an Order
const addProductToOrder = (productId, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/order/add/${productId}?userId=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        resolve(true);
      } else {
        reject(new Error(`Failed to add product: ${response.statusText}`));
      }
    })
    .catch(reject);
});

// Update the Order with OrderNum, DatePlaced, PaymentTypeId, and Completion
const updateOrder = (orderId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/order/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

// Remove Product from an Order
const deleteProductToOrder = (orderId, productId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orddr/${orderId}/product/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.text())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

export {
  getOrders, getOrderById, createOrder, addProductToOrder, updateOrder, deleteProductToOrder,
};
