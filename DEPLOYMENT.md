# Deployment Guide

## Deploy Backend to Railway + Use Railway MySQL

### 1. Set up Railway MySQL Database

1. Go to [Railway.app](https://railway.app)
2. Create a new project or login to existing
3. Add a new service and select **MySQL**
4. Railway will create the database automatically
5. Go to MySQL service → **Connect** tab
6. Copy the connection details:
   - `DB_HOST` (Railway host URL)
   - `DB_USER` (usually `root`)
   - `DB_PASSWORD` (auto-generated, copy carefully)
   - `DB_PORT` (usually `3306`)
   - `DB_DATABASE` (usually `railway`)

### 2. Deploy FastAPI Backend

1. Push code to GitHub:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/tour-booking.git
   git branch -M main
   git push -u origin main
   ```

2. In Railway dashboard:
   - Click **+ New**
   - Select **GitHub Repo**
   - Choose your `tour-booking` repository
   - Railway will auto-detect `requirements.txt`

3. Set Environment Variables in Railway:
   - Go to your FastAPI service
   - Click **Variables**
   - Add each variable from your `.env`:
     ```
     DB_HOST = [Railway MySQL host]
     DB_PORT = 3306
     DB_USER = root
     DB_PASSWORD = [Your Railway password]
     DB_DATABASE = railway
     ```

4. Railway automatically deploys when you push to GitHub
5. Get your backend URL from Railway dashboard (e.g., `https://your-app.railway.app`)

### 3. Update Frontend to Use New Backend URL

In [script.js](script.js#L18), update:
```javascript
const API_URL = 'https://your-app.railway.app';  // Your Railway backend URL
```

Or deploy frontend to:
- **Vercel** (for Next.js/React frontend)
- **GitHub Pages** (for static HTML)
- **Railway** (for static files)

### 4. Testing

```bash
# Locally test with Railway MySQL:
# 1. Update .env with Railway credentials
# 2. Run: uvicorn main:app --reload
# 3. Test endpoints at http://localhost:8000/docs
```

### 5. Production Checklist

- [ ] Environment variables set in Railway
- [ ] Frontend API_URL updated
- [ ] CORS origins updated in `main.py` (if needed)
- [ ] Database tables created automatically on startup
- [ ] Test signup, login, booking endpoints
- [ ] Monitor Railway logs for errors

### Useful Commands

```bash
# Install dependencies locally
pip install -r requirements.txt

# Run local server with .env
uvicorn main:app --reload

# Check Railway logs
# Use Railway dashboard → your service → Deployments
```

### Troubleshooting

- **Connection refused**: Check DB_HOST, DB_PORT, firewall settings
- **Wrong password error**: Verify password from Railway MySQL **Connect** tab
- **Database not found**: Railway creates `railway` database automatically
- **CORS errors**: Update `allow_origins` in `main.py` to your frontend URL
