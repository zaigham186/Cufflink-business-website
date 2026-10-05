# CuffKings - Quick Start Guide 🚀

## ✅ Problem Solved!

You were trying to run the backend separately, but **this is a Next.js monolith** - everything runs together!

---

## 🎯 How to Run Your Website (3 Easy Ways)

### Method 1: Double-Click Batch File (Easiest!)
1. Find `START_WEBSITE.bat` in the root folder
2. Double-click it
3. Wait for the server to start
4. Open http://localhost:3000

### Method 2: Command Line
```bash
# Navigate to the root folder
cd "C:\Users\Hp\OneDrive\Desktop\All files\cufflinks website"

# Go to frontend
cd frontend

# Start the server
npm run dev
```

### Method 3: From Root Folder
```bash
cd "C:\Users\Hp\OneDrive\Desktop\All files\cufflinks website"
npm run dev:frontend
```

---

## 🌐 Access Points

Once the server is running, you can access:

| Service | URL |
|---------|-----|
| **Homepage** | http://localhost:3000 |
| **Shop** | http://localhost:3000/shop |
| **Admin Panel** | http://localhost:3000/admin |
| **API** | http://localhost:3000/api/products |

---

## ⚠️ What You Did Wrong

### ❌ Incorrect (What You Tried)
```bash
cd backend          # Wrong folder!
npm start           # No package.json here!
```

**Result**: Error - "address already in use" because:
1. Backend has no separate server
2. Port 3000 was already taken by frontend
3. Wrong command for wrong folder

### ✅ Correct Way
```bash
cd frontend         # Correct folder!
npm run dev         # Correct command!
```

**Result**: Everything works because Next.js runs the entire app!

---

## 🏗️ Architecture Explained

```
Your Website = ONE Next.js Application
│
├─ Customer Pages  (/app/page.tsx, /app/shop/, etc.)
├─ Admin Pages     (/app/admin/)
├─ API Routes      (/app/api/)
│
└─ Backend Code    (imported by API routes)
   ├─ Models       (/backend/models/)
   ├─ Admin UI     (/backend/admin-components/)
   └─ Utils        (/backend/lib/)
```

**Key Point**: The `/backend` folder is NOT a separate server. It's just organized code that Next.js imports!

---

## 🔧 If Port 3000 is Busy

### Option 1: Kill the Process
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with the number you see)
taskkill /PID [number] /F
```

### Option 2: Use a Different Port
```bash
cd frontend
set PORT=3001 && npm run dev
```

Then access at: http://localhost:3001

---

## 📋 Startup Checklist

Before running the website, make sure:

- [x] Port 3000 is available (or use different port)
- [x] You're in the `/frontend` folder
- [x] `.env.local` file exists with MongoDB URI
- [x] Dependencies are installed (`npm install`)
- [x] MongoDB Atlas is accessible

---

## 🎉 You're All Set!

Your website is ready to run. Just remember:

1. ✅ **Run from `/frontend` folder**
2. ✅ **Use `npm run dev`**
3. ✅ **One server = Everything works**

No need to run backend separately - it's all included! 🚀

---

## 📞 Need Help?

If you see errors:

1. **Port in use**: Kill process or change port
2. **MongoDB error**: Check `.env.local` connection string
3. **Module not found**: Run `npm install` in `/frontend`
4. **Build errors**: Check the error message carefully

---

*For detailed instructions, see `HOW_TO_RUN_THE_WEBSITE.md`*
