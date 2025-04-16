const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();
const uploadDir = 'uploads';

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// ✅ Upload a file
router.post('/upload', authenticateToken, upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

// ✅ Get list of uploaded files
router.get('/', authenticateToken, (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).send('Error reading files');
    res.json(files);
  });
});

// ✅ Download a specific file
router.get('/download/:filename', authenticateToken, (req, res) => {
  const filepath = path.join(__dirname, '..', uploadDir, req.params.filename);
  res.download(filepath);
});

// ✅ Delete a specific file
router.delete('/:filename', authenticateToken, (req, res) => {
  const filepath = path.join(__dirname, '..', uploadDir, req.params.filename);
  fs.unlink(filepath, err => {
    if (err) return res.status(404).send('File not found');
    res.send('File deleted');
  });
});

module.exports = router;
