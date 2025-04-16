// db.js
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: 'library_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL DB!');
});

module.exports = db;
