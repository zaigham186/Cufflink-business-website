# CuffKings — Full-Stack Next.js Architecture

## Overview

**CuffKings** is an artisanal, luxury e-commerce platform engineered as a unified monolithic **Next.js 15 App Router** application deployed on **Vercel** with **MongoDB Atlas**.

The platform is designed around strict separation of concerns, enterprise-grade client/server boundaries, and layered architecture:
```
Route Handlers / Server Components
                ↓
          Domain Services
                ↓
           Repositories
                ↓
          Mongoose Models
                ↓
          MongoDB Atlas
```

---

## 1. Directory Structure

```text
cuffkings/
├── app/
│   ├── (storefront)/                  # Route group for customer storefront (preserves public URLs)
│   │   ├── page.tsx                   # Homepage (Hero, Brand Ticker, Featured Collections)
│   │   ├── about/page.tsx             # Brand story, artisanal craftsmanship
│   │   ├── shop/
│   │   │   ├── page.tsx               # Catalog browser with live filters
│   │   │   └── [category]/page.tsx    # Tier collections (Classical, Signature, Premium)
│   │   ├── product/[slug]/page.tsx    # Product detail page (ISR revalidate = 60s)
│   │   ├── cart/page.tsx              # Full bag review
│   │   ├── checkout/page.tsx          # Dual-rail checkout (Direct Web Order & WhatsApp)
│   │   └── contact/page.tsx           # Contact & concierge inquiry
│   ├── admin/                         # Admin panel routes (protected by middleware & JWT)
│   │   ├── layout.tsx                 # Protected admin shell (AdminSidebar & AdminHeader)
│   │   ├── login/page.tsx             # Master security access gate
│   │   ├── page.tsx                   # Atelier command dashboard & analytics
│   │   ├── products/
│   │   │   ├── page.tsx               # Inventory matrix & stock tracking
│   │   │   ├── new/page.tsx           # Product creation form
│   │   │   └── [id]/edit/page.tsx     # Product update form
│   │   ├── collections/page.tsx       # Tier pricing & descriptive copy management
│   │   ├── content/page.tsx           # Hero headlines, FAQs, delivery fees CMS
│   │   └── orders/page.tsx            # Order fulfillment registry & courier dispatch
│   ├── api/                           # Thin Next.js Route Handlers
│   │   ├── auth/
│   │   │   ├── login/route.ts         # Secure HttpOnly admin login
│   │   │   └── logout/route.ts        # Admin session invalidation
│   │   ├── products/
│   │   │   ├── route.ts               # GET all/filtered, POST create product
│   │   │   └── [id]/route.ts          # GET product, PUT update, DELETE product
│   │   ├── orders/
│   │   │   ├── route.ts               # GET order registry, POST create customer order
│   │   │   └── [id]/route.ts          # GET order, PUT status update, DELETE order
│   │   ├── collections/route.ts       # GET tiers, PUT update tier pricing/copy
│   │   └── content/route.ts           # GET site copy, PUT update site CMS
│   ├── layout.tsx                     # Global root layout (Navbar, Footer, CartDrawer)
│   ├── globals.css                    # Tailwind CSS directives & luxury styling tokens
│   ├── not-found.tsx                  # Sartorial 404 handler
│   ├── icon.tsx                       # Dynamic favicon
│   ├── opengraph-image.tsx            # Social sharing preview
│   ├── sitemap.ts                     # Dynamic XML sitemap generator
│   └── robots.ts                      # Search engine crawler directives
│
├── components/
│   ├── storefront/                    # Customer UI components
│   │   ├── home/                      # HeroNoir, FeaturedProducts, CollectionsShowcase, BrandStory
│   │   ├── shop/                      # ProductGrid, ProductCard, FilterBar
│   │   ├── product/                   # ImageGallery, AddToCartButton, ProductSpecs
│   │   ├── cart/                      # CartDrawer, CartItem, CartSummary
│   │   ├── checkout/                  # CheckoutForm, Dual-rail WhatsApp integration
│   │   ├── contact/                   # ContactInquiryForm, ContactFAQ
│   │   ├── about/                     # CollectionExplainer, BrandHeritage
│   │   └── layout/                    # Navbar, Footer
│   ├── admin/                         # Admin portal UI components
│   │   ├── AdminSidebar.tsx           # Navigation links & active tab indicator
│   │   ├── AdminHeader.tsx            # Session status & logout trigger
│   │   ├── ProductTable.tsx           # Data table with quick actions
│   │   ├── ProductForm.tsx            # Reactive creation & editing form
│   │   ├── OrderTable.tsx             # Status updates, courier tracking, customer drawer
│   │   ├── CollectionEditor.tsx       # Tier settings editor
│   │   ├── SiteContentForm.tsx        # CMS copy editor
│   │   ├── ImageUploader.tsx          # Media manager
│   │   └── dashboard/                 # Metrics, revenue summary, low-stock alerts
│   ├── ui/                            # Reusable atomic UI elements (Button, Badge, BrassLine)
│   └── motion/                        # GSAP micro-animations & smooth transitions
│
├── lib/
│   ├── server/                        # SERVER-ONLY: Never imported by client code
│   │   ├── db.ts                      # Cached Mongoose singleton connection
│   │   ├── auth.ts                    # JWT signing/verification, password validation, cookie gate
│   │   ├── services/                  # Business logic layer
│   │   │   ├── product.service.ts
│   │   │   ├── order.service.ts
│   │   │   ├── collection.service.ts
│   │   │   └── content.service.ts
│   │   └── repositories/              # Database access layer
│   │       ├── product.repository.ts
│   │       ├── order.repository.ts
│   │       ├── collection.repository.ts
│   │       └── content.repository.ts
│   ├── client/                        # CLIENT-ONLY: Browser utilities
│   │   └── whatsapp.ts                # Direct WhatsApp checkout payload builder
│   ├── validations/                   # Zod schemas for request validation & forms
│   │   ├── product.schema.ts
│   │   ├── order.schema.ts
│   │   ├── collection.schema.ts
│   │   ├── content.schema.ts
│   │   └── auth.schema.ts
│   ├── constants/
│   │   ├── routes.ts                  # Canonical application route definitions
│   │   └── config.ts                  # Static constants, brand details
│   └── utils.ts                       # Classnames merger (clsx + tailwind-merge)
│
├── models/                            # Mongoose Schemas & Models (Server-only)
│   ├── Product.ts
│   ├── Order.ts
│   ├── CollectionSettings.ts
│   └── SiteContent.ts
│
├── store/
│   └── cartStore.ts                   # Zustand client state with LocalStorage persistence
│
├── types/                             # Universal TypeScript interfaces & types
│   ├── product.ts
│   ├── order.ts
│   ├── collection.ts
│   ├── siteContent.ts
│   └── auth.ts
│
├── hooks/
│   └── useReducedMotion.ts            # Accessibility motion preference detection
│
├── public/                            # Static media (80+ product photographs & editorial assets)
│   ├── editorial/
│   └── products/
│
├── scripts/
│   ├── seed-products.ts               # Seeds 67 catalog products into Atlas
│   ├── seed-site-data.ts              # Seeds collection tiers & CMS site content
│   └── verify-backend.ts              # Comprehensive 19-point automated test suite
│
├── middleware.ts                      # Edge middleware for /admin route guarding
├── next.config.ts                     # Security headers & remote image configuration
├── tailwind.config.ts                 # Noir Atelier color tokens & typography
├── tsconfig.json                      # Clean single @/* root alias
└── .env.example                       # Documented required environment variables
```

