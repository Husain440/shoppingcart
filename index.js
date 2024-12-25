const express = require('express');
const cors = require('cors');

const app = express();
const port = 3010;
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

const addToCart = (product) => {
  cart.push(product);
  return cart;
};
app.get('/cart/add', (req, res) => {
  const productId = parseInt(req.query.productId);
  const price = parseInt(req.query.price);
  const quantity = parseInt(req.query.quantity);
  const name = req.query.name;
  const product = { productId, name, price, quantity };

  const result = addToCart(product);
  res.json({ cartItems: result });
});

app.get('/cart/edit', (req, res) => {
  const productId = parseInt(req.query.productId);
  const quantity = parseInt(req.query.quantity);
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  res.json({ cartItems: cart });
});

const removeItem = (productId) => {
  const response = cart.filter((product) => {
    return product.productId != productId;
  });
  return response;
};
app.get('/cart/delete', (req, res) => {
  const productId = parseInt(req.query.productId);
  const result = removeItem(productId);
  res.json({ cartItem: result });
});

const cartDetails = () => cart;
app.get('/cart', (req, res) => {
  const result = cartDetails();
  res.json({ cartItems: result });
});

const totalQuantity = () => {
  let result = 0;
  for (let i = 0; i < cart.length; i++) {
    result = result + cart[i].quantity;
  }
  return result;
};
app.get('/cart/total-quantity', (req, res) => {
  const result = totalQuantity();
  res.json({ totalQuantity: result });
});

const totalPrice = () => {
  let result = 0;
  for (let i = 0; i < cart.length; i++) {
    result = result + cart[i].price;
  }
  return result;
};
app.get('/cart/total-price', (req, res) => {
  const result = totalPrice();
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
