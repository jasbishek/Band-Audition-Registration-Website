import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Admin Credentials Configuration
// Secure server-side credentials with bcrypt hashing
const ADMIN_USER_ID = process.env.ADMIN_USER_ID || 'jas_abishek';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$Yy0o9sSeGII.nWkuqmF.We6PNVwWsUQ73yZqKqECGqk1U0msAshhW';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'jasri117';
const JWT_SECRET = process.env.JWT_SECRET || 'band_unknown_superhero_secret_key_2026_jas_abishek_secure_jwt';

// In-memory rate limiter for login protection
const loginAttempts = new Map();

app.use(cors());
app.use(express.json());

// Serve static images and public files
const publicDir = path.join(__dirname, '../public');
const distDir = path.join(__dirname, '../dist');

app.use(express.static(publicDir));
app.use('/assets', express.static(publicDir));

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
}

// Helper to generate unique registration ID
function generateRegistrationId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `BU-2026-${randomNum}`;
}

// Authentication Middleware for Protected Admin Routes
function authenticateAdminToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized access. Token missing.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden. Invalid or expired token.' });
    }
    req.admin = user;
    next();
  });
}

// ----------------------------------------------------
// PUBLIC API ENDPOINTS
// ----------------------------------------------------

// 1. Submit Registration
app.post('/api/register', (req, res) => {
  try {
    const { name, department, dob, phone, category, instrument, experience } = req.body;

    if (!name || !department || !dob || !phone || !category || !experience) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    // Phone validation (numeric, min 8 digits)
    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      return res.status(400).json({ error: 'Please enter a valid WhatsApp / Mobile number.' });
    }

    const regId = generateRegistrationId();
    const now = new Date();
    const timestamp = now.toISOString();
    const created_date = now.toISOString().split('T')[0];
    const finalInstrument = category === 'Singing' ? '—' : (instrument || 'Other');

    const sql = `
      INSERT INTO registrations (registration_id, name, department, dob, phone, category, instrument, experience, timestamp, created_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [regId, name.trim(), department.trim(), dob, phone.trim(), category, finalInstrument, experience.trim(), timestamp, created_date], function (err) {
      if (err) {
        console.error('Database insert error:', err);
        return res.status(500).json({ error: 'Failed to submit registration. Please try again.' });
      }

      return res.status(201).json({
        success: true,
        message: 'Registration successful!',
        registration_id: regId,
        student: {
          registration_id: regId,
          name,
          category,
          instrument: finalInstrument
        }
      });
    });
  } catch (error) {
    console.error('Registration processing error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ----------------------------------------------------
// ADMIN AUTHENTICATION ENDPOINTS
// ----------------------------------------------------

// 2. Admin Login
app.post('/api/admin/login', (req, res) => {
  const { adminId, password } = req.body;
  const ip = req.ip || req.socket.remoteAddress;

  // Rate Limiting Check
  const attempts = loginAttempts.get(ip) || { count: 0, lockoutUntil: 0 };
  if (Date.now() < attempts.lockoutUntil) {
    const remainingSec = Math.ceil((attempts.lockoutUntil - Date.now()) / 1000);
    return res.status(429).json({ error: `Too many failed attempts. Locked out for ${remainingSec}s.` });
  }

  // Validate credentials securely on server side
  const isUserValid = typeof adminId === 'string' && adminId === ADMIN_USER_ID;
  const isPassValid = typeof password === 'string' && (
    (ADMIN_PASSWORD_HASH && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) ||
    password === ADMIN_PASSWORD
  );

  if (!isUserValid || !isPassValid) {
    attempts.count += 1;
    if (attempts.count >= 5) {
      attempts.lockoutUntil = Date.now() + 5 * 60 * 1000; // 5 minute lockout
      attempts.count = 0;
    }
    loginAttempts.set(ip, attempts);
    // Generic response message for security (no credential disclosure)
    return res.status(401).json({ error: 'Invalid User ID or Password.' });
  }

  // Reset attempts on successful login
  loginAttempts.delete(ip);

  // Generate JWT Token (valid for 8 hours)
  const token = jwt.sign({ adminId: ADMIN_USER_ID, role: 'administrator' }, JWT_SECRET, { expiresIn: '8h' });

  return res.json({
    success: true,
    message: 'Authentication successful',
    token,
    admin: { adminId: ADMIN_USER_ID }
  });
});

// 3. Verify Admin Token
app.get('/api/admin/verify', authenticateAdminToken, (req, res) => {
  return res.json({ authenticated: true, adminId: req.admin.adminId });
});

// ----------------------------------------------------
// PROTECTED ADMIN DASHBOARD ENDPOINTS
// ----------------------------------------------------

// 4. Get Dashboard Registrations + Statistics
app.get('/api/admin/registrations', authenticateAdminToken, (req, res) => {
  const { search, category, instrument, department, date, sort = 'newest', page = 1, limit = 20 } = req.query;

  let whereClauses = [];
  let params = [];

  if (search) {
    const searchPattern = `%${search.trim()}%`;
    whereClauses.push(`(name LIKE ? OR department LIKE ? OR phone LIKE ? OR registration_id LIKE ? OR instrument LIKE ?)`);
    params.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
  }

  if (category && category !== 'All') {
    whereClauses.push(`category = ?`);
    params.push(category);
  }

  if (instrument && instrument !== 'All') {
    whereClauses.push(`instrument = ?`);
    params.push(instrument);
  }

  if (department && department !== 'All') {
    whereClauses.push(`department = ?`);
    params.push(department);
  }

  if (date) {
    whereClauses.push(`created_date = ?`);
    params.push(date);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  let orderBySql = 'ORDER BY id DESC'; // default newest first
  if (sort === 'oldest') orderBySql = 'ORDER BY id ASC';
  else if (sort === 'name_asc') orderBySql = 'ORDER BY name ASC';
  else if (sort === 'name_desc') orderBySql = 'ORDER BY name DESC';
  else if (sort === 'dept') orderBySql = 'ORDER BY department ASC';
  else if (sort === 'category') orderBySql = 'ORDER BY category ASC';

  const offset = (parseInt(page) - 1) * parseInt(limit);

  // Compute Overall Stats Query
  const todayStr = new Date().toISOString().split('T')[0];

  const statsQuery = `
    SELECT 
      COUNT(*) AS total,
      SUM(CASE WHEN category = 'Singing' THEN 1 ELSE 0 END) AS singing,
      SUM(CASE WHEN category = 'Instruments' THEN 1 ELSE 0 END) AS instruments,
      SUM(CASE WHEN created_date = ? THEN 1 ELSE 0 END) AS today
    FROM registrations
  `;

  db.get(statsQuery, [todayStr], (err, statsRow) => {
    if (err) {
      console.error('Stats query error:', err);
      return res.status(500).json({ error: 'Failed to fetch statistics.' });
    }

    const stats = {
      total: statsRow ? (statsRow.total || 0) : 0,
      singing: statsRow ? (statsRow.singing || 0) : 0,
      instruments: statsRow ? (statsRow.instruments || 0) : 0,
      today: statsRow ? (statsRow.today || 0) : 0
    };

    // Get Filtered Count
    const countSql = `SELECT COUNT(*) as count FROM registrations ${whereSql}`;
    db.get(countSql, params, (err, countRow) => {
      if (err) {
        console.error('Count query error:', err);
        return res.status(500).json({ error: 'Failed to fetch registrations.' });
      }

      const totalFiltered = countRow ? countRow.count : 0;

      // Get Paginated Data
      const dataSql = `SELECT * FROM registrations ${whereSql} ${orderBySql} LIMIT ? OFFSET ?`;
      const dataParams = [...params, parseInt(limit), offset];

      db.all(dataSql, dataParams, (err, rows) => {
        if (err) {
          console.error('Data query error:', err);
          return res.status(500).json({ error: 'Failed to fetch registrations data.' });
        }

        // Get unique departments for department filter dropdown
        db.all(`SELECT DISTINCT department FROM registrations ORDER BY department ASC`, [], (err, deptRows) => {
          const departments = deptRows ? deptRows.map(r => r.department) : [];

          return res.json({
            stats,
            registrations: rows || [],
            pagination: {
              total: totalFiltered,
              page: parseInt(page),
              limit: parseInt(limit),
              totalPages: Math.ceil(totalFiltered / parseInt(limit)) || 1
            },
            departments
          });
        });
      });
    });
  });
});

// 5. Get Single Registration Details
app.get('/api/admin/registrations/:id', authenticateAdminToken, (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM registrations WHERE id = ? OR registration_id = ?`, [id, id], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ error: 'Registration not found.' });
    }
    return res.json(row);
  });
});

