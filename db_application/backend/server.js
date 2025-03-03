const sqlite3 = require("sqlite3").verbose();

// Connect to the SQLite database
let db = new sqlite3.Database("./mydatabase.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

// Create a new table
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
)`,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  },
);

// Insert a new record
const insertUser = (name, email) => {
  const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
  db.run(sql, [name, email], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`A new user has been added with ID: ${this.lastID}`);
  });
};

// Example usage
insertUser("John Doe", "john.doe@example.com");

// Close the database connection
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Closed the database connection.");
});
