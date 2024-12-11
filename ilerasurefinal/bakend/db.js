const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./healthcare.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Créer les tables si elles n'existent pas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      role TEXT DEFAULT 'user' NOT NULL,
      hashed_password TEXT NOT NULL
    )
  `);
});

module.exports = db;
