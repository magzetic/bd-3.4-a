const express = require('express');
const cors = require('cors');
const app = express();
// Sample data
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// 1 Function for adding an item to the cart
function addItemToCart(productId, name, price, quantity) {
  cart.push({ productId, name, price, quantity });
}

// 1 Endpoint for adding an item to the cart
app.get('/cart/add', (req, res) => {
  const productId = parseInt(req.query.productId);
  const name = req.query.name;
  const price = parseFloat(req.query.price);
  const quantity = parseInt(req.query.quantity);

  addItemToCart(productId, name, price, quantity);
  res.json({ cartItems: cart });
});

// 2 Function for editing the quantity of an item in the cart
function editItemQuantity(productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      break;
    }
  }
}

// 2 Endpoint for editing the quantity of an item in the cart
app.get('/cart/edit', (req, res) => {
  const productId = parseInt(req.query.productId);
  const quantity = parseInt(req.query.quantity);

  editItemQuantity(productId, quantity);
  res.json({ cartItems: cart });
});

// 3 Function for deleting an item from the cart
function deleteItemFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
}

// 3 Endpoint for deleting an item from the cart
app.get('/cart/delete', (req, res) => {
  const productId = parseInt(req.query.productId);

  deleteItemFromCart(productId);
  res.json({ cartItems: cart });
});

// 4 Function for reading items in the cart
function getItemsInCart() {
  return cart;
}

// 4 Endpoint for reading items in the cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: getItemsInCart() });
});

// 5 Function for calculating total quantity of items in the cart
function calculateTotalQuantity() {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}

// 5 Endpoint for calculating total quantity of items in the cart
app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = calculateTotalQuantity();
  res.json({ totalQuantity });
});

// 6 Function for calculating total price of items in the cart
function calculateTotalPrice() {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

// 6 Endpoint for calculating total price of items in the cart
app.get('/cart/total-price', (req, res) => {
  const totalPrice = calculateTotalPrice();
  res.json({ totalPrice });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
