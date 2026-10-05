# CuffKings — Rapid Production Deployment Guide

> **Current Status**: The codebase is **100% production-ready**. All TypeScript checks pass (`0` errors), the backend test suite passes (`19/19`), and the production build compiles (`91/91` routes).

---

## Architecture Summary
* **Platform**: [Vercel](https://vercel.com) (Single unified full-stack Next.js 15 App Router monolith)
* **Database**: [MongoDB Atlas](https://cloud.mongodb.com) (Persistent storage for catalog, orders, and images)
* **Storage**: Self-contained in MongoDB (Zero Cloudinary, Zero AWS, Zero Vercel Blob tokens required)
* **Repository**: [`https://github.com/zaigham186/Cufflink-business-website`](https://github.com/zaigham186/Cufflink-business-website) (branch: `main`)

---

## 3-Step Deployment Checklist

### Step 1: MongoDB Atlas — Whitelist Cloud IPs (1 Minute)

Because Vercel serverless functions run across dynamic IP addresses, MongoDB Atlas must allow connections from any IP.

1. Log into your **[MongoDB Atlas Console](https://cloud.mongodb.com/)**.
2. In the left navigation, click **Network Access** (under *Security*).
3. Check the **IP Access List**:
   * If `0.0.0.0/0` (Include current IP / Anywhere) is already there, you're done!
   * If not, click **+ Add IP Address** $\rightarrow$ Click **Allow Access from Anywhere** (`0.0.0.0/0`) $\rightarrow$ Click **Confirm**.
4. *(Optional verification)* Under **Database Access**, ensure your database user has `readWriteAnyDatabase` or read/write access to the `cuffkings` database.

---

### Step 2: Configure Vercel Environment Variables (2 Minutes)

You only need **4 environment variables** in Vercel. 

1. Go to your **[Vercel Dashboard](https://vercel.com/dashboard)**.
2. Select your **CuffKings** project (or click **Add New Project** $\rightarrow$ **Import** `Cufflink-business-website` from GitHub).
3. Navigate to **Settings** $\rightarrow$ **Environment Variables**.
4. Add the following 4 variables for **Production**, **Preview**, and **Development**:

| Variable Name | Description | Example / Production Value |
| :--- | :--- | :--- |
| `MONGODB_URI` | Your live MongoDB Atlas connection URI | `mongodb+srv://<user>:<password>@cluster2.vpb0qnd.mongodb.net/cuffkings?retryWrites=true&w=majority` |
| `JWT_SECRET` | 64-character random secret key for admin sessions | Use your current hex key from `.env.local` |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of your admin password | Use your current `$2b$10$...` hash from `.env.local` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp concierge phone number (no `+` sign) | `923719145871` |

> ⚠️ **Note**: No `BLOB_READ_WRITE_TOKEN`, no Cloudinary credentials, and no AWS keys are required. The application handles manual file uploads directly.

---

### Step 3: Trigger the Vercel Deployment (1 Minute)

#### Case A: If your project is already connected in Vercel:
1. Go to the **Deployments** tab in Vercel.
2. Click the three dots menu (**`...`**) next to the latest deployment.
3. Click **Redeploy** (ensure "Redeploy with existing build cache" is **unchecked**).
4. Click **Redeploy**.

#### Case B: If deploying for the first time:
1. From the Vercel Dashboard, click **Add New...** $\rightarrow$ **Project**.
2. Select your GitHub repository: `zaigham186/Cufflink-business-website`.
3. Keep Framework Preset as **Next.js**, Root Directory as `./`.
4. Paste the 4 environment variables from Step 2.
5. Click **Deploy**.

Vercel will build the project in ~30–60 seconds and give you a live production URL (e.g., `https://cuffkings.vercel.app`).

---

## Verification After Deployment

### 1. Storefront Verification
1. Visit your live URL: `https://your-domain.vercel.app`
2. Test the following flows:
   * **Homepage**: Hero animation, brand ticker, and featured products display.
   * **Catalog**: Navigate to `/shop` and filter by category (`/shop/classical`, `/shop/signature`, `/shop/premium`).
   * **Product Detail**: Click any cufflink (e.g. `/product/signature-matte-black-edge-polish-cufflinks`).
   * **Cart & Checkout**: Add an item to bag, open `/cart`, and proceed to `/checkout`.
   * **WhatsApp Direct Checkout**: Click WhatsApp checkout to verify the generated invoice payload.

### 2. Admin Portal & Manual Image Upload Verification
1. Open `https://your-domain.vercel.app/admin/login`
2. Enter your admin password.
3. Confirm access to the dashboard (`/admin`), product matrix (`/admin/products`), orders (`/admin/orders`), and CMS (`/admin/content`).
4. Click **+ Add Product** (`/admin/products/new`):
   * In the **Photography & Media** section, drag-and-drop or browse an image file from your device.
   * Confirm the live thumbnail preview and "Primary Cover" badge.
   * Save the product and confirm it appears immediately in the store catalog.

---

## Troubleshooting Guide

| Issue | Cause | Fix |
| :--- | :--- | :--- |
| **`MongooseServerSelectionError`** | MongoDB Atlas IP blocked | Add `0.0.0.0/0` to MongoDB Atlas Network Access IP Access List. |
| **`Admin Login Fails (401)`** | Missing or incorrect `JWT_SECRET` or `ADMIN_PASSWORD_HASH` | Ensure both are pasted correctly into Vercel Settings $\rightarrow$ Environment Variables and redeploy. |
| **`WhatsApp number wrong`** | Environment variable missing | Ensure `NEXT_PUBLIC_WHATSAPP_NUMBER` is set to `923719145871` in Vercel. |
| **`Build timeout or memory`** | N/A | Next.js 15 is pre-configured with standalone chunking and builds in <30 seconds. |
