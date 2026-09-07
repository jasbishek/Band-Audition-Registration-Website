# 🚀 Deployment Guide: Render (Backend) & Vercel (Frontend)

This guide walks you through deploying the **BAND UNKNOWN Audition Portal** in minutes.

---

## 🏗️ Architecture Overview

* **Backend API (Node.js/Express + SQLite):** Hosted on [Render](https://render.com/) (Web Service).
* **Frontend Client (React + Vite):** Hosted on [Vercel](https://vercel.com/) (Static Site).

---

## Step 1: Push Code to GitHub

Make sure all your code is committed and pushed to a GitHub repository:
```bash
git add .
git commit -m "Configure for Render and Vercel deployment"
git push origin main
```

---

## Step 2: Deploy Backend on Render

1. Go to **[dashboard.render.com](https://dashboard.render.com/)** and sign in.
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository (`Band-Audition-Registration-Website`).
4. Configure the Web Service settings:
   - **Name:** `band-unknown-backend` (or your choice)
   - **Region:** Choose closest to your users (e.g., Singapore / Frankfurt / Oregon)
   - **Branch:** `main`
   - **Root Directory:** *(leave blank)*
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
   - **Instance Type:** `Free`
5. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `ADMIN_USER_ID` = `jas_abishek`
   - `ADMIN_PASSWORD` = `jasri117`
   - `ADMIN_PASSWORD_HASH` = `$2a$10$Yy0o9sSeGII.nWkuqmF.We6PNVwWsUQ73yZqKqECGqk1U0msAshhW`
   - `JWT_SECRET` = `band_unknown_superhero_secret_key_2026_jas_abishek_secure_jwt` (or click generate)
   - `CLIENT_URL` = `*` *(or your Vercel URL once created, e.g. `https://your-band-app.vercel.app`)*
6. Click **Deploy Web Service**.
7. Once deployed, copy your Render service URL (e.g., `https://band-unknown-backend.onrender.com`).
8. You can verify the API is alive by visiting: `https://<your-render-url>/api/health`

---

## Step 3: Deploy Frontend on Vercel

1. Go to **[vercel.com](https://vercel.com/)** and sign in.
2. Click **Add New...** → **Project**.
3. Import the same GitHub repository.
4. Under **Configure Project**:
   - **Framework Preset:** `Vite` (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Expand **Environment Variables** and add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://<your-render-url-from-step-2>.onrender.com` *(e.g. `https://band-unknown-backend.onrender.com` without trailing slash)*
6. Click **Deploy**.
7. Vercel will build and launch your frontend within 30 seconds!

---

## Step 4: Final Check

1. Open your live Vercel URL.
2. Register a test audition submission. You should see the superhero confirmation modal and confetti.
3. Visit `/admin`, log in with your credentials (`jas_abishek` / `jasri117`), and verify that the stats update and records display properly.
4. Test CSV Export from the admin panel to ensure end-to-end data flow.

---

## 💡 Notes on Render Free Tier
- **Cold Starts:** Render's free tier spins down after 15 minutes of inactivity. The first request after sleep may take ~30-50 seconds to respond. Subsequent requests are instant.
