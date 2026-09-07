import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultDataDir = path.join(__dirname, '../data');
const dbPath = process.env.DATABASE_PATH || path.join(defaultDataDir, 'auditions.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Initialize Tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registration_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      dob TEXT NOT NULL,
      phone TEXT NOT NULL,
      category TEXT NOT NULL,
      instrument TEXT DEFAULT '—',
      experience TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      created_date TEXT NOT NULL
    )
  `);
});

export default db;
