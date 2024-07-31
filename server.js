const express = require('express');
const path = require('path');
const notesDB = require('./db/db.json')
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

const uuid = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

// Middleware to serve static files
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Route to send the index.html


// Route to serve notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Route to send the Notes Data when requested
app.get('/api/notes', (req, res) => {
  res.json(notesDB)
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid(); // Generate and assign a unique ID to the new note
  notesDB.push(newNote);

  fs.writeFile('./db/db.json', JSON.stringify(notesDB, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save the note' });
    }
    res.json(notesDB);
  });
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  const noteIndex = notesDB.findIndex(note => note.id === noteId);

  if (noteIndex !== -1) {
    notesDB.splice(noteIndex, 1);

    fs.writeFile('./db/db.json', JSON.stringify(notesDB, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete the note' });
      }
      res.json({ message: 'Note deleted successfully' });
    });
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// Route to capture all invalid paths and revert to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});