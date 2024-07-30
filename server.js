const express = require('express');
const path = require('path');

//const api = require('./routes/index.js');

const PORT = process.env.port || 3001;

const app = express();

// Middleware to serve static files
app.use(express.static('public'));

// Route to serve notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});