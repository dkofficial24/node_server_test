// Import the express module
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define a port number
const PORT = 3002;

// In-memory data storage for products
let products = [];
let nextId = 1; // To generate unique IDs for products

app.get('/', (req, res) => {
res.send('Hello, Server is running');
});

// Create a new product
app.post('/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  const product = { id: nextId++, name, price };
  products.push(product);
  res.status(201).json(product);
});

// Read all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Read a single product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Update a product by ID
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, price } = req.body;
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  if (name) product.name = name;
  if (price) product.price = price;
  res.json(product);
});

// Delete a product by ID
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products.splice(index, 1);
  res.status(204).end(); // No content to return
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