---

## 2. Request Flow Architecture

All write operations and complex reads strictly follow the clean architecture pipeline:

```
[ HTTP Request (e.g. POST /api/products) ]
                    ↓
[ App Route Handler (app/api/products/route.ts) ]
  • Parses request body
  • Validates payload against Zod schema (lib/validations/product.schema.ts)
  • Authorizes admin session via HttpOnly cookie (lib/server/auth.ts)
  • Delegates work to the Domain Service
                    ↓
[ Domain Service (lib/server/services/product.service.ts) ]
  • Applies business logic (e.g., calculates stockStatus based on stockCount)
  • Enforces uniqueness of SKU & slug
  • Delegates database operation to the Repository
                    ↓
[ Repository (lib/server/repositories/product.repository.ts) ]
  • Establishes cached connection via lib/server/db.ts
  • Executes Mongoose queries (ProductModel.create, find, update)
  • Maps database documents to plain TypeScript interfaces
                    ↓
[ Mongoose Model (models/Product.ts) ]
                    ↓
[ MongoDB Atlas Database ]
```

---

## 3. Client / Server Boundaries

To prevent security vulnerabilities, bundle bloat, and runtime crashes:

### Server-Only Modules:
- `lib/server/**` (Database connections, JWT signing, password hashing, services, repositories)
- `models/**` (Mongoose schema definitions and models)
- Environment secrets (`JWT_SECRET`, `ADMIN_PASSWORD_HASH`, `MONGODB_URI`)

