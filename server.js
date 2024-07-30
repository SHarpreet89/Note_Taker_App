const express = require('express');
const path = require('path');
const notesDB = require('./db/db.json')

const PORT = process.env.port || 3001;

const app = express();

// Middleware to serve static files
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Route to send the index.html


// Route to serve notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// //Route t send the Notes Data when requested
app.get('/api/notes', (req, res) => {
  res.json(notesDB)
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});