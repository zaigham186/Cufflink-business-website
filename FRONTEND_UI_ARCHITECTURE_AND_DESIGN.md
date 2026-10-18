# CuffKings — Frontend UI Architecture, Design System & Page Blueprint

> **Single Source of Truth** for the CuffKings frontend user interface, design system, component hierarchy, animations, and page-by-page specifications.  
> Use this document as your comprehensive guide to understand, audit, maintain, and customize any aspect of the visual storefront.

---

## Table of Contents
1. [Architectural Overview & Tech Stack](#1-architectural-overview--tech-stack)
2. [Design System & Aesthetic Tokens (The Noir Atelier DNA)](#2-design-system--aesthetic-tokens-the-noir-atelier-dna)
   - [2.1 Color Palette & Tokens](#21-color-palette--tokens)
   - [2.2 Typography Stack & Fluid Scales](#22-typography-stack--fluid-scales)
   - [2.3 Elevation, Borders, Radii & Hairlines](#23-elevation-borders-radii--hairlines)
   - [2.4 Motion, Easing & GSAP Timelines](#24-motion-easing--gsap-timelines)
3. [Global Shell & Core Layout Architecture](#3-global-shell--core-layout-architecture)
   - [3.1 Root Layout (`app/layout.tsx`)](#31-root-layout-applayouttsx)
   - [3.2 Storefront Chrome (`StorefrontChrome.tsx`)](#32-storefront-chrome-storefrontchrometsx)
   - [3.3 Navigation Suite (`Navbar.tsx`)](#33-navigation-suite-navbartsx)
   - [3.4 Storefront Footer (`Footer.tsx`)](#34-storefront-footer-footertsx)
   - [3.5 Dynamic Favicon & Crest (`app/icon.tsx`)](#35-dynamic-favicon--crest-appicontsx)
4. [Complete Page-by-Page Design & Component Breakdown](#4-complete-page-by-page-design--component-breakdown)
   - [4.1 Page 1: Homepage (`/`)](#41-page-1-homepage-)
   - [4.2 Page 2: Shop Catalog (`/shop`)](#42-page-2-shop-catalog-shop)
   - [4.3 Page 3: Product Detail Page (`/product/[slug]`)](#43-page-3-product-detail-page-productslug)
   - [4.4 Page 4: Shopping Cart & Slide-Over Drawer (`/cart` & `CartDrawer.tsx`)](#44-page-4-shopping-cart--slide-over-drawer-cart--cartdrawertsx)
   - [4.5 Page 5: Checkout & Order Concierge (`/checkout`)](#45-page-5-checkout--order-concierge-checkout)
   - [4.6 Page 6: About the Atelier (`/about`)](#46-page-6-about-the-atelier-about)
   - [4.7 Page 7: Contact & Client Services (`/contact`)](#47-page-7-contact--client-services-contact)
   - [4.8 Page 8: Utility & Error Screens (404, 500, Admin Login)](#48-page-8-utility--error-screens-404-500-admin-login)
5. [Client State Management & Data Architecture](#5-client-state-management--data-architecture)
   - [5.1 Zustand Shopping Cart Store](#51-zustand-shopping-cart-store)
   - [5.2 WhatsApp Order Message Engine](#52-whatsapp-order-message-engine)
6. [Reusable UI & Motion Component Library](#6-reusable-ui--motion-component-library)
7. [Comprehensive Customization Guide (How to Change Everything)](#7-comprehensive-customization-guide-how-to-change-everything)
   - [7.1 Modifying Colors & Themes](#71-modifying-colors--themes)
   - [7.2 Changing Fonts & Typography](#72-changing-fonts--typography)
   - [7.3 Updating Logos, Crests & Brand Imagery](#73-updating-logos-crests--brand-imagery)
   - [7.4 Adding or Editing Navigation Links](#74-adding-or-editing-navigation-links)
   - [7.5 Editing Hero Banners & Copy](#75-editing-hero-banners--copy)
   - [7.6 Modifying Business WhatsApp & Contact Details](#76-modifying-business-whatsapp--contact-details)
8. [File-to-Feature Cross Reference Directory](#8-file-to-feature-cross-reference-directory)

---

## 1. Architectural Overview & Tech Stack

CuffKings is built with a high-performance **Next.js 15 (App Router)** frontend paired with **Tailwind CSS**, **GSAP (GreenSock Animation Platform)**, and **React 19**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS 15 APP ROUTER                           │
├────────────────────────────────────────────────────────────────────────┤
│  Root Layout (`app/layout.tsx`)                                         │
│  ├── Google Fonts Injection (`Playfair Display` + `Inter`)             │
│  ├── Global Styles (`app/globals.css`)                                 │
│  └── Storefront Chrome (`StorefrontChrome.tsx`)                        │
│      ├── Header & Dynamic Navbar (`Navbar.tsx`)                        │
│      │   ├── Desktop Mega Menu + Brand Insignia                        │
│      │   ├── Mobile Slide-Over Drawer + Quick Navigation               │
│      │   └── Currency Selector & Cart Trigger Badge                    │
│      ├── Active Page Viewport (`app/(storefront)/*`)                   │
│      │   ├── Server-Side Hydration (ISR / SSR)                         │
│      │   └── GSAP ScrollTrigger Entrance Animations                    │
│      ├── Cart Slide-Over Drawer (`CartDrawer.tsx`)                     │
│      │   └── Zustand LocalStorage Persistent State                     │
│      └── Bespoke Atelier Footer (`Footer.tsx`)                         │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Engineering Decisions:
1. **Server-First Rendering**: Every catalog and content page (`/`, `/shop`, `/product/[slug]`, `/about`, `/contact`) leverages **ISR (Incremental Static Regeneration)** with `revalidate = 60`, ensuring instant page loads with fresh catalog stock.
2. **Double-State Cart**: The shopping cart uses Zustand with `localStorage` synchronization (`cuffkings-cart`) and client-side hydration guards to avoid hydration mismatches.
3. **Motion without Layout Shifts**: GSAP and CSS transforms (`will-change-transform`, GPU-accelerated translate/scale) power smooth entrance animations without causing layout recalculations.
4. **Zero Heavy UI Component Libraries**: Uses bespoke Vanilla Tailwind CSS components designed specifically for luxury jewelry aesthetics rather than generic component kits.

---

## 2. Design System & Aesthetic Tokens (The Noir Atelier DNA)

The visual identity of CuffKings is styled around the **"Noir Atelier"** aesthetic: high-contrast dark obsidian backgrounds, warm brushed porcelain surfaces, hand-polished champagne brass hairlines, and restrained typography.

### 2.1 Color Palette & Tokens

All color tokens are configured in [`tailwind.config.ts`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/tailwind.config.ts):

| Token Name | Hex Code | Purpose & Application |
|---|---|---|
| `obsidian` | `#101110` | Primary dark background for Hero, Navbar, Footer, and luxury dark sections. |
| `porcelain` | `#F3EFE7` | Editorial light background for Shop, Product Detail, and Form fields. Warm paper tone. |
| `champagne-brass` | `#C6A15B` | Brand signature metallic accent: borders, active links, crest badges, and primary buttons. |
| `champagne-brass-light` | `#D4B373` | Hover states, glowing accents, and high-emphasis focal elements. |
| `champagne-brass-dark` | `#A88440` | Deep metallic borders, muted badge borders, and subdued icon strokes. |
| `warm-charcoal` | `#211D19` | Deep charcoal for typography on porcelain light backgrounds. High legibility without harsh black. |
| `deep-petrol` | `#203A3A` | Rich emerald-petrol hue for order confirmation cards, packaging highlights, and contrast badges. |
| `deep-wine` | `#641F2B` | Velvet burgundy used for error boundaries, out-of-stock badges, and sale callouts. |

#### Semantic Class Usage:
- **Dark Sections**: `bg-obsidian text-porcelain`
- **Light Editorial Sections**: `bg-porcelain text-warm-charcoal`
- **Luxury Hairlines**: `border-champagne-brass/20` to `border-champagne-brass/40`
- **Subdued Text on Dark**: `text-porcelain/70` or `text-porcelain/50`
- **Subdued Text on Light**: `text-warm-charcoal/70` or `text-warm-charcoal/50`

---

### 2.2 Typography Stack & Fluid Scales

The typography pairs a timeless, high-contrast serif typeface for headlines with a clean, geometric sans-serif for interface elements and specifications.

#### Font Families
- **Display Serif**: `Playfair Display` (Google Font loaded via Next.js `next/font/google`, variable `--font-playfair`).
  - Fallback: `"Georgia", serif`
  - Usage: `font-display` — Main headlines, brand wordmarks, collection names, price figures, and pull quotes.
- **Interface Sans**: `Inter` (Google Font loaded via `next/font/google`, variable `--font-inter`).
  - Fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - Usage: `font-sans` — Navigation menus, product filters, body paragraphs, button text, and forms.
- **Numbers & SKUs**: `font-mono` / tabular numerals for SKUs, order reference IDs, and technical dimensions.

#### Fluid Typography Scales (`tailwind.config.ts`)
```css
display:  clamp(3.5rem, 8vw, 8.5rem)   /* Line-height: 1.0 */
h1:       clamp(3.0rem, 6vw, 6.5rem)   /* Line-height: 1.1 */
h2:       clamp(2.25rem, 4vw, 4.5rem)  /* Line-height: 1.2 */
h3:       clamp(1.5rem, 2.5vw, 2.5rem) /* Line-height: 1.3 */
body:     clamp(0.95rem, 1vw, 1.1rem)  /* Line-height: 1.6 */
```

---

### 2.3 Elevation, Borders, Radii & Hairlines

- **Corner Radii**:
  - `rounded-sharp` (`0px`): Precision jewelry aesthetic for buttons, cards, filter bars, and tables.
  - `rounded-minimal` (`2px`): Subtle softening for input fields and image containers.
  - `rounded-md` (`6px`): Logo containers and badges.
  - `rounded-full`: Floating pills and status dots.
- **Borders & Hairlines**:
  - Single-pixel precision borders (`border`, `border-t`, `border-b`) with opacity control (`border-champagne-brass/25`).
  - Never use heavy drop shadows on cards; use `border border-champagne-brass/20` accompanied by ambient light diffusion (`shadow-[0_0_25px_rgba(198,161,91,0.15)]`).

---

### 2.4 Motion, Easing & GSAP Timelines

- **Timing Function**:
  - `transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]` (`luxury-out`): Smooth deceleration curve standard for high-end luxury websites.
- **Motion Components**:
  - `Reveal`: Scroll-triggered translation and opacity reveal (`direction="up" | "down" | "left" | "right"`).
  - `ImageReveal`: Clip-path curtain reveal with image zoom.
  - `Magnetic`: Smooth cursor attraction on hover for buttons and CTAs.
  - `BrandTicker`: Infinite continuous horizontal translation.

---

## 3. Global Shell & Core Layout Architecture

The storefront is structured around a unified shell defined across `app/layout.tsx`, `components/storefront/layout/StorefrontChrome.tsx`, `Navbar.tsx`, and `Footer.tsx`.

### 3.1 Root Layout (`app/layout.tsx`)
- **Metadata**: Configures title templates (`%s | CuffKings`), Pakistani formalwear keywords, openGraph tags, and canonical URLs.
- **Viewport**: Enforces `themeColor: "#101110"` to style mobile browser navigation bars into sleek obsidian black.
- **Font Variables**: Injects `--font-playfair` and `--font-inter` into `<html>`.
- **Children Placement**: Renders `StorefrontChrome` which conditionally hides public navigation on `/admin` routes.

---

### 3.2 Storefront Chrome (`StorefrontChrome.tsx`)
```tsx
// Detects pathname:
// If pathname.startsWith("/admin") -> renders {children} without public header/footer
// Else -> renders Navbar + {children} + CartDrawer + Footer
```

---

### 3.3 Navigation Suite (`Navbar.tsx`)

File: [`components/storefront/layout/Navbar.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/storefront/layout/Navbar.tsx)

#### Key Visual Elements:
1. **Top Announcement Bar**:
   - Background: `bg-obsidian-deep/90` with hairline brass bottom border.
   - Content: Complimentary delivery across Pakistan on orders over Rs. 3,000 + WhatsApp concierge availability badge.
2. **Main Navigation Bar**:
   - Sticky positioning (`sticky top-0 z-40`) with frosted glass background (`backdrop-blur-md bg-obsidian/90`).
   - **Left**: Royal Crown Monogram Crest (`/logo.png`, 36px) paired with serif wordmark:
     ```tsx
     <Link href="/" className="flex items-center gap-3 group">
       <div className="relative w-9 h-9 rounded-md overflow-hidden bg-obsidian-deep border border-champagne-brass/40 p-0.5">
         <Image src="/logo.png" alt="CuffKings Royal Crown Monogram" fill className="object-contain" priority />
       </div>
       <div>
         <span className="block font-serif text-base tracking-[0.25em] text-porcelain group-hover:text-champagne-brass">CUFFKINGS</span>
         <span className="block text-[8.5px] tracking-[0.35em] uppercase text-champagne-brass/75">Atelier</span>
       </div>
     </Link>
     ```
   - **Center (Desktop Navigation Links)**:
     - All Cufflinks (`/shop`)
     - Classical Collection (`/shop?category=classical`)
     - Signature Collection (`/shop?category=signature`)
     - Premium Collection (`/shop?category=premium`)
     - About Atelier (`/about`)
     - Contact (`/contact`)
     - Active link state: Underline indicator in `champagne-brass` with subtle transition.
   - **Right (Utility Actions)**:
     - Search toggle
     - Currency indicator (`PKR / Rs.`)
     - Shopping Bag trigger with live item count badge (hydrated from Zustand cart store).
3. **Mobile Menu Drawer**:
   - Slide-in panel from left (`translate-x-0` on open, `-translate-x-full` on close) with backdrop blur.
   - Full hierarchy of collection links with item counts.
   - Direct WhatsApp Concierge CTA button.

---

### 3.4 Storefront Footer (`Footer.tsx`)

File: [`components/storefront/layout/Footer.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/storefront/layout/Footer.tsx)

#### 4-Column Responsive Layout:
1. **Brand Column**:
   - Royal Crest emblem (`40px`)
   - `CUFFKINGS — Haute Joaillerie`
   - Mission statement: *"Cufflinks built around polished metal, considered patterns and the details of formal dressing."*
2. **Shop Categories**:
   - All Cufflinks, Classical, Signature, Premium, Gift Sets.
3. **Atelier & Service**:
   - Our Story & Craftsmanship (`/about`), Contact & Concierge (`/contact`), Order Tracking via WhatsApp, Care Guide.
4. **Client Concierge & Direct WhatsApp**:
   - Quick WhatsApp link pre-filled with client inquiry.
   - Cash on Delivery available across all cities in Pakistan (Peshawar, Lahore, Karachi, Islamabad, etc.).
- **Sub-Footer**:
   - Copyright notice, Designed for Gentlemen of Distinction, All Rights Reserved.

---

### 3.5 Dynamic Favicon & Crest (`app/icon.tsx`)

File: [`app/icon.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/icon.tsx)
- Dynamically reads `public/logo.png` via Node `fs` and outputs a 32x32 pixel PNG response using Next.js `ImageResponse`.
- Browser tabs, mobile bookmarks, and pinned shortcuts render the golden crown monogram emblem natively.

---

## 4. Complete Page-by-Page Design & Component Breakdown

---

### 4.1 Page 1: Homepage (`/`)

Route: `app/(storefront)/page.tsx`  
Background: `bg-obsidian` / `bg-porcelain` alternating rhythmic blocks.

```
┌────────────────────────────────────────────────────────────────────────┐
│ 01. Hero Noir (Ken Burns Crossfade Carousel + Monogram Insignia Pill)  │
├────────────────────────────────────────────────────────────────────────┤
│ 02. Brand Ticker (Infinite Marquee of Atelier Values)                  │
├────────────────────────────────────────────────────────────────────────┤
│ 03. Collection Intro (Editorial Headline + Metric Counters + Brass Line│
├────────────────────────────────────────────────────────────────────────┤
│ 04. Category Grid (Classical, Signature, Premium Interactive Cards)    │
├────────────────────────────────────────────────────────────────────────┤
│ 05. Featured Collections Showcase (Multi-Category Tabs + Product Cards)│
├────────────────────────────────────────────────────────────────────────┤
│ 06. Brand Story (Peshawar Heritage + Full-Bleed Parallax Photography)  │
├────────────────────────────────────────────────────────────────────────┤
│ 07. Final CTA (Atmospheric Brass Glow + Action Buttons)                │
└────────────────────────────────────────────────────────────────────────┘
```

#### Detailed Component Specifications:

1. **`HeroNoir.tsx`** ([components/storefront/home/HeroNoir.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/storefront/home/HeroNoir.tsx)):
   - **Ken Burns Image Slideshow**: Cycles smoothly through high-resolution editorial photography of pavé crystal and classic brass cufflinks (`KEN_BURNS_SLIDES`).
   - **Vignette Overlay**: Double-gradient overlay (`bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/75`) ensuring text contrast.
   - **Monogram Pill**: Floating badge with `logo.png` (28px), `CUFFKINGS • Haute Joaillerie`.
   - **Hero Headline**: Fluid clamp display typography: *"Cufflinks, finished the way formalwear demands."*
   - **Action Group**:
     - Primary button: *"Explore Collections"* -> scrolls to `/shop`.
     - Secondary button: *"The Peshawar Atelier"* -> navigates to `/about`.
2. **`BrandTicker.tsx`**:
   - Continuous horizontal CSS marquee in champagne brass typography:  
     `SOLID JEWELER'S BRASS • COLD-CURED VITREOUS ENAMEL • HAND-POLISHED IN PESHAWAR • SWIVEL TOGGLE TENSION • CASH ON DELIVERY PAKISTAN-WIDE`
3. **`CollectionIntro.tsx`**:
   - Pull-quote statement introducing the three collections.
   - Counters for: 3 Signature Collections, Hand-Inspected Quality, 100% Cash on Delivery Coverage.
4. **`CategoryGrid.tsx`**:
   - 3-column cards for **Classical** (Rs. 700 - 1,000), **Signature** (Rs. 1,000 - 1,500), and **Premium** (Rs. 1,500 - 2,500).
   - Mouse hover expands image scale with subtle border lighting.
5. **`FeaturedCollectionsShowcase.tsx`**:
   - Interactive category tabs (All, Classical, Signature, Premium).
   - Renders interactive `ProductCard` components with live prices, quick-view, and stock states.
6. **`BrandStory.tsx`**:
   - Editorial story of Peshawar craft heritage, hand-soldering of toggles, and multi-stage polishing.
7. **`FinalCTA.tsx`**:
   - Full-width dark obsidian callout with ambient radial gold glow, driving conversions to the shop or direct WhatsApp inquiry.

---

### 4.2 Page 2: Shop Catalog (`/shop`)

Route: `app/(storefront)/shop/page.tsx`  
Background: `bg-porcelain` (warm paper tone for true color product rendering).

#### Layout Structure:
1. **`ShopHeader.tsx`**:
   - Editorial heading: *"The Complete Collection"*
   - Subtitle detailing the range from understated daily business bar cufflinks to regal wedding stones.
2. **`ProductGrid.tsx`**:
   - **Filter & Controls Bar**:
     - Category pills: `All`, `Classical`, `Signature`, `Premium`.
     - Price sort dropdown: `Featured`, `Price: Low to High`, `Price: High to Low`, `Newest First`.
     - Material & finish filters (Gold-tone, Silver-tone, Rhodium, Enamel).
     - Live keyword search bar.
   - **Responsive Product Grid**:
     - Mobile: 1 column (`grid-cols-1`) with large touch targets.
     - Tablet: 2 columns (`sm:grid-cols-2`).
     - Desktop: 3 to 4 columns (`lg:grid-cols-3 xl:grid-cols-4`).
3. **`ProductCard.tsx`**:
   - Fixed aspect ratio `aspect-[4/3]` or `aspect-square` with `bg-[#F8F6F2]` backing.
   - Image zoom effect on hover (`scale-105 transition-transform duration-500`).
   - Category tag in small uppercase brass tracking.
   - Product Title in `Playfair Display`.
   - Price in `Rs. X,XXX` format.
   - Stock indicators: *"In Stock"* (subtle green), *"Only X Remaining"* (amber), *"Sold Out"* (deep wine).
   - **Dedicated Add to Cart Action**: Permanently visible in the card body across both desktop and mobile (no hover required). 1-click adds item to bag, opens the cart slide-over drawer, and confirms with "Added to Cart ✓".

---

### 4.3 Page 3: Product Detail Page (`/product/[slug]`)

Route: `app/(storefront)/product/[slug]/page.tsx`  
Background: `bg-porcelain text-warm-charcoal`.  
Rendering: Static with ISR (`revalidate = 60`) + `generateStaticParams()`.

#### 60/40 Split Screen Architecture:
```
┌───────────────────────────────────────┬──────────────────────────────────────┐
│ LEFT COLUMN (~60% / 7 COLS)           │ RIGHT COLUMN (~40% / 5 COLS)         │
├───────────────────────────────────────┼──────────────────────────────────────┤
│ 1. Breadcrumb Navigation              │ 1. Product Title & Collection Badge  │
│ 2. High-Res Primary Image Viewport    │ 2. Price (PKR) & Strikethrough Price │
│ 3. Interactive Multi-Angle Thumbnails │ 3. Stock Availability Badge          │
│ 4. Video Demonstrator (if available)  │ 4. Editorial Narrative Description   │
│ 5. Zoom & Lightbox Inspection Modal   │ 5. Technical Specifications Table:   │
│                                       │    - Material (Jeweler's Brass, etc.)│
│                                       │    - Finish (Mirror polish, Satin)   │
│                                       │    - Color & Enamel Tone             │
│                                       │    - Closure (Swivel Toggle)         │
│                                       │    - Dimensions & Weight             │
│                                       │    - Origin: Peshawar, Pakistan      │
│                                       │ 6. Quantity Stepper Counter          │
│                                       │ 7. "Add to Bag" Action Button        │
│                                       │ 8. Direct WhatsApp Express Order Btn │
│                                       │ 9. Shipping & Delivery Notice (COD)  │
└───────────────────────────────────────┴──────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ RELATED PIECES CAROUSEL (3 Curated Recommendations from the same collection) │
└──────────────────────────────────────────────────────────────────────────────┘
```

#### Core Components:
- **`ImageGallery.tsx`**: Manages primary image selection, thumbnail strip navigation, and fullscreen image modal.
- **`AddToCartButton.tsx`**: Handles quantity counter state, triggers Zustand cart update, shows temporary confirmation toast, and provides direct WhatsApp ordering.

---

### 4.4 Page 4: Shopping Cart & Slide-Over Drawer (`/cart` & `CartDrawer.tsx`)

CuffKings supports **both** a global slide-over drawer and a dedicated `/cart` full page.

#### 1. Global Slide-Over Drawer (`CartDrawer.tsx`):
- Accessible from any page via the bag icon in `Navbar.tsx`.
- Slide-over transition from the right (`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-obsidian border-l border-champagne-brass/25`).
- Backdrop click dismisses drawer.
- **Free Delivery Progress Meter**: Dynamically calculates how much more is needed to unlock free shipping across Pakistan (Threshold: Rs. 3,000).

#### 2. Cart Page (`/cart`):
- Full-width table layout for desktop, stacked cards for mobile.
- `CartItem.tsx`: Thumbnail, item title, unit price, quantity increment/decrement (`- / +`), line total, remove item button.
- `CartSummary.tsx`: Subtotal, calculated delivery fee (Free or Rs. 200), total payable amount.
- Direct CTA: *"Proceed to Checkout"*.

---

### 4.5 Page 5: Checkout & Order Concierge (`/checkout`)

Route: `app/(storefront)/checkout/page.tsx`  
Component: `CheckoutForm.tsx`

#### Two Distinct Views:

#### View A: The Checkout Form
- **Customer Information**:
  - Full Name (`name`)
  - WhatsApp Phone Number (`phone`) with automatic Pakistani phone validation (e.g. `0371 9145871` or `+92 371 9145871`).
  - Street Address, House/Office details (`address`).
  - City dropdown with common Pakistani cities (`Peshawar`, `Lahore`, `Islamabad`, `Karachi`, `Rawalpindi`, etc.).
- **Payment Method Selection**:
  - Cash on Delivery (COD) — *Recommended & Most Popular*
  - Direct Bank Transfer / Raast
  - EasyPaisa / JazzCash
- **Order Notes**: Optional tailoring or gift message notes.
- **Order Summary Sidebar**: Live summary of selected cufflinks, subtotal, and total.

#### View B: Order Confirmed Concierge Screen (`preparedOrder`)
Upon submission:
1. The order is securely persisted in the database via `POST /api/orders`.
2. A unique reference code is issued (e.g. `CK-87291`).
3. The UI seamlessly transitions into the **Atelier Confirmation Card**:
   - **Royal Crown Monogram Crest** ([logo.png](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/public/logo.png), 64px) with subtle gold halo.
   - Order Reference `#CK-XXXXX`.
   - **"Open WhatsApp to Finalize" Button**: Prepares an exact order message and launches WhatsApp directly with one tap.
   - **"Copy Order Text" Button**: Fallback button to copy the order summary to the clipboard if browser popup blockers prevent direct WhatsApp redirect.
   - Delivery expectations: 2–3 business days via TCS / Leopards Courier.

---

### 4.6 Page 6: About the Atelier (`/about`)

Route: `app/(storefront)/about/page.tsx`  
Background: Alternating dark obsidian and warm porcelain.

#### Sections:
1. **Header Block**:
   - Royal Crown Monogram emblem paired with `CUFFKINGS ATELIER`.
   - Headline: *"The detail changes everything."*
   - Philosophy of formal dressing accessories handcrafted in Peshawar.
2. **Full-Bleed Editorial Banner**:
   - Photography of craftsman filing surfaces and inspecting swivel bars.
3. **Narrative & Peshawar Heritage**:
   - Why Peshawar has historically been the epicenter of metalwork and jeweler's brass artistry in Northern Pakistan.
4. **`CollectionExplainer.tsx`**:
   - Comprehensive breakdown of all 3 collections:
     - **Classical**: Clean geometry, mirror brass, understated daily formalwear.
     - **Signature**: Hand-applied enamel, nautical crests, textured weaves.
     - **Premium**: Pavé cubic zirconia, beveled edges, heirloom wedding wear.
5. **Quality Commitments**:
   - Solid Jeweler's Brass (no hollow stampings).
   - Precision Toggle Springs (tension guaranteed).
   - High-grade plating (tarnish-resistant lacquer coats).

---

### 4.7 Page 7: Contact & Client Services (`/contact`)

Route: `app/(storefront)/contact/page.tsx`

#### Sections:
1. **`ContactHero.tsx`**:
   - Centered Royal Crown Monogram badge.
   - Animated brass divider line.
   - Display title: *"Get in touch"*.
2. **`ContactInquiryForm.tsx`**:
   - Client inquiry form allowing direct customer questions regarding custom orders, wedding party bulk sets, or courier tracking.
3. **`ContactChannels.tsx`**:
   - **WhatsApp Concierge**: `+92 371 9145871` (Active 10 AM - 10 PM PKT).
   - **Studio Address**: Peshawar, Khyber Pakhtunkhwa, Pakistan.
   - **Email**: `concierge@cuffkings.pk`.
4. **`ContactFAQ.tsx`**:
   - Interactive accordion answering frequent buyer questions:
     - Delivery duration (24-48h for Peshawar/Islamabad, 48-72h for Lahore/Karachi).
     - Cash on Delivery policies.
     - Damaged in transit exchange guarantee.

---

### 4.8 Page 8: Utility & Error Screens (404, 500, Admin Login)

1. **404 Page (`app/not-found.tsx`)**:
   - Royal Monogram badge in 64px rounded card.
   - Champagne brass `404` indicator.
   - *"Page not found — The piece or page you requested cannot be located."*
   - Action buttons: *"Return home"* and *"Explore collection"*.
2. **Error Boundary (`app/error.tsx`)**:
   - Centered Royal Monogram badge.
   - *"Atelier Notice — Something unexpected occurred."*
   - Magnetic *"Try again"* retry button.
3. **Admin Login Portal (`app/admin/login/page.tsx`)**:
   - Floating dark obsidian card with ambient gold glow.
   - Centered 64px Royal Crown Monogram emblem.
   - Passcode input with Show/Hide toggle.
   - Authenticates against `/api/admin-login`.

---

## 5. Client State Management & Data Architecture

---

### 5.1 Zustand Shopping Cart Store

File: [`store/cartStore.ts`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/store/cartStore.ts)

```typescript
interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  material?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}
```

#### Persistence:
- Synced to browser `localStorage` under key `"cuffkings-cart"`.
- Uses `skipHydration: true` to prevent server/client initial render divergence.

---

### 5.2 WhatsApp Order Message Engine

File: [`lib/client/whatsapp.ts`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/lib/client/whatsapp.ts)

Constructs the standardized WhatsApp order message:
```text
*NEW ORDER — CUFFKINGS ATELIER*
Order ID: #CK-89104
Customer: Muhammad Ali
Phone: 0300 1234567
Address: House 12, Street 4, Hayatabad, Peshawar
Payment: Cash on Delivery (COD)

*ITEMS:*
1. Classical Deep Noir Square Cufflinks (Qty: 1) — Rs. 770
2. Signature Imperial Gold Laurel (Qty: 1) — Rs. 1,380

*TOTAL PAYABLE:* Rs. 2,150
(Free Delivery Applied)
```

---

## 6. Reusable UI & Motion Component Library

| Component | Path | Description & Usage |
|---|---|---|
| `Button` | `components/ui/Button.tsx` | Luxury button supporting `variant="primary" \| "secondary" \| "outline" \| "ghost"`. |
| `BrassLine` | `components/ui/BrassLine.tsx` | Single-pixel hairline separator in `champagne-brass/25`. |
| `Badge` | `components/ui/Badge.tsx` | Category, stock, or status pill badge. |
| `Reveal` | `components/motion/Reveal.tsx` | GSAP / IntersectionObserver wrapper for scroll reveals. |
| `ImageReveal` | `components/motion/ImageReveal.tsx` | Smooth clip-path zoom curtain reveal for images. |
| `Magnetic` | `components/motion/Magnetic.tsx` | Cursor magnetic attraction on hover for buttons. |
| `CustomCursor` | `components/motion/CustomCursor.tsx` | Subtle trailing ring cursor on desktop viewports. |
| `BrandTicker` | `components/storefront/home/BrandTicker.tsx` | Infinite horizontal scrolling hallmark values bar. |

---

## 7. Comprehensive Customization Guide (How to Change Everything)

This section explains exactly where and how to modify the visual design of the frontend.

### 7.1 Modifying Colors & Themes
Open [`tailwind.config.ts`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/tailwind.config.ts) and locate the `colors` block:
```typescript
colors: {
  obsidian: "#101110",             // Change primary dark background
  "champagne-brass": "#C6A15B",    // Change primary gold accent color
  porcelain: "#F3EFE7",            // Change primary light background
  "warm-charcoal": "#211D19",      // Change dark text on light surfaces
  "deep-wine": "#641F2B",          // Change error & urgent badges
  "deep-petrol": "#203A3A",        // Change emerald contrast cards
}
```

---

### 7.2 Changing Fonts & Typography
1. Open [`app/layout.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/layout.tsx).
2. Change the imported Google Fonts in lines 6–18 (e.g. replace `Playfair_Display` with `Cinzel` or `Cormorant_Garamond`).
3. Update the font variable names in `tailwind.config.ts`:
```typescript
fontFamily: {
  display: ["var(--font-your-serif)", "Georgia", "serif"],
  sans: ["var(--font-your-sans)", "sans-serif"],
}
```

---

### 7.3 Updating Logos, Crests & Brand Imagery
1. **Primary Logo File**: Replace [`public/logo.png`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/public/logo.png) with your new image.
   - Recommended dimensions: 512x512px or 1024x1024px PNG with dark background.
2. The logo automatically propagates to:
   - Navbar brand header (`Navbar.tsx`)
   - Mobile menu drawer (`Navbar.tsx`)
   - Hero brand badge (`HeroNoir.tsx`)
   - Footer column (`Footer.tsx`)
   - Order confirmation seal (`CheckoutForm.tsx`)
   - Admin sidebar & Admin login (`AdminSidebar.tsx` & `admin/login/page.tsx`)
   - Browser tab icon & favicon (`app/icon.tsx`)
   - 404 & Error pages (`not-found.tsx` & `error.tsx`)

---

### 7.4 Adding or Editing Navigation Links
Open [`components/storefront/layout/Navbar.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/storefront/layout/Navbar.tsx):
- Look for the `NAV_LINKS` array around lines 25–40.
- Add or modify links:
```typescript
const NAV_LINKS = [
  { name: "All cufflinks", href: "/shop" },
  { name: "Classical", href: "/shop?category=classical" },
  { name: "Signature", href: "/shop?category=signature" },
  { name: "Premium", href: "/shop?category=premium" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
```

---

### 7.5 Editing Hero Banners & Copy
1. **Headline & Subtitle**: Can be updated live via the Admin Content Manager (`/admin/content`) or hardcoded defaults in [`components/storefront/home/HeroNoir.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/storefront/home/HeroNoir.tsx).
2. **Slideshow Images**: In `HeroNoir.tsx`, edit the `KEN_BURNS_SLIDES` array:
```typescript
const KEN_BURNS_SLIDES = [
  { src: "/products/premium 1.jpeg", alt: "Pavé Crystal Cufflinks" },
  { src: "/products/signature 1.jpeg", alt: "Sapphire Floral Cufflinks" },
  { src: "/products/classic 2.jpeg", alt: "Classical Gold Bar Cufflinks" },
];
```

---

### 7.6 Modifying Business WhatsApp & Contact Details
1. **Environment Variable**: Set in `.env.local`:
   ```env
   NEXT_PUBLIC_WHATSAPP_NUMBER=923719145871
   ```
2. **Fallback Constants**: In [`lib/constants/config.ts`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/lib/constants/config.ts) and [`lib/client/whatsapp.ts`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/lib/client/whatsapp.ts).

---

## 8. File-to-Feature Cross Reference Directory

| UI Feature / Section | Primary Component File | Styling / Sub-components |
|---|---|---|
| **Global Theme & Colors** | `tailwind.config.ts` | `app/globals.css` |
| **Fonts & Metadata** | `app/layout.tsx` | `next/font/google` |
| **Desktop & Mobile Navbar** | `components/storefront/layout/Navbar.tsx` | `public/logo.png` |
| **Site Footer** | `components/storefront/layout/Footer.tsx` | `components/ui/BrassLine.tsx` |
| **Hero Noir Section** | `components/storefront/home/HeroNoir.tsx` | `KEN_BURNS_SLIDES` |
| **Brand Ticker (Marquee)** | `components/storefront/home/BrandTicker.tsx` | `components/motion/Marquee.tsx` |
| **Collection Showcase** | `components/storefront/home/FeaturedCollectionsShowcase.tsx` | `ProductCard.tsx` |
| **Catalog / Shop Page** | `app/(storefront)/shop/page.tsx` | `ProductGrid.tsx`, `ShopHeader.tsx` |
| **Product Card** | `components/storefront/shop/ProductCard.tsx` | `components/ui/Badge.tsx` |
| **Product Detail Page** | `app/(storefront)/product/[slug]/page.tsx` | `ImageGallery.tsx`, `AddToCartButton.tsx` |
| **Cart Slide-Over Drawer** | `components/storefront/cart/CartDrawer.tsx` | `store/cartStore.ts` |
| **Cart Page** | `app/(storefront)/cart/page.tsx` | `CartItem.tsx`, `CartSummary.tsx` |
| **Checkout Flow** | `app/(storefront)/checkout/page.tsx` | `CheckoutForm.tsx`, `whatsapp.ts` |
| **Order Confirmation Card** | `components/storefront/checkout/CheckoutForm.tsx` | `public/logo.png` |
| **About Atelier Page** | `app/(storefront)/about/page.tsx` | `CollectionExplainer.tsx` |
| **Contact & Concierge** | `app/(storefront)/contact/page.tsx` | `ContactHero.tsx`, `ContactInquiryForm.tsx` |
| **404 Not Found Page** | `app/not-found.tsx` | `components/motion/Reveal.tsx` |
| **Global Error Boundary** | `app/error.tsx` | `components/motion/Magnetic.tsx` |
| **Browser Favicon** | `app/icon.tsx` | `next/og ImageResponse` |

---
*Document compiled and verified against the live CuffKings Next.js 15 codebase.*
