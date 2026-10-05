# CuffKings - How to Run the Website Correctly ✅

**IMPORTANT**: This is a **Next.js Full-Stack Application**, NOT a separate frontend + backend.

---

## 🏗️ Architecture Clarification

### What You Have
Your CuffKings website is a **Next.js 15 monolithic application** that includes:
- ✅ Customer-facing pages (in `/frontend/app/`)
- ✅ API routes (in `/frontend/app/api/`)
- ✅ Server components (in `/backend/` folder)
- ✅ Admin UI (in `/backend/admin-components/`)
- ✅ Database models (in `/backend/models/`)

**Everything runs on ONE Next.js server!**

### Folder Structure Explained
```
cufflinks-website/
├── frontend/               # ← THIS IS THE MAIN APP
│   ├── app/               # Customer pages + API routes
│   │   ├── page.tsx       # Homepage
│   │   ├── shop/          # Shop pages
│   │   ├── admin/         # Admin pages
│   │   └── api/           # Backend API endpoints
│   ├── components/        # React components
│   └── package.json       # ← Main package.json
│
├── backend/               # ← This is NOT a separate server!
│   ├── admin-components/  # Admin UI components (imported by /app/admin/)
│   ├── models/            # MongoDB models (used by API routes)
│   └── lib/               # Backend utilities
│
└── package.json           # Root orchestrator (optional)
```

---

## ✅ How to Run Correctly

### Option 1: Run the Frontend (Recommended)
This runs the **entire application** including admin panel and API routes.

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies (first time only)
npm install

# Run development server
npm run dev
```

**Access points:**
- Customer site: http://localhost:3000
- Admin panel: http://localhost:3000/admin
- API endpoints: http://localhost:3000/api/*

### Option 2: Run from Root (Alternative)
```bash
# From the root folder
cd "C:\Users\Hp\OneDrive\Desktop\All files\cufflinks website"

# Run frontend
npm run dev:frontend
```

---

## ❌ Common Mistakes

### Mistake 1: Running Backend Separately
```bash
cd backend
npm start  # ❌ WRONG - No package.json here!
```

**Why it fails**: The `backend` folder doesn't have its own `package.json` or server. It's just organized code that Next.js imports.

### Mistake 2: Port 3000 Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**: 
1. **Kill the existing process**:
   ```bash
   # Find process ID
   netstat -ano | findstr :3000
   
   # Kill it (replace PID with actual number)
   taskkill /PID 13896 /F
   ```

2. **Or change the port**:
   ```bash
   # Run on a different port
   PORT=3001 npm run dev
   ```

---

## 🔧 Fix Your Current Issue

You have a Next.js server already running on port 3000. Here's how to fix it:

### Quick Fix - Kill the Running Server
```bash
# Kill the process using port 3000
taskkill /PID 13896 /F

# Now run from the correct location
cd frontend
npm run dev
```

### Alternative - Use Different Port
```bash
cd frontend
set PORT=3001 && npm run dev
```

Then access at: http://localhost:3001

---

## 📊 Architecture Flow

```
User Browser
     ↓
http://localhost:3000
     ↓
Next.js Server (frontend/app/)
     ↓
┌─────────────────────────────────┐
│  Customer Pages                 │ → /app/page.tsx
│  Shop Pages                     │ → /app/shop/
│  Admin Pages                    │ → /app/admin/
│  API Routes                     │ → /app/api/
└─────────────────────────────────┘
     ↓
┌─────────────────────────────────┐
│  Backend Logic (imported)       │
│  • Admin Components             │ ← /backend/admin-components/
│  • MongoDB Models               │ ← /backend/models/
│  • Server Utilities             │ ← /backend/lib/
└─────────────────────────────────┘
     ↓
MongoDB Atlas (Cloud Database)
```

---

## 🚀 Complete Startup Guide

### First Time Setup
```bash
# 1. Navigate to frontend
cd "C:\Users\Hp\OneDrive\Desktop\All files\cufflinks website\frontend"

# 2. Install dependencies
npm install

# 3. Create environment file
copy .env.example .env.local

# 4. Edit .env.local with your values
notepad .env.local

# 5. Start development server
npm run dev
```

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=923719145871
NEXT_PUBLIC_API_URL=http://localhost:3000/api
MONGODB_URI=mongodb+srv://[your-credentials]
JWT_SECRET=your-secret-key
```

---

## 🎯 What Each Command Does

### Development Commands
```bash
npm run dev     # Start development server with hot reload
npm run build   # Build for production
npm run start   # Start production server (after build)
npm run lint    # Check code for errors
```

### Where to Run Them
All commands should be run from the **`/frontend` folder**!

---

## 🔍 Troubleshooting

### Issue: Port Already in Use
**Error**: `EADDRINUSE: address already in use :::3000`

**Solution 1 - Kill Process**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [number] /F
```

**Solution 2 - Change Port**:
```bash
# Edit package.json in frontend folder
"scripts": {
  "dev": "next dev -p 3001"
}
```

### Issue: MongoDB Connection Failed
**Error**: `MongooseServerSelectionError`

**Solution**: Check your MongoDB URI in `.env.local`
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cuffkings
```

### Issue: "Cannot find module"
**Error**: `Cannot find module '@/components/...'`

**Solution**: Run from the correct folder
```bash
cd frontend  # Make sure you're here!
npm install
npm run dev
```

---

## 📁 Where Everything Is

### Customer Features
- Homepage: `/frontend/app/page.tsx`
- Shop: `/frontend/app/shop/page.tsx`
- Products: `/frontend/app/product/[slug]/page.tsx`
- Cart: `/frontend/app/cart/page.tsx`
- Checkout: `/frontend/app/checkout/page.tsx`

### Admin Features
- Dashboard: `/frontend/app/admin/page.tsx`
- Products: `/frontend/app/admin/products/page.tsx`
- Orders: `/frontend/app/admin/orders/page.tsx`
- Collections: `/frontend/app/admin/collections/page.tsx`

### API Endpoints
- Products: `/frontend/app/api/products/route.ts`
- Orders: `/frontend/app/api/orders/route.ts`
- Auth: `/frontend/app/api/admin-login/route.ts`

### Backend Logic (Imported by API Routes)
- Models: `/backend/models/`
- Admin UI: `/backend/admin-components/`
- Utilities: `/backend/lib/`

---

## ✅ Quick Start Checklist

- [ ] Navigate to `/frontend` folder
- [ ] Run `npm install`
- [ ] Create `.env.local` with MongoDB URI
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Test homepage loads
- [ ] Test admin at http://localhost:3000/admin
- [ ] Test API at http://localhost:3000/api/products

---

## 🎉 Summary

**Remember**: 
1. ✅ Run everything from `/frontend` folder
2. ✅ Use `npm run dev` to start
3. ✅ One server runs everything (customer + admin + API)
4. ❌ Don't try to run backend separately
5. ❌ Don't run from root `/backend` folder

---

*Your website is a modern Next.js full-stack application - everything in one place! 🚀*
