# FlowSense Deployment Guide

## Frontend (Vercel)

### Setup in Vercel
1. Connect your GitHub repo to Vercel
2. Set environment variable in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend.up.railway.app
   ```
   Replace with your actual Railway backend URL

3. Deploy - Vercel will automatically run `npm run build`

### Local Frontend Development
```bash
cd Frontend
npm install
VITE_API_URL=http://localhost:5000 npm run dev
```

---

## Backend (Railway)

### Setup in Railway
1. Connect your GitHub repo to Railway
2. Add environment variables in Railway dashboard:
   ```
   PORT=5000
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```
   Replace with your actual Vercel frontend URL

3. Set start command:
   ```
   npm start
   ```

4. Deploy - Railway will automatically install dependencies

### Local Backend Development
```bash
cd Backend
npm install
npm start
```

---

## Testing API Connection

After deployment, test if frontend can reach backend:

```bash
# From frontend, run in browser console
fetch('https://your-backend.up.railway.app/health')
  .then(r => r.json())
  .then(console.log)
```

Should return: `{ status: "FlowSense backend is running" }`

---

## Environment Files Created

- **Frontend/.env.example** - Template for frontend env vars
- **Frontend/.env.local** - Local development settings
- **Backend/.env.example** - Template for backend env vars  
- **Backend/.env.local** - Local development settings

> ⚠️ Never commit `.env.local` or actual `.env` files with secrets to git!
