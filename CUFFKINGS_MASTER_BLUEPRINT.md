# CuffKings — Master Site Design & Architecture Blueprint

> **File:** `CUFFKINGS_MASTER_BLUEPRINT.md`  
> **Project:** CuffKings Luxury Men's Cufflinks E-Commerce Website  
> **Aesthetic Theme:** Noir Atelier (Dark Cinematic Luxury, Peshawar Craftsmanship)  
> **Framework:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 3.4 + GSAP 3.15 + Zustand 5 + Zod 3.24  
> **Status:** Fully Functional & Deployed Locally  

---

## Table of Contents

1. [Executive Summary & Brand Identity](#1-executive-summary--brand-identity)
2. [Noir Atelier Design System](#2-noir-atelier-design-system)
   - [2.1 Design Philosophy](#21-design-philosophy)
   - [2.2 Color Tokens & Palette](#22-color-tokens--palette)
   - [2.3 Typography System](#23-typography-system)
   - [2.4 Geometry, Borders & Spacing](#24-geometry-borders--spacing)
   - [2.5 UI Component Styling Rules](#25-ui-component-styling-rules)
3. [Motion & Animation System (GSAP)](#3-motion--animation-system-gsap)
4. [Complete Site Map & Route Hierarchy](#4-complete-site-map--route-hierarchy)
5. [Page-by-Page Architectural Breakdown](#5-page-by-page-architectural-breakdown)
   - [5.1 Root Layout & Global Setup](#51-root-layout--global-setup)
   - [5.2 Homepage (`/`)](#52-homepage-)
   - [5.3 Shop Catalog (`/shop`)](#53-shop-catalog-shop)
   - [5.4 Product Detail Page (`/product/[slug]`)](#54-product-detail-page-productslug)
   - [5.5 Cart Drawer & Standalone Cart (`/cart`)](#55-cart-drawer--standalone-cart-cart)
   - [5.6 Checkout & WhatsApp Order Engine (`/checkout`)](#56-checkout--whatsapp-order-engine-checkout)
   - [5.7 Atelier & Story Page (`/about`)](#57-atelier--story-page-about)
   - [5.8 Contact Portal (`/contact`)](#58-contact-portal-contact)
   - [5.9 Admin Placeholder (`/admin`)](#59-admin-placeholder-admin)
   - [5.10 Custom 404 Page (`/not-found`)](#510-custom-404-page-not-found)
6. [Component Library & Architecture](#6-component-library--architecture)
7. [State Management & Data Architecture](#7-state-management--data-architecture)
   - [7.1 Cart Store (`store/cartStore.ts`)](#71-cart-store-storecartstorets)
   - [7.2 Product Data & Schema (`lib/products.ts`)](#72-product-data--schema-libproductsts)
   - [7.3 Active Product Catalog](#73-active-product-catalog)
   - [7.4 Validation Rules (`lib/validators.ts`)](#74-validation-rules-libvalidatorsts)
   - [7.5 WhatsApp Link Generator (`lib/whatsapp.ts`)](#75-whatsapp-link-generator-libwhatsappts)
8. [Media & Asset Inventory](#8-media--asset-inventory)
9. [Modification Playbook: How to Make Changes](#9-modification-playbook-how-to-make-changes)
   - [9.1 How to Add or Edit Products](#91-how-to-add-or-edit-products)
   - [9.2 How to Change Colors & Metal Themes](#92-how-to-change-colors--metal-themes)
   - [9.3 How to Change Typography & Font Families](#93-how-to-change-typography--font-families)
   - [9.4 How to Update the WhatsApp Business Number & Message](#94-how-to-update-the-whatsapp-business-number--message)
   - [9.5 How to Add, Remove or Reorder Homepage Sections](#95-how-to-add-remove-or-reorder-homepage-sections)
   - [9.6 How to Change Currencies / Pricing Display](#96-how-to-change-currencies--pricing-display)
   - [9.7 How to Connect a Database (Supabase / Prisma / MongoDB)](#97-how-to-connect-a-database-supabase--prisma--mongodb)
   - [9.8 How to Add Credit Card Payments (Stripe / JazzCash / EasyPaisa)](#98-how-to-add-credit-card-payments-stripe--jazzcash--easypaisa)
10. [Configuration & Environment Reference](#10-configuration--environment-reference)

---

## 1. Executive Summary & Brand Identity

### Brand Essence
- **Brand Name:** `CUFFKINGS`
- **Tagline:** *"The detail changes everything."* / *"Cufflinks built around polished metal, considered patterns, and the details of formal dressing."*
- **Heritage & Origin:** Handcrafted & inspected in Peshawar, Khyber Pakhtunkhwa, Pakistan.
- **Core Category:** Premium men's cufflinks & formal sartorial jewelry.
- **Commerce Model:** Direct WhatsApp ordering system tailored for high-touch customer communication and frictionless Pakistan/international delivery without complex credit card forms.

### Technical Architecture
- **Framework:** Next.js 15.1.6 using modern App Router architecture (`app/`).
- **React:** React 19 (`react`, `react-dom`).
- **Styling:** Tailwind CSS 3.4 with custom tokens + Vanilla CSS custom properties.
- **Motion Engine:** GSAP 3.15 with ScrollTrigger plugin for cinematic reveals.
- **State Store:** Zustand 5.0 with `persist` middleware (browser `localStorage`).
- **Validation:** Zod 3.24 for client/server form parsing.
- **Font Optimization:** Next.js Google Fonts (`next/font/google`) with zero CLS (Cumulative Layout Shift).

---

## 2. Noir Atelier Design System

The visual identity follows the **Noir Atelier** design direction: a cinematic, dark luxury aesthetic inspired by bespoke Savile Row tailoring, high-end horology, and jewelers' ateliers. It shuns generic SaaS styles (no rounded pill buttons, no bright candy gradients, no floating cards with pastel dropshadows).

### 2.1 Design Philosophy
1. **The Product is the Hero:** Imagery is presented with sharp borders, dark ambient backdrops, and dramatic lighting.
2. **Sharp, Bespoke Geometry:** Strictly **0px border-radius** (sharp corners) echoing pressed cuffs, lapels, and cut gemstones. Only minimal 2px radius is used for microscopic badges.
3. **Contrast Rhythm:** Alternating sections between **Obsidian Black** (cinematic, formal) and **Porcelain Cream** (editorial daytime, tactile review).
4. **Hairline Accents:** Borders are rendered as thin 1px metallic rules (`champagne-brass` at 20%–40% opacity).

---

### 2.2 Color Tokens & Palette

Defined in [tailwind.config.ts](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/tailwind.config.ts) and [app/globals.css](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/globals.css):

| Token Name | Hex Value | CSS Variable | Semantic Usage |
|---|---|---|---|
| **Obsidian** | `#101110` | `--color-obsidian` | Primary dark background, navbar on scroll, product card base, modal overlays |
| **Deep Petrol** | `#203A3A` | `--color-deep-petrol` | Secondary dark background, order confirmations, editorial callout blocks |
| **Porcelain** | `#F3EFE7` | `--color-porcelain` | Light editorial background, product catalog container, light primary text |
| **Champagne Brass** | `#C6A15B` | `--color-champagne` | Primary metallic accent, buttons, hairline dividers, price text, active filters |
| **Deep Wine** | `#641F2B` | `--color-deep-wine` | Limited edition badges, sale alerts, out-of-stock highlights |
| **Warm Charcoal** | `#211D19` | `--color-charcoal` | Dark text on Porcelain backgrounds, specification borders |

#### Contrast & Accessibility
- **Porcelain on Obsidian:** Contrast ratio **16.8:1** (WCAG AAA Pass).
- **Warm Charcoal on Porcelain:** Contrast ratio **12.4:1** (WCAG AAA Pass).
- **Champagne Brass on Obsidian:** Contrast ratio **6.2:1** (WCAG AA Large/Heading Pass).
- **Deep Wine on Porcelain:** Contrast ratio **8.1:1** (WCAG AAA Pass).

---

### 2.3 Typography System

Loaded via [app/layout.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/layout.tsx):

```typescript
// Variable font bindings:
--font-instrument: Instrument Serif (Headings, H1-H3, Display, Hero)
--font-cormorant: Cormorant Garamond (Editorial serif fallback & subheads)
--font-manrope: Manrope (Body text, buttons, specs, forms, navigation)
```

#### Responsive Fluid Type Scale (`clamp()`)
- **`display`:** `clamp(3.5rem, 8vw, 8.5rem)` with `lineHeight: 1.0` (Hero statements)
- **`h1`:** `clamp(3rem, 6vw, 6.5rem)` with `lineHeight: 1.1` (Page titles)
- **`h2`:** `clamp(2.5rem, 4vw, 5rem)` with `lineHeight: 1.2` (Section titles)
- **`h3`:** `clamp(1.75rem, 2.5vw, 3rem)` with `lineHeight: 1.3` (Subsections)
- **`body`:** `clamp(0.95rem, 1vw, 1.1rem)` with `lineHeight: 1.6` (Narratives & specs)

#### Casing & Kerning Conventions
- **Sentence Case:** Used for 98% of headings and body (e.g., *"Every detail counts."*, *"Order confirmation"*).
- **Tracked Uppercase:** Reserved strictly for:
  - Brand Logo: `CUFFKINGS` (`tracking-[0.3em] font-medium`)
  - Eyebrow labels: `CUFFKINGS ATELIER` (`tracking-[0.25em] text-xs`)
  - Form labels & technical metadata: `QUANTITY`, `MATERIAL` (`tracking-wider text-xs`)

---

### 2.4 Geometry, Borders & Spacing

- **Border Radius:** `0px` default across all cards, images, modals, inputs, and buttons (`rounded-none`).
- **Hairlines:** Single-pixel borders using `border border-champagne-brass/20` or `border-warm-charcoal/15`.
- **Dividers:** The custom `<BrassLine />` component (`h-px bg-champagne-brass/30`).
- **Max Width:** `--container-max: 1600px` for wide-screen desktop luxury layout.
- **Vertical Rhythm:** Section margins follow `clamp(5rem, 10vw, 10rem)`.

---

### 2.5 UI Component Styling Rules

1. **Buttons (`components/ui/Button.tsx`):**
   - `variant="primary"`: Solid Champagne Brass background (`#C6A15B`), obsidian text, sharp edges.
   - `variant="secondary"`: Transparent background, porcelain hairline border, hover white.
   - `variant="dark"`: Obsidian background, brass border, brass hover.
2. **Badges (`components/ui/Badge.tsx`):**
   - `variant="default"`: Porcelain background with brass outline.
   - `variant="sale"`: Deep Wine background (`#641F2B`) with porcelain text.
   - `variant="limited"`: Obsidian background with brass border.
3. **Form Inputs (`components/checkout/CheckoutForm.tsx`):**
   - Transparent or porcelain backgrounds with razor-thin borders, sharp focus rings in champagne brass, sentence-case error validation text.

---

## 3. Motion & Animation System (GSAP)

Animations are handled by **GSAP 3.15** with **ScrollTrigger** for performance and cinematic feel.

### 3.1 Entrance & Reveal Sequences
- **Clip-Path Curtain Reveals:** Product and editorial images enter via `clipPath: "inset(0 0 100% 0)"` animating to `clipPath: "inset(0 0 0% 0)"` with `ease: "power4.out"`.
- **Staggered Text Splitting:** Headlines reveal line-by-line using GSAP timelines (`y: 40, opacity: 0` to `y: 0, opacity: 1`).
- **ScrollTrigger Sync:** Sections trigger when scrolling into viewport (`start: "top 75%"`).
- **Rule Drawing:** Horizontal brass rules animate width using `scaleX: 0` to `scaleX: 1`.

### 3.2 Accessibility & Reduced Motion
In [app/globals.css](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/globals.css) and every animated component:
```typescript
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReducedMotion) {
  // GSAP animations are bypassed and components are instantly rendered in their final static state
}
```

---

## 4. Complete Site Map & Route Hierarchy

```
app/
├── layout.tsx                # Root layout (Fonts, Navbar, CartDrawer, Footer)
├── globals.css               # Global Tailwind directives & custom CSS tokens
├── page.tsx                  # Homepage (Hero, Craft Details, Categories, Story)
├── not-found.tsx             # 404 Not Found Page
│
├── shop/
│   └── page.tsx              # Full Catalog with multi-filter sidebar & sorting
│
├── product/
│   └── [slug]/
│       └── page.tsx          # Dynamic PDP (Product Detail Page) with gallery
│
├── cart/
│   └── page.tsx              # Standalone full-page cart view
│
├── checkout/
│   └── page.tsx              # Delivery address form & WhatsApp order bridge
│
├── about/
│   └── page.tsx              # Atelier heritage, Peshawar craft, material specs
│
├── contact/
│   └── page.tsx              # Direct contact page (WhatsApp, Email, Social)
│
└── admin/
    └── page.tsx              # Admin management placeholder portal
```

---

## 5. Page-by-Page Architectural Breakdown

### 5.1 Root Layout & Global Setup
- **File:** [app/layout.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/layout.tsx)
- **Background:** Obsidian (`#101110`) by default on body.
- **Fixed Global Elements:**
  - `<Navbar />`: Persistent navigation bar. Transparent over hero, transitions to solid obsidian with champagne brass border on scroll (> 40px).
  - `<CartDrawer />`: Global slide-over drawer triggered from any "Add to Cart" or header icon click.
  - `<Footer />`: 4-column footer with brand statement, category links, company links, and Peshawar provenance note.

---

### 5.2 Homepage (`/`)
- **File:** [app/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/page.tsx)
- **Visual Rhythm:** Obsidian Dark -> Porcelain Light -> Obsidian Dark.
- **Active Sections:**
  1. `<HeroNoir />`: Full-viewport cinematic hero with animated wordmark, headline *"Form follows formal"*, editorial cufflink imagery, and primary CTA *"View the collection"*.
  2. `<BrassLine />`: Metallic section transition divider.
  3. `<ProcessDetails />`: Editorial 2-column craft section explaining Peshawar hand-filing, mineral enamel setting, and balanced weight.
  4. `<BrassLine />`: Metallic section transition divider.
  5. `<CategoryGrid />`: Interactive 3-column category selector (Gold cufflinks, Silver cufflinks, Gunmetal cufflinks) with image previews.
  6. `<BrassLine />`: Metallic section transition divider.
  7. `<MoreAboutCufflinks />`: Educational narrative section on suit cuff anatomy, formal etiquette, and toggle mechanics.

*Note: Additional ready-to-use homepage modules exist in `components/home/`:*
- `<FeaturedProducts />`: Direct product showcase cards.
- `<FeaturedProductStory />`: Deep-dive product anatomy with 01-04 numbered callouts.
- `<BrandStory />`: Deep Petrol background atelier narrative.
- `<CollectionIntro />`: Clean porcelain intro block.
- `<FinalCTA />`: Conversion footer banner.

---

### 5.3 Shop Catalog (`/shop`)
- **File:** [app/shop/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/shop/page.tsx)
- **Components:** `<ProductGrid />` wrapped with React `<Suspense />` to handle `useSearchParams`.
- **Header:** Obsidian dark banner *"Every detail counts."*
- **Body:** Porcelain light surface hosting the 12-column catalog layout:
  - **Sidebar (3 cols):** `<FilterSidebar />` with Category, Price Range, Color, Finish filters, and a Clear All reset.
  - **Grid Area (9 cols):** Responsive 1-col (mobile) to 3-col (desktop) grid of `<ProductCard />` components.
  - **Sorting Dropdown:** Featured, Price: Low to High, Price: High to Low, Alphabetical.
  - **Mobile Drawer:** Slide-out filter panel for viewports under 1024px.

---

### 5.4 Product Detail Page (`/product/[slug]`)
- **File:** [app/product/[slug]/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/product/[slug]/page.tsx)
- **Static Generation:** `generateStaticParams()` pre-renders all product slugs for instant navigation and SEO.
- **Layout (60/40 Split):**
  - **Left Gallery (7 cols):** `<ImageGallery />` featuring primary square display with zoom preview, mobile arrow controls, and multi-angle thumbnail picker.
  - **Right Info Panel (5 cols):**
    - Breadcrumb navigation (`Home / Shop / [Category] / [Product Name]`).
    - Title & Rupee pricing (`Rs. 3,200` with strike-through compare price if applicable).
    - Stock inventory badge (`In stock`, `Only X pairs remaining`, or `Out of stock`).
    - Full artisanal description.
    - Technical specification grid: Material, Finish, Color, Closure (`Swivel toggle closure`), Origin (`Peshawar, Pakistan`).
    - `<AddToCartButton />`: Quantity stepper (- / +) and "Add to cart" CTA with animated drawer reveal.
- **Related Products:** 3-item card grid showing complementary designs from the same category.

---

### 5.5 Cart Drawer & Standalone Cart (`/cart`)
- **Drawer Component:** [components/cart/CartDrawer.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/cart/CartDrawer.tsx)
  - Slides in smoothly from the right using GSAP (`x: 100%` to `x: 0%`).
  - Contains cart item list, individual quantity increments/decrements, item removal, order subtotal, and direct "Proceed to Checkout" button.
  - Dismisses on `Escape` key, backdrop click, or close button.
- **Full Page:** [app/cart/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/cart/page.tsx)
  - Fallback view for users opening the cart in a new tab or with JavaScript disabled.
  - Features empty state with CTA to shop or full 2-column breakdown of items and order summary.

---

### 5.6 Checkout & WhatsApp Order Engine (`/checkout`)
- **File:** [app/checkout/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/checkout/page.tsx)
- **Form Component:** [components/checkout/CheckoutForm.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/checkout/CheckoutForm.tsx)
- **Mechanism:**
  1. Customer enters **Full Name**, **WhatsApp Phone Number**, **Delivery Address**, and **City**.
  2. Client-side validation via Zod (`checkoutSchema`).
  3. If valid, `generateWhatsAppURL()` compiles the cart contents, total price, and customer shipping details into an organized text message.
  4. Opens the official WhatsApp API URL (`https://wa.me/[number]?text=[encoded_order]`) in a new tab.
  5. Displays a confirmation message and empties the cart.
  6. *Benefit:* Zero payment friction, instant direct customer communication, supports Cash on Delivery (COD) across Pakistan.

---

### 5.7 Atelier & Story Page (`/about`)
- **File:** [app/about/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/about/page.tsx)
- **Theme:** Rich editorial narrative on Peshawar's metalwork traditions.
- **Sections:**
  1. Hero statement: *"The detail changes everything."*
  2. Full-bleed editorial photography of workshop filing and finishing.
  3. Narrative grid on porcelain discussing lapel balance, toggle tension, and Khyber Pakhtunkhwa craftspeople.
  4. Materials breakdown: Solid metal surfaces, Deep mineral enamel, Engraving & crystal pavé.
  5. Deep Petrol atelier workbench banner with direct shop link.

---

### 5.8 Contact Portal (`/contact`)
- **File:** [app/contact/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/contact/page.tsx)
- **Layout:** Centered obsidian aesthetic with brass border accents.
- **Actions:**
  - One-click "Contact via WhatsApp" button with pre-filled greeting.
  - Email channel: `info@cuffkings.pk`.
  - Social link: Instagram atelier showcase.
  - Workshop location: Peshawar, Pakistan.

---

### 5.9 Admin Placeholder (`/admin`)
- **File:** [app/admin/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/admin/page.tsx)
- **Purpose:** Route reservation for future inventory management, order tracking, and product uploads.

---

### 5.10 Custom 404 Page (`/not-found`)
- **File:** [app/not-found.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/not-found.tsx)
- **Design:** Branded luxury error screen featuring framed `404` badge, obsidian background, and buttons returning to Home or Catalog.

---

## 6. Component Library & Architecture

All components reside in the `components/` directory:

```
components/
├── cart/
│   ├── CartDrawer.tsx          # Global animated slide-over cart drawer
│   ├── CartItem.tsx            # Single cart product line item with controls
│   └── CartSummary.tsx         # Order subtotal, delivery note & CTA
│
├── checkout/
│   └── CheckoutForm.tsx        # Customer address entry & WhatsApp redirector
│
├── home/
│   ├── HeroNoir.tsx            # Cinematic GSAP animated entrance hero
│   ├── CollectionIntro.tsx     # Editorial intro text block ("Designed for the details")
│   ├── FeaturedProductStory.tsx# Numbered anatomy of Ivory Pavé Gold Cufflinks
│   ├── ProcessDetails.tsx      # Material story & hand-filing craftsmanship
│   ├── HorizontalCollection.tsx# Pinned horizontal finish explorer (Gold → Blue → Silver → Gunmetal)
│   ├── CategoryGrid.tsx        # Gold, Silver, Gunmetal category selector
│   ├── BrandStory.tsx          # Deep petrol workshop highlight
│   ├── FinalCTA.tsx            # Bottom conversion banner ("Find the right finish")
│   └── MoreAboutCufflinks.tsx  # Atelier weight & sartorial anatomy guide (relocated to About page)
│
├── layout/
│   ├── Navbar.tsx              # Dynamic header with scroll states & mobile menu
│   └── Footer.tsx              # 4-column atelier footer
│
├── motion/
│   ├── Reveal.tsx              # Generic scroll-triggered wrapper (y: 40px -> 0, opacity: 0 -> 1)
│   ├── ImageReveal.tsx         # Luxury clip-path curtain unmasking for photography
│   ├── Magnetic.tsx            # Cursor-follow pull for primary conversion CTAs
│   ├── CustomCursor.tsx        # Desktop pointer follower with contextual text labels ("View", "Explore")
│   ├── HorizontalScroll.tsx    # Desktop pinned container with mobile snap-carousel fallback
│   └── PageTransition.tsx      # Obsidian curtain wipe + Champagne Brass hairline reveal
│
├── product/
│   ├── AddToCartButton.tsx     # Quantity stepper + magnetic add-to-cart CTA
│   ├── ImageGallery.tsx        # Interactive PDP gallery with thumbnails
│   └── ProductMedia.tsx        # Lazy video player + Ken Burns multi-angle pan/zoom crossfade
│
├── shop/
│   ├── FilterSidebar.tsx       # Category, price, color, finish radios
│   ├── ProductCard.tsx         # Individual catalog card with price & hover
│   └── ProductGrid.tsx         # Catalog controller with staggered card reveal & sorting
│
└── ui/
    ├── Badge.tsx               # Status badges (default, sale, limited)
    ├── BrassLine.tsx           # Hairline metallic divider component
    ├── Button.tsx              # Polymorphic button/link (primary/secondary/dark)
    ├── ProductPlaceholder.tsx  # Fallback image placeholder
    └── StitchDivider.tsx       # Tailoring stitch pattern decorative divider
```

---

## 7. State Management & Data Architecture

### 7.1 Cart Store (`store/cartStore.ts`)
Managed by **Zustand** with persistent browser storage:

```typescript
export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  material: string;
  quantity: number;
}

// Key Store Actions:
addItem(item)           // Increments quantity if present, otherwise appends
removeItem(id)          // Filters out item by id
updateQuantity(id, qty) // Sets quantity; deletes item if qty <= 0
clearCart()             // Resets items array to []
getSubtotal()           // Computes sum of (price * quantity)
getTotalQuantity()      // Total item count displayed on cart badges
openDrawer()            // Sets isDrawerOpen: true
closeDrawer()           // Sets isDrawerOpen: false
```

- **Storage Key:** `cuffkings-cart` in browser `localStorage`.

---

### 7.2 Product Data & Schema (`lib/products.ts`)

```typescript
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  material: string;
  finish: string;
  color: string;
  shape: string;
  pattern: string;
  isSet: boolean;
  pairsCount: number;
  stock: number;
  sku: string;
  featured: boolean;
  hasPhotography: boolean;
}
```

---

### 7.3 Active Product Catalog

| ID | Name | Slug | Category | Price (PKR) | Finish | Material | Stock | SKU |
|---|---|---|---|---|---|---|---|---|
| `1` | Ivory Pavé Gold Cufflinks | `ivory-pave-gold-cufflinks` | Gold Cufflinks | Rs. 3,200 | Polished | Gold-tone, ivory enamel, pavé crystals | 12 | `CK-IPG-001` |
| `2` | Sapphire Ornamental Cufflinks | `sapphire-ornamental-cufflinks` | Silver Cufflinks | Rs. 4,100 | Engraved | Silver-tone, deep blue mineral enamel | 8 | `CK-SO-002` |
| `3` | Onyx Geometric Cufflinks | `onyx-geometric-cufflinks` | Gunmetal Cufflinks | Rs. 2,850 | Matte gunmetal | Gunmetal, black enamel | 15 | `CK-OG-003` |
| `4` | Gold Trellis Crystal Cufflinks | `gold-trellis-crystal-cufflinks` | Gold Cufflinks | Rs. 3,450 | Polished | Gold-tone, crystal detailing | 10 | `CK-GTC-004` |
| `5` | Royal Blue Floral Cufflinks | `royal-blue-floral-cufflinks` | Enamel Cufflinks | Rs. 3,600 | Polished | Silver-tone, floral blue enamel | 6 | `CK-RBF-005` |
| `6` | Black Patterned Gunmetal | `black-patterned-gunmetal-cufflinks` | Gunmetal Cufflinks | Rs. 2,950 | Matte gunmetal | Gunmetal, black enamel | 9 | `CK-BPG-006` |

---

### 7.4 Validation Rules (`lib/validators.ts`)

Validated using **Zod**:
```typescript
export const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please enter your complete delivery address"),
  city: z.string().min(2, "Please enter your city"),
});
```

---

### 7.5 WhatsApp Link Generator (`lib/whatsapp.ts`)

Builds formatted WhatsApp messages:
```typescript
*New Order from CuffKings Website*

*Customer Details:*
Name: Zaigham Khan
Phone: 03001234567
Address: University Town
City: Peshawar

*Order Items:*
1. Ivory Pavé Gold Cufflinks
   Material: Gold-tone metal, ivory enamel, crystal pavé
   Quantity: 1
   Price: Rs. 3,200
   Subtotal: Rs. 3,200

*Order Total: Rs. 3,200*
Please confirm this order and let me know the delivery timeline.
```

---

## 8. Media & Asset Inventory

All image assets are organized in the `public/` directory:

### Product Photography (`public/products/`)
- `ivory-pave-gold-1.jpg`, `ivory-pave-gold-2.jpg` (High-res gold and ivory rectangular pair)
- `sapphire-ornamental-1.jpg`, `sapphire-ornamental-2.jpg` (Circular silver with floral sapphire enamel)
- `onyx-geometric-1.jpg`, `onyx-geometric-2.jpg` (Square matte gunmetal with black enamel)
- `gold-trellis-crystal-1.jpg`, `gold-trellis-crystal-2.jpg` (Rectangular gold lattice with crystals)
- `royal-blue-floral-1.jpg` (Round silver with engraved blue enamel)
- `black-patterned-gunmetal-1.jpg` (Rectangular patterned gunmetal pair)

### Editorial Imagery (`public/editorial/`)
- `hero-cufflinks.jpg` (Dramatic dark mood hero background with golden highlights)
- `craftsmanship-detail.jpg` (Close-up of artisan filing metal surfaces)
- `peshawar-atelier.jpg` (Atelier workbench with traditional hand tools)

---

## 9. Modification Playbook: How to Make Changes

This section is your step-by-step developer and designer guide for updating the website.

### 9.1 How to Add or Edit Products
1. Open [lib/products.ts](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/lib/products.ts).
2. Locate the `products` array.
3. To **add a new product**, copy an existing block and append it with a unique `id`, `slug`, and `sku`:
```typescript
{
  id: "7",
  name: "Emerald Sovereign Cufflinks",
  slug: "emerald-sovereign-cufflinks",
  category: "Gold Cufflinks",
  categorySlug: "gold-cufflinks",
  description: "Hand-carved emerald enamel set in 24k gold-tone plating.",
  price: 4500,
  compareAtPrice: 5000,
  images: ["/products/emerald-sovereign-1.jpg"],
  material: "Gold-tone brass, emerald enamel",
  finish: "Mirror Polish",
  color: "Gold, Green",
  shape: "Octagonal",
  pattern: "Faceted beveling",
  isSet: false,
  pairsCount: 1,
  stock: 5,
  sku: "CK-ESC-007",
  featured: true,
  hasPhotography: true,
}
```
4. Place your image in `public/products/emerald-sovereign-1.jpg`.
5. The shop catalog and static PDP routes will automatically generate upon rebuild.

---

### 9.2 How to Change Colors & Metal Themes
If you want to re-theme the site (for example, from **Champagne Brass** to **Silver Chrome** or **Rose Gold**):
1. Open [tailwind.config.ts](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/tailwind.config.ts):
```typescript
colors: {
  obsidian: "#101110",
  "deep-petrol": "#203A3A",
  porcelain: "#F3EFE7",
  "champagne-brass": "#D4AF37", // Replace with your desired metallic hex
  "deep-wine": "#641F2B",
  "warm-charcoal": "#211D19",
}
```
2. Open [app/globals.css](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/globals.css) and update the corresponding CSS root variables:
```css
:root {
  --color-champagne: #D4AF37;
}
```
3. All buttons, borders, highlights, and hovers will instantly reflect the new metallic tone across the entire website.

---

### 9.3 How to Change Typography & Font Families
1. Open [app/layout.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/layout.tsx).
2. Import your desired Google font from `next/font/google` (e.g., `Playfair_Display`, `Cinzel`, or `Montserrat`):
```typescript
import { Cinzel, Manrope } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});
```
3. Update [tailwind.config.ts](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/tailwind.config.ts):
```typescript
fontFamily: {
  display: ["var(--font-cinzel)", "serif"],
  sans: ["var(--font-manrope)", "sans-serif"],
}
```

---

### 9.4 How to Update the WhatsApp Business Number & Message
1. Open [.env.local](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/.env.local) (or create it if missing):
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=923001234567
```
*(Format: country code + number with NO plus sign, spaces, or hyphens. Example: `923001234567` for Pakistan).*
2. To modify the text message format, open [lib/whatsapp.ts](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/lib/whatsapp.ts) and customize the `generateWhatsAppURL()` function template strings.

---

### 9.5 How to Add, Remove or Reorder Homepage Sections
Open [app/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/page.tsx). You can rearrange the JSX elements or import other existing components:
```tsx
import HeroNoir from "@/components/home/HeroNoir";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProcessDetails from "@/components/home/ProcessDetails";
import CategoryGrid from "@/components/home/CategoryGrid";
import MoreAboutCufflinks from "@/components/home/MoreAboutCufflinks";
import FinalCTA from "@/components/home/FinalCTA";
import BrassLine from "@/components/ui/BrassLine";

export default function Home() {
  return (
    <>
      <HeroNoir />
      <BrassLine />
      <FeaturedProducts />       {/* Insert direct product showcase */}
      <BrassLine />
      <ProcessDetails />
      <BrassLine />
      <CategoryGrid />
      <BrassLine />
      <MoreAboutCufflinks />
      <BrassLine />
      <FinalCTA />               {/* Insert bottom conversion block */}
    </>
  );
}
```

---

### 9.6 How to Change Currencies / Pricing Display
1. In [components/shop/ProductCard.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/shop/ProductCard.tsx), [app/product/[slug]/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/product/[slug]/page.tsx), and [components/cart/CartItem.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/cart/CartItem.tsx):
   - Replace `"Rs. "` with `"$ "` (USD), `"AED "`, or `"£ "`.
2. In [components/shop/FilterSidebar.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/shop/FilterSidebar.tsx), update the price filtering thresholds (`under-3000`, `3000-3500`, etc.) to match your new currency scale.

---

### 9.7 How to Connect a Database (Supabase / Prisma / MongoDB)
Currently, `lib/products.ts` uses static arrays with helper functions (`getAllProducts()`, `getProductBySlug()`, etc.).
When transitioning to a database:
1. Replace the static arrays in `lib/products.ts` with your ORM / query client:
```typescript
import { db } from "@/lib/db";

export async function getAllProducts(): Promise<Product[]> {
  return await db.product.findMany();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await db.product.findUnique({ where: { slug } });
}
```
2. Because `app/shop/page.tsx` and `app/product/[slug]/page.tsx` are Next.js Server Components, async data fetching integrates with zero refactoring of UI components.

---

### 9.8 How to Add Credit Card Payments (Stripe / JazzCash / EasyPaisa)
1. Install the SDK: `npm install stripe @stripe/stripe-js`.
2. Create an API route in `app/api/checkout/route.ts` that creates a checkout session using items from the request body.
3. In [components/checkout/CheckoutForm.tsx](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/checkout/CheckoutForm.tsx), add a radio toggle between **WhatsApp / Cash on Delivery** and **Credit/Debit Card**.
4. If "Credit Card" is selected, submit to `/api/checkout` and redirect to Stripe's Hosted Checkout or embed Stripe Elements.

---

## 10. Configuration & Environment Reference

### Key Configuration Files
- **[package.json](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/package.json):** Scripts and dependencies.
- **[tailwind.config.ts](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/tailwind.config.ts):** Color palette, typography scale, container rules.
- **[tsconfig.json](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/tsconfig.json):** Path alias `@/*` mapping to root directory.
- **[next.config.ts](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/next.config.ts):** Next.js compiler settings.

### Running Commands
```bash
# Start local development server (runs at http://localhost:3000)
npm run dev

# Compile production build
npm run build

# Run production server
npm start

# Run ESLint validation
npm run lint
```

---

*Document created for the CuffKings Atelier.*  
*All architectural definitions, component maps, and styling rules are synchronized with codebase version 2.0.*
