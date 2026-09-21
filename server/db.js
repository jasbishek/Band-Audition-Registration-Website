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
  // Main Registrations Table
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

  // Dedicated Sequence Counter Table to ensure atomic sequential IDs
  db.run(`
    CREATE TABLE IF NOT EXISTS registration_sequence (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      next_seq INTEGER NOT NULL DEFAULT 1
    )
  `);

  db.run(`INSERT OR IGNORE INTO registration_sequence (id, next_seq) VALUES (1, 1)`);

  // Check and migrate any existing records to ensure consistent BU-A2026-XX IDs
  db.all(`SELECT id, registration_id FROM registrations ORDER BY id ASC`, [], (err, rows) => {
    if (err || !rows || rows.length === 0) return;

    let maxSeq = 0;
    rows.forEach((row, index) => {
      const match = row.registration_id && row.registration_id.match(/^BU-A2026-(\d+)$/);
      let seqNum;
      if (match) {
        seqNum = parseInt(match[1], 10);
      } else {
        seqNum = index + 1;
        const paddedSeq = seqNum < 10 ? `0${seqNum}` : `${seqNum}`;
        const newRegId = `BU-A2026-${paddedSeq}`;
        db.run(`UPDATE registrations SET registration_id = ? WHERE id = ?`, [newRegId, row.id]);
      }
      if (seqNum > maxSeq) maxSeq = seqNum;
    });

    const nextVal = maxSeq + 1;
    db.run(`UPDATE registration_sequence SET next_seq = MAX(next_seq, ?) WHERE id = 1`, [nextVal]);
  });
});

export default db;
