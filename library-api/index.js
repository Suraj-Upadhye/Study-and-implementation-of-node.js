// index.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const booksRoutes = require('./routes/books');
const app = express();
const PORT = 3000;

const SECRET = 'secretkey';

app.use(bodyParser.json());

// 🔐 Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Dummy check
  if (username === 'admin' && password === '123') {
    const token = jwt.sign({ username }, SECRET);
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// 📚 Book Routes
app.use('/books', booksRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

