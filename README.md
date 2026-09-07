# BAND UNKNOWN — College Band Audition Portal 2026 🎸🎤

An audition registration platform and admin portal with live stats for **BAND UNKNOWN** at **Kalaignarkarunanidhi Institute of Technology (KIT-Coimbatore)**.

---

## 🚀 Features

- **Spider-Man × Music Dynamic Theme**: Interactive audio equalizer visualizer background, floating musical notes, and custom branding.
- **Dedicated Audition Flows**:
  - **Singing Auditions**: Dedicated vocal audition registration.
  - **Instrument Auditions**: Keyboard, Guitar, Bass, Drums, Cajon, Violin, Flute, Saxophone, Trumpet, and more.
- **Hidden Admin Management Portal**:
  - Secure JWT-authenticated login with rate-limiting.
  - Live audition metrics: Total, Singing, Instruments, and Today's registrations.
  - Search, multi-criteria filtering, sorting, viewing, and record editing.
  - 1-Click CSV data export.
- **Integrated SQLite Database**: Robust, persistent local storage.

---

## 💻 Tech Stack

- **Frontend**: React 18, Vite, Lucide Icons, Canvas Confetti, Vanilla CSS (Glassmorphism design).
- **Backend**: Node.js, Express, SQLite3, JSON Web Tokens (JWT), BCrypt.js.

---

## 🛠️ Setup & Running

### 1. Install Node.js
If `npm` or `node` is not yet installed on your system, install Node.js via [nodejs.org](https://nodejs.org/) or run:
```powershell
winget install OpenJS.NodeJS.LTS
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
# Starts both Backend API (Port 5000) and Frontend (Port 5173)
npm run dev
```

Or run them individually:
```bash
# Backend Server only
npm run server

# Frontend Client only
npm run client
```

---

## 🔐 Admin Credentials

- **Admin Login URL**: [http://localhost:5173/admin](http://localhost:5173/admin)
- **User ID**: `jas_abishek`
- **Password**: `jasri117`

---

## 🌐 URLs

- **Home Page**: `http://localhost:5173/`
- **Singing Audition**: `http://localhost:5173/register/singing`
- **Instruments Audition**: `http://localhost:5173/register/instruments`
- **Admin Dashboard**: `http://localhost:5173/admin`
