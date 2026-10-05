# CuffKings — Final Project Architecture

## The Three Zones

```
cuffkings-website/
│
├── app/              ← NEXT.JS CORE (cannot move — framework requirement)
├── frontend/         ← EVERYTHING the customer sees
├── backend/          ← EVERYTHING the server runs
├── public/           ← Static images (cannot move — Next.js requirement)
├── docs/             ← All .md documentation files
└── [config files]    ← next.config.ts, tailwind.config.ts, tsconfig.json etc.
```

---

## Complete File Tree

```
cuffkings-website/
│
│ ════════════════════════════════════════════
│  ZONE 1 — NEXT.JS CORE (stays at root)
│ ════════════════════════════════════════════
│
├── app/
│   │
│   │  ── Customer Pages ──
│   ├── layout.tsx                     Root layout (Navbar, Footer, fonts, CartDrawer)
│   ├── page.tsx                       Homepage
│   ├── globals.css                    Global styles + Tailwind directives
│   ├── not-found.tsx                  404 page
│   ├── shop/
│   │   ├── page.tsx                   Main shop catalog
│   │   └── [category]/
│   │       └── page.tsx               Category filtered shop
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx               Product detail (ISR revalidate=60)
│   ├── cart/
│   │   └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
│   │
│   │  ── Admin Pages ──
│   ├── admin/
│   │   ├── layout.tsx                 Auth gate (checks ck_admin_token cookie)
│   │   ├── login/
│   │   │   └── page.tsx               Login form
│   │   ├── page.tsx                   Dashboard (metrics, low-stock alerts)
│   │   ├── products/
│   │   │   ├── page.tsx               Product list table
│   │   │   ├── new/
│   │   │   │   └── page.tsx           Add new product
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx       Edit existing product
│   │   ├── collections/
│   │   │   └── page.tsx               Collection tier settings editor
│   │   └── content/
│   │       └── page.tsx               Site copy editor (hero, FAQs, delivery fee)
│   │
│   │  ── API Routes (backend endpoints) ──
│   └── api/
│       ├── admin-login/
│       │   └── route.ts               POST (login) / DELETE (logout)
│       ├── products/
│       │   ├── route.ts               GET all products / POST create (admin only)
│       │   └── [id]/
│       │       └── route.ts           GET one / PUT update / DELETE (admin only)
│       ├── collections/
│       │   └── route.ts               GET / PUT collection tier settings
│       └── content/
│           └── route.ts               GET / PUT site content and FAQs
│
│ ════════════════════════════════════════════
│  ZONE 2 — FRONTEND (customer-facing only)
│ ════════════════════════════════════════════
│
├── frontend/
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── HeroNoir.tsx           Full-viewport GSAP hero
│   │   │   ├── CollectionIntro.tsx    "Designed for the details"
│   │   │   ├── CategoryGrid.tsx       Classical / Signature / Premium tiles
│   │   │   ├── BrandStory.tsx         Peshawar editorial section
│   │   │   └── FinalCTA.tsx           Bottom conversion block
│   │   │
│   │   ├── shop/
│   │   │   ├── ProductCard.tsx        Individual product card (used everywhere)
│   │   │   ├── ProductGrid.tsx        Catalog grid with sorting
│   │   │   └── FilterSidebar.tsx      Category, price, material filters
│   │   │
│   │   ├── product/
│   │   │   ├── ImageGallery.tsx       Primary image + thumbnails
│   │   │   └── AddToCartButton.tsx    Quantity stepper + cart dispatch
│   │   │
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx         Slide-over cart panel
│   │   │   ├── CartItem.tsx           Single cart line item
│   │   │   └── CartSummary.tsx        Totals and checkout CTA
│   │   │
│   │   ├── checkout/
│   │   │   └── CheckoutForm.tsx       Name/phone/address + WhatsApp redirect
│   │   │
│   │   ├── contact/
│   │   │   ├── ContactInquiryForm.tsx Pre-filled WhatsApp inquiry form
│   │   │   ├── ContactChannels.tsx    WhatsApp, Email, Instagram, Location
│   │   │   └── ContactFAQ.tsx         FAQ (reads from SiteContent DB)
│   │   │
│   │   ├── motion/
│   │   │   ├── Reveal.tsx             Scroll-triggered fade+rise
│   │   │   ├── Magnetic.tsx           Cursor-follow CTA buttons
│   │   │   └── PageTransition.tsx     Route-change wipe animation
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx             Primary / Secondary / Outline variants
│   │       ├── Badge.tsx              Default / Sale / Limited variants
│   │       ├── BrassLine.tsx          Champagne brass hairline divider
│   │       └── ProductPlaceholder.tsx Fallback for missing photography
│   │
│   └── store/
│       └── cartStore.ts               Zustand cart (persisted to localStorage)
│
│ ════════════════════════════════════════════
│  ZONE 3 — BACKEND (server-side only)
│ ════════════════════════════════════════════
│
├── backend/
│   │
│   ├── models/                        Mongoose schemas (MongoDB documents)
│   │   ├── Product.ts                 Products collection schema
│   │   ├── CollectionSettings.ts      Classical / Signature / Premium tier settings
│   │   └── SiteContent.ts             Hero text, WhatsApp number, delivery fee, FAQs
│   │
│   ├── lib/                           Server-only utilities
│   │   ├── db.ts                      Mongoose connection (cached singleton)
│   │   ├── auth.ts                    JWT sign/verify + bcrypt password check
│   │   └── validators.ts              Zod schemas for API request validation
│   │
│   └── admin-components/              React components only used in admin panel
│       ├── AdminSidebar.tsx           Nav: Dashboard/Products/Collections/Content
│       ├── ProductForm.tsx            Create + edit product form (all fields)
│       ├── ImageUploader.tsx          Image path manager with reorder
│       ├── ProductList.tsx            Admin product table with search/filter
│       ├── CollectionSettingsForm.tsx Edit tier price labels and descriptions
│       └── SiteContentForm.tsx        Edit hero, FAQs, delivery fee, WhatsApp number
│
│ ════════════════════════════════════════════
│  ZONE 4 — SHARED (used by both sides)
│ ════════════════════════════════════════════
│
├── shared/
│   │
│   ├── types/                         TypeScript interfaces — single source of truth
│   │   ├── product.ts                 Product, Collection, StockStatus types
│   │   ├── collection.ts              CollectionSettings interface
│   │   └── siteContent.ts             SiteContent interface
│   │
│   └── lib/                           Helpers used by both frontend and backend
│       ├── products.ts                getAllProducts(), getProductBySlug(), etc.
│       └── whatsapp.ts                generateWhatsAppURL() for checkout + contact
│
│ ════════════════════════════════════════════
│  ZONE 5 — SCRIPTS (one-time utilities)
│ ════════════════════════════════════════════
│
├── scripts/
│   ├── seed-products.ts               Populates MongoDB with product catalog
│   ├── seed-site-data.ts              Populates collection tiers and site content
│   └── verify-backend.ts              Tests all API routes and auth barriers
│
│ ════════════════════════════════════════════
│  STATIC ASSETS (stays at root)
│ ════════════════════════════════════════════
│
├── public/
│   ├── products/                      Product photography (80+ images)
│   └── editorial/                     Hero and craftsmanship editorial photos
│
│ ════════════════════════════════════════════
│  DOCUMENTATION
│ ════════════════════════════════════════════
│
├── docs/
│   ├── ARCHITECTURE.md                This file (final source of truth)
│   ├── MASTER_BLUEPRINT.md            Full feature and page specs
│   ├── COMPONENTS_REFERENCE.md        Component props and usage
│   ├── DESIGN.md                      Noir Atelier design system (v2.1)
│   └── archive/                       Old/superseded docs
│
│ ════════════════════════════════════════════
│  CONFIG (all at root — tooling requires this)
│ ════════════════════════════════════════════
│
├── .env.local                         Secrets (never committed to git)
├── .env.example                       Key names with blank values (committed)
├── next.config.ts                     Next.js config (image domains, ISR)
├── tailwind.config.ts                 Color tokens, typography, content paths
├── tsconfig.json                      Path aliases and TypeScript settings
├── postcss.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

---

## Import rules — what can import from where

```
frontend/   → can import from: shared/
             cannot import from: backend/