> **Enforcement:** Client components (`"use client"`) **must never** import from `models/`, `lib/server/`, or `mongoose`.

### Client-Side Modules:
- `store/cartStore.ts` (Zustand client store using `localStorage`)
- `lib/client/whatsapp.ts` (Builds `https://wa.me/...` URL with encoded order details)
- `components/storefront/**` and `components/motion/**` (Interactive UI & GSAP animations)
- `hooks/**` (React hooks, e.g. `useReducedMotion`)

### Universal Modules:
- `types/**` (Pure TypeScript definitions with no runtime overhead)
- `lib/validations/**` (Zod schemas usable both on the server for route verification and on the client for form validation)
- `lib/constants/**` (Route paths, brand configurations)
- `lib/utils.ts` (String manipulation, tailwind-merge)

---

## 4. Authentication & Security Architecture

1. **No Hardcoded Fallbacks:**
   - Production mode requires explicit `JWT_SECRET` and `ADMIN_PASSWORD_HASH` environment variables. If missing in production, authentication fails safely.
2. **Password Verification:**
   - Evaluated via `bcrypt.compare` using salted hashes (e.g. `$2b$10$...`).
3. **Session Cookie:**
   - Upon successful login, the server issues a signed JWT stored inside an `HttpOnly`, `SameSite=Lax`, `Secure` (in production) cookie named `ck_admin_token`.
4. **Edge Guard:**
   - `middleware.ts` runs on the edge to immediately intercept unauthorized requests to `/admin/*` and redirects them to `/admin/login`.
5. **Route-Level Guard:**
   - Every mutating route handler (`POST`, `PUT`, `DELETE` under `/api/*`) performs cryptographic verification of `ck_admin_token` via `getAdminSession(req)` before processing requests.

---

## 5. Dual-Rail Checkout Architecture

Customers have two checkout rails:
1. **Direct Web Order:**
   - Customer submits shipping address and phone number to `/api/orders`.
   - Generates an official tracking order number (e.g., `CK-84192`).
   - Recorded immediately in MongoDB for fulfillment by the atelier admin.
2. **WhatsApp Direct Checkout:**
   - Formulates a formatted, itemized order invoice.
   - Launches WhatsApp with the store's concierge number (`NEXT_PUBLIC_WHATSAPP_NUMBER`), allowing immediate customer confirmation.

---

## 6. Deployment Architecture

The application is deployed as **ONE full-stack Next.js project on Vercel**:

```
GitHub Repository (main branch)
              ↓
  Vercel Unified Monolith
  ├── Serverless Functions (/api/*)
  ├── Edge Middleware (route guard)
  ├── Static HTML / Incremental Static Regeneration (storefront)
  └── Client React Bundles
              ↓
      MongoDB Atlas (Database)
```

No external Express servers, Railway backends, or separate frontend hosts are required.
