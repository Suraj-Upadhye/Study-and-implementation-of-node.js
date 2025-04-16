// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET = 'secretkey';

function authenticate(req, res, next) {
//   const token = req.headers['authorization'];
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer token"

  if (!token) return res.status(403).send('Token required');

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
}

module.exports = authenticate;
