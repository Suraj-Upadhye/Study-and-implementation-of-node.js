const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fileRoutes = require('./routes/fileRoutes');
const users = require('./users');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username: user.username }, 'secretkey', { expiresIn: '1h' });
  res.json({ token });
});

app.use('/files', fileRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
