const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // Serve static files

// Connect to the SQLite database
let db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create new table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    duration INTEGER NOT NULL
)`);

// Add new song
app.post('/songs', (req, res) => {
    const { title, artist, duration } = req.body;
    const sql = `INSERT INTO songs (title, artist, duration) VALUES (?, ?, ?)`;
    db.run(sql, [title, artist, duration], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, title, artist, duration});
    });
});

// Get all songs
app.get('/songs', (req, res) => {
    const sql = `SELECT * FROM songs`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Update a song by ID
app.put('/songs/:id', (req, res) => {
    const { id } = req.params;
    const { title, artist, duration } = req.body;
    const sql = `UPDATE songs SET title = ?, artist = ?, duration = ? WHERE id = ?`;
    db.run(sql, [title, artist, duration, id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({id, title, artist, duration});
    });
});

// Delete a song by ID
app.delete('/songs/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM songs WHERE id = ?`;
    db.run(sql, id, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: `Song with ID: ${id} has been deleted.` });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Close the database connection when the server is closed
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});