backend/    → can import from: shared/
             cannot import from: frontend/

shared/     → cannot import from: frontend/ or backend/
             (shared is the foundation — it has no dependencies on either side)

app/        → can import from: frontend/, backend/, shared/
             (app/ is the bridge — pages connect the two sides)
```

Visualized:

```
shared/          ← foundation, no dependencies
   ↑       ↑
frontend/  backend/    ← each imports from shared only
   ↑       ↑
      app/             ← imports from both, connects everything
```

---

## Path aliases — `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/frontend/*":  ["./frontend/*"],
      "@/backend/*":   ["./backend/*"],
      "@/shared/*":    ["./shared/*"],
      "@/*":           ["./*"]
    }
  }
}
```

How imports look in practice:

```typescript
// In app/shop/page.tsx (a customer page)
import ProductGrid from "@/frontend/components/shop/ProductGrid";
import { getAllProducts } from "@/shared/lib/products";

// In app/api/products/route.ts (an API route)
import ProductModel from "@/backend/models/Product";
import { getAdminSession } from "@/backend/lib/auth";
import { productSchema } from "@/backend/lib/validators";
import type { Product } from "@/shared/types/product";

// In app/admin/products/page.tsx (admin page)
import ProductList from "@/backend/admin-components/ProductList";

// In frontend/components/cart/CartDrawer.tsx (customer component)
import { useCartStore } from "@/frontend/store/cartStore";
import type { Product } from "@/shared/types/product";
```

---

## Tailwind config — required update after restructure

```typescript
// tailwind.config.ts
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/**/*.{js,ts,jsx,tsx,mdx}",
    "./backend/admin-components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // rest unchanged
};
```

---

## Environment variables — `.env.local`

```
MONGODB_URI=
JWT_SECRET=
ADMIN_PASSWORD_HASH=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_SITE_URL=
```

---

## The one question that tells you where any file belongs

> "Does the customer ever see or trigger this directly?"

| Answer | Zone |
|---|---|
| Yes — it's a page, UI component, or cart logic | `frontend/` |
| No — it's database, auth, or admin UI | `backend/` |
| Both sides need it — it's a type or query function | `shared/` |
| Next.js needs to route to it | `app/` |
| I run it once in the terminal | `scripts/` |