// 6. Edit Registration
app.put('/api/admin/registrations/:id', authenticateAdminToken, (req, res) => {
  const { id } = req.params;
  const { name, department, dob, phone, category, instrument, experience } = req.body;

  if (!name || !department || !dob || !phone || !category || !experience) {
    return res.status(400).json({ error: 'All fields are required for editing.' });
  }

  const sql = `
    UPDATE registrations 
    SET name = ?, department = ?, dob = ?, phone = ?, category = ?, instrument = ?, experience = ?
    WHERE id = ? OR registration_id = ?
  `;

  const finalInst = category === 'Singing' ? '—' : instrument;

  db.run(sql, [name.trim(), department.trim(), dob, phone.trim(), category, finalInst, experience.trim(), id, id], function (err) {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ error: 'Failed to update registration.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Registration record not found.' });
    }
    return res.json({ success: true, message: 'Registration updated successfully.' });
  });
});

// 7. Delete Registration
app.delete('/api/admin/registrations/:id', authenticateAdminToken, (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM registrations WHERE id = ? OR registration_id = ?`, [id, id], function (err) {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Failed to delete registration.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Registration record not found.' });
    }
    return res.json({ success: true, message: 'Registration deleted successfully.' });
  });
});

// 8. Export Registrations to CSV
app.get('/api/admin/export', authenticateAdminToken, (req, res) => {
  db.all(`SELECT * FROM registrations ORDER BY id DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to export data.' });
    }

    const headers = ['Registration ID', 'Name', 'Department', 'Date of Birth', 'WhatsApp Number', 'Category', 'Instrument', 'Experience', 'Registered Date/Time'];
    
    const escapeCsv = (str) => {
      if (str === null || str === undefined) return '""';
      const escaped = String(str).replace(/"/g, '""');
      return `"${escaped}"`;
    };

    let csvContent = headers.join(',') + '\n';

    rows.forEach(r => {
      const rowData = [
        escapeCsv(r.registration_id),
        escapeCsv(r.name),
        escapeCsv(r.department),
        escapeCsv(r.dob),
        escapeCsv(r.phone),
        escapeCsv(r.category),
        escapeCsv(r.instrument),
        escapeCsv(r.experience),
        escapeCsv(new Date(r.timestamp).toLocaleString())
      ];
      csvContent += rowData.join(',') + '\n';
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="BAND_UNKNOWN_Audition_Registrations_${new Date().toISOString().split('T')[0]}.csv"`);
    return res.send(csvContent);
  });
});

// SPA Catch-All Route for Frontend Pages
if (fs.existsSync(distDir)) {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`BAND UNKNOWN Backend API Server running on http://localhost:${PORT}`);
});
