// routes/books.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticate = require('../middleware/auth');

// ➕ Add book
router.post('/', authenticate, (req, res) => {
  const { title, author, genre, year } = req.body;
  db.query('INSERT INTO books SET ?', { title, author, genre, year }, (err) => {
    if (err) return res.status(500).send(err);
    res.send('Book added!');
  });
});

// 🔁 Update book
router.put('/:id', authenticate, (req, res) => {
  const { title, author, genre, year } = req.body;
  db.query(
    'UPDATE books SET ? WHERE id = ?',
    [{ title, author, genre, year }, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send('Book updated!');
    }
  );
});

// ❌ Delete book
router.delete('/:id', authenticate, (req, res) => {
  db.query('DELETE FROM books WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Book deleted!');
  });
});

// 📄 Get all books (filter + pagination)
router.get('/', (req, res) => {
  const { genre, author, page = 1, limit = 5 } = req.query;
  let query = 'SELECT * FROM books WHERE 1';
  const params = [];

  if (genre) {
    query += ' AND genre = ?';
    params.push(genre);
  }
  if (author) {
    query += ' AND author = ?';
    params.push(author);
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(Number(limit), (Number(page) - 1) * Number(limit));

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
