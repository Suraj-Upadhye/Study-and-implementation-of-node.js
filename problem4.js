const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'suraj',
  database: 'library_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});



// CREATE
connection.query(
    'INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)',
    ['1984', 'George Orwell', 'Dystopian', '1949-4-15'],
    (err, results) => {
      if (err) throw err;
      console.log('Book inserted!');
    }
  );
  
  // READ
  connection.query('SELECT * FROM books', (err, results) => {
    if (err) throw err;
    console.log(results);
  });
  
  // UPDATE
  connection.query(
    'UPDATE books SET author = ? WHERE title = ?',
    ['Orwell', '1984'],
    (err, results) => {
      if (err) throw err;
      console.log('Book updated!');
    }
  );
  
  // DELETE
  connection.query('DELETE FROM books WHERE title = ?', ['1984'], (err, results) => {
    if (err) throw err;
    console.log('Book deleted!');
  });
  
