# CuffKings Complete Website Prompt & Specification

**Version**: 3.0 Final  
**Purpose**: Complete AI prompt to recreate the entire CuffKings website from scratch  
**Design System**: Noir Atelier  
**Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, GSAP, Zustand

---

## 🎯 Executive Summary

Build a premium luxury e-commerce website for **CuffKings**, a men's cufflinks brand based in Peshawar, Pakistan. The website must feel like a **dark, cinematic, editorial luxury experience** - not a generic Shopify template or AI-generated site.

### Core Philosophy
> "The product is always the hero. Dark. Masculine. Refined. Sensual. Modern. Tactile. Editorial. Confident."

### Business Model
- Premium men's cufflinks
- WhatsApp-based ordering (no payment gateway)
- Product photography as primary visual asset
- Location: Peshawar, Pakistan
- Target: Men who value formal dressing details

---

## 🎨 VISUAL DESIGN SYSTEM

### Color Palette (Noir Atelier)

```typescript
// Primary Colors
--obsidian: #101110        // Main dark background
--porcelain: #F3EFE7       // Light surface
--champagne-brass: #C6A15B // Gold accent (use sparingly)

// Secondary Colors
--deep-petrol: #203A3A     // Secondary dark (occasional use)
--deep-wine: #641F2B       // Sale/limited badges only
--warm-charcoal: #211D19   // Text on light backgrounds
```

**Color Usage Rules:**
- **Obsidian**: Hero, navigation, footer, dark editorial sections, product showcases
- **Porcelain**: Shop pages, forms, light content sections, product information
- **Champagne Brass**: Hairline rules, borders, hover states, CTAs on dark backgrounds, numbering
- **Deep Petrol**: Occasional section variety (don't overuse)
- **Deep Wine**: Rare - only for sale/limited edition badges
- **Warm Charcoal**: Body text on porcelain backgrounds

**Critical**: Black + Gold (Obsidian + Champagne Brass) are the brand identity. Use gold sparingly as accents only, never for large text blocks or backgrounds.

### Typography

```typescript
// Display (Headlines, Major Sections)
font-family: 'Instrument Serif', 'Cormorant Garamond', serif;

// Body & UI (Everything else)
font-family: 'Manrope', sans-serif;

// Type Scale (Responsive with clamp)
--text-display: clamp(3.5rem, 8vw, 8.5rem);
--text-h1: clamp(3rem, 6vw, 6.5rem);
--text-h2: clamp(2.5rem, 4vw, 5rem);
--text-h3: clamp(1.75rem, 2.5vw, 3rem);
--text-body: clamp(0.95rem, 1vw, 1.1rem);
```

**Rules:**
- Headlines: Instrument Serif or Cormorant Garamond
- Navigation, buttons, forms, prices: Manrope
- Use sentence case (avoid all-caps)
- Never use excessive tracking or tiny uppercase labels

### Spacing & Layout

```typescript
// Container
--container-max: 1600px;

// Border Radius (Sharp aesthetic)
--radius-sharp: 0px;       // Default for everything
--radius-minimal: 2px;     // Maximum allowed

// Borders
--border-hairline: 1px;

// Spacing Scale
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 96px, 128px, 160px, 200px

// Section Spacing
--section: clamp(5rem, 10vw, 10rem);
--section-lg: clamp(8rem, 15vw, 15rem);
```

**Grid System:**
- 12-column flexible grid (desktop)
- Asymmetric editorial layouts (NOT equal card grids)
- Products span different widths: 3, 4, 5, 6, 7, 8 columns, or full width
- Mobile-first responsive design

### Visual Rules

**DO:**
- ✅ Sharp corners (0px border-radius)
- ✅ Hairline borders (1px, champagne-brass with opacity)
- ✅ Large product photography
- ✅ Generous negative space
- ✅ Asymmetric layouts
- ✅ Editorial compositions
- ✅ Cinematic motion with GSAP
- ✅ Product as visual hero

**DON'T:**
- ❌ Purple/blue AI gradients
- ❌ Neon accents
- ❌ Glassmorphism
- ❌ Rounded pill buttons
- ❌ Equal-size card grids everywhere
- ❌ Excessive shadows (box-shadow: 0 10px 30px...)
- ❌ Generic SaaS patterns
- ❌ Animation on every element
- ❌ Floating blobs or decorative particles

---

## 🛠️ TECHNICAL STACK

### Core Technologies

```json
{
  "framework": "Next.js 15.1.6",
  "react": "19.0.0",
  "typescript": "5.x",
  "styling": "Tailwind CSS 3.4.1",
  "animation": "GSAP 3.15.0",
  "state": "Zustand 5.0.2",
  "validation": "Zod 3.24.1"
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#101110",
        "deep-petrol": "#203A3A",
        porcelain: "#F3EFE7",
        "champagne-brass": "#C6A15B",
        "deep-wine": "#641F2B",
        "warm-charcoal": "#211D19",
      },
      fontFamily: {
        display: ["var(--font-instrument)", "var(--font-cormorant)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        sharp: "0px",
        minimal: "2px",
        DEFAULT: "0px",
      },
      fontSize: {
        display: ["clamp(3.5rem, 8vw, 8.5rem)", { lineHeight: "1" }],
        h1: ["clamp(3rem, 6vw, 6.5rem)", { lineHeight: "1.1" }],
        h2: ["clamp(2.5rem, 4vw, 5rem)", { lineHeight: "1.2" }],
        h3: ["clamp(1.75rem, 2.5vw, 3rem)", { lineHeight: "1.3" }],
        body: ["clamp(0.95rem, 1vw, 1.1rem)", { lineHeight: "1.6" }],
      },
      maxWidth: {
        container: "1600px",
      },
      spacing: {
        section: "clamp(5rem, 10vw, 10rem)",
        "section-lg": "clamp(8rem, 15vw, 15rem)",
      },
    },
  },
  plugins: [],
};

export default config;
```

### Global Styles

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-obsidian: #101110;
    --color-deep-petrol: #203A3A;
    --color-porcelain: #F3EFE7;
    --color-champagne: #C6A15B;
    --color-deep-wine: #641F2B;
    --color-charcoal: #211D19;
    --border-hairline: 1px;
    --radius-sharp: 0px;
    --radius-minimal: 2px;
    --container-max: 1600px;
  }
  
  body {
    @apply bg-obsidian text-porcelain font-sans antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }

  ::selection {
    @apply bg-champagne-brass text-obsidian;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Font Setup (app/layout.tsx)

```typescript
import { Instrument_Serif, Cormorant_Garamond, Manrope } from 'next/font/google';

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

// Apply to HTML
<html className={`${instrumentSerif.variable} ${cormorantGaramond.variable} ${manrope.variable}`}>
```

---

## 📐 COMPLETE SITE STRUCTURE

### App Directory Structure

```
app/
├── layout.tsx                 // Root layout with fonts
├── page.tsx                   // Homepage
├── globals.css                // Global styles
├── not-found.tsx             // 404 page
├── about/
│   └── page.tsx              // About page
├── contact/
│   └── page.tsx              // Contact page
├── shop/
│   ├── page.tsx              // Shop main page
│   └── [category]/
│       └── page.tsx          // Category pages
├── product/
│   └── [slug]/
│       └── page.tsx          // Product detail pages
├── cart/
│   └── page.tsx              // Cart page
└── checkout/
    └── page.tsx              // Checkout page
```

### Components Structure

```
components/
├── layout/
│   ├── Navbar.tsx            // Main navigation
│   ├── Footer.tsx            // Site footer
│   └── MobileMenu.tsx        // Mobile navigation overlay (if separate)
├── home/
│   ├── HeroNoir.tsx          // Homepage hero with GSAP
│   ├── CollectionIntro.tsx   // Introduction section
│   ├── FeaturedProductStory.tsx  // Featured product with details
│   ├── FeaturedProducts.tsx  // Product grid section
│   ├── CategoryGrid.tsx      // Category navigation grid
│   ├── BrandStory.tsx        // Brand storytelling
│   └── FinalCTA.tsx          // Final call-to-action
├── shop/
│   ├── ProductCard.tsx       // Individual product card
│   ├── ProductGrid.tsx       // Product listing grid
│   └── FilterSidebar.tsx     // Shop filters
├── product/
│   ├── ImageGallery.tsx      // Product image gallery
│   └── AddToCartButton.tsx   // Add to cart functionality
├── cart/
│   ├── CartItem.tsx          // Individual cart item
│   └── CartSummary.tsx       // Cart totals/summary
├── checkout/
│   └── CheckoutForm.tsx      // Checkout form with validation
└── ui/
    ├── Button.tsx            // Reusable button component
    ├── Badge.tsx             // Product badges (Sale, Limited, etc)
    ├── BrassLine.tsx         // Decorative divider
    └── ProductPlaceholder.tsx // Product loading state
```

### Library Files

```
lib/
├── products.ts               // Product data and utilities
├── validators.ts             // Zod schemas for forms
└── whatsapp.ts              // WhatsApp message generation
```

### Store

```
store/
└── cartStore.ts             // Zustand cart state management
```

---

## 🏠 PAGE-BY-PAGE IMPLEMENTATION

### 1. HOMEPAGE (app/page.tsx)

**Visual Sequence:**
1. HeroNoir - Full viewport, cinematic entrance
2. BrassLine divider
3. CollectionIntro - Editorial introduction
4. BrassLine divider
5. FeaturedProductStory - Large featured product
6. BrassLine divider
7. FeaturedProducts - Product grid
8. BrassLine divider
9. BrandStory - Brand narrative
10. BrassLine divider
11. FinalCTA - Call to action
12. Footer

```typescript
// app/page.tsx
import HeroNoir from "@/components/home/HeroNoir";
import BrassLine from "@/components/ui/BrassLine";
import CollectionIntro from "@/components/home/CollectionIntro";
import FeaturedProductStory from "@/components/home/FeaturedProductStory";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroNoir />
      <BrassLine className="max-w-container mx-auto" />
      <CollectionIntro />
      <BrassLine className="max-w-container mx-auto" />
      <FeaturedProductStory />
      <BrassLine className="max-w-container mx-auto" />
      <FeaturedProducts />
      <BrassLine className="max-w-container mx-auto" />
      <BrandStory />
      <BrassLine className="max-w-container mx-auto" />
      <FinalCTA />
    </>
  );
}
```

#### HeroNoir Component Specification

**Requirements:**
- Full viewport height (min-height: 100svh)
- Obsidian background
- Large product image (60% width on desktop)
- GSAP entrance animations
- Scroll indicator
- Reduced motion support

**Content:**
```
Headline: "The detail changes everything."
Subheading: "Cufflinks built around polished metal, considered patterns and the details of formal dressing."
Primary CTA: "Shop the collection"
Secondary Link: "Explore the pieces"
```

**Animation Sequence (GSAP):**
1. Obsidian background establishes (instant)
2. CuffKings text/logo fades in (0-300ms)
3. Product image clip-path reveal (300-800ms)
4. Headline reveals line by line (500-1000ms)
5. Supporting copy fades in (800-1200ms)
6. CTAs appear (1000-1400ms)
7. Brass line draws (1200-1600ms)
8. Scroll indicator pulses (1400ms+)

**ScrollTrigger Parallax:**
- Product image subtle scale (1 → 1.05)
- Content opacity fade (1 → 0.3)
- Slight upward movement

#### CollectionIntro Component

**Background:** Porcelain  
**Layout:** Centered content, max-width 900px

**Content:**
```
Headline: "Designed for the details."
Body: "Small metal objects for formal shirts. Polished finishes, enamel depth, engraved patterns, and crystal accents. CuffKings focuses on what's visible at the cuff."
```

**Animation:** Fade up on scroll (GSAP ScrollTrigger)

#### FeaturedProductStory Component

**Layout:** 2-column (50/50 on desktop, stack on mobile)
- Left: Large product image
- Right: Product details with numbered sections

**Background:** Obsidian

**Content Structure:**
```
Product: Ivory Pavé Gold Cufflinks
Price: Rs. 4,500

Details:
01 / Material
   Gold-tone metal base with high-polish finish.

02 / Enamel
   Ivory enamel fill, applied carefully and leveled flush.

03 / Crystal
   Pavé-set crystals. Small, precise, light-catching.

04 / Finish
   Polished edges. Metal meets enamel cleanly.
```

**Animation:** Sequential reveal on scroll (stagger 100ms between sections)

#### FeaturedProducts Component

**Background:** Deep Petrol  
**Layout:** Asymmetric grid (NOT equal cards)

**Content:** Show 6-8 products with varied sizes
- 1 large featured product (spans 2 columns)
- 5-7 standard products

**Animation:** Stagger fade-up on scroll

#### BrandStory Component

**Background:** Porcelain  
**Layout:** 2-column editorial

**Content:**
```
Left Column:
"Made in Peshawar. Designed around formal details."

Right Column:
"CuffKings sources and curates premium cufflinks for men who pay attention to formal dressing. We work with metal finishes, enamel color, engraved patterns and crystal detailing. Each piece is selected for how it looks at the cuff — polished, deliberate, and considered."
```

#### FinalCTA Component

**Background:** Obsidian  
**Layout:** Centered, generous padding

**Content:**
```
Headline: "Small details. Carefully chosen."
CTA: "Shop cufflinks"
```

---

### 2. SHOP PAGE (app/shop/page.tsx)

**Background:** Porcelain  
**Layout:** Sidebar (filters) + Main (products)

**Components:**
- FilterSidebar (desktop: fixed left, mobile: overlay)
- ProductGrid (asymmetric editorial grid)

**Filters:**
- Category (All, Gold, Silver, Blue, Gunmetal, Crystal, etc.)
- Price range
- Color
- Finish
- Pattern
- Sort (Featured, Newest, Price Low-High, High-Low)

**Product Grid Rules:**
- Asymmetric sizing (products span 3-6 columns)
- Stagger animations on load
- Hover effects with GSAP (scale 1.03, brass line reveal)

---

### 3. PRODUCT DETAIL PAGE (app/product/[slug]/page.tsx)

**Layout:** 60/40 split
- Left: ImageGallery (primary image, thumbnails, zoom)
- Right: Product information

**Product Info Structure:**
```
Product Name (H1, Display font)
Price (Large, Manrope)
Material badge
Finish badge
Color badge

Description (2-3 lines, specific details)

Quantity selector
Add to Cart button (Champagne brass on obsidian background)

Detailed specifications:
- Material
- Finish
- Dimensions
- Weight
- Fastening type

Care instructions
Shipping information
```

**ImageGallery Features:**
- Primary large image
- Thumbnail navigation
- Zoom on click/hover
- Swipe on mobile
- GSAP transitions between images

---

### 4. CART PAGE (app/cart/page.tsx)

**Background:** Porcelain  
**Layout:** 2-column (items left, summary right on desktop)

**Cart Empty State:**
```
"Your cart is empty."
"Start with a closer look at the collection."
CTA: "Shop cufflinks"
```

**Cart with Items:**
- List of CartItem components
- CartSummary component (subtotal, shipping note, checkout CTA)

**CartItem:**
- Product image (square, 120px)
- Product name
- Price
- Quantity selector (+ / -)
- Remove button
- Line total

---

### 5. CHECKOUT PAGE (app/checkout/page.tsx)

**Important:** WhatsApp-based checkout (NO payment gateway)

**Layout:** Form on porcelain background

**Form Fields (Zod validation):**
```typescript
{
  name: string (required, min 2 chars)
  phone: string (required, Pakistani format +92...)
  address: string (required, min 10 chars)
  city: string (required)
}
```

**After Form Submit:**
1. Validate with Zod
2. Generate WhatsApp message URL
3. Open WhatsApp with pre-filled message
4. Show confirmation: "Your order details are ready in WhatsApp. Send the message to confirm your order."

**WhatsApp Message Format:**
```
Hello! I'd like to order from CuffKings:

[Product Name] × [Qty] - Rs. [Price]
[Product Name] × [Qty] - Rs. [Price]

Total: Rs. [Amount]

Delivery Details:
Name: [Name]
Phone: [Phone]
Address: [Address]
City: [City]
```

---

### 6. ABOUT PAGE (app/about/page.tsx)

**Background:** Alternating Porcelain and Obsidian sections

**Content Structure:**

**Section 1: Introduction (Obsidian)**
```
Headline: "CuffKings"
Body: "Premium cufflinks for men. Based in Peshawar."
```

**Section 2: What We Do (Porcelain)**
```
Headline: "What we do"
Body: Explain product focus, materials, design approach
```

**Section 3: Materials (Porcelain)**
```
4-column grid:
1. Metal surfaces (Gold-tone, silver-tone, gunmetal)
2. Enamel work (Deep enamel in blue, black, ivory)
3. Engraved patterns (Fine line work, geometric)
4. Crystal detailing (Pavé-set crystals)
```

**Section 4: Location (Porcelain)**
```
"Based in Peshawar"
Brief explanation of operations
```

**Design:** Editorial layout, large typography, restrained copy

---

### 7. CONTACT PAGE (app/contact/page.tsx)

**Background:** Porcelain with obsidian header

**Content:**
```
Headline: "Get in touch"

Primary CTA: "Contact via WhatsApp" (Large button, champagne brass)

Alternative Contact:
Email: [email]
Instagram: [handle]

Location & Availability:
Based in: Peshawar, Pakistan
Response time: WhatsApp usually within a few hours
Shipping: Across Pakistan (contact for international)
```

**Design:** Minimal, clean, functional

---

## 🧩 COMPONENT IMPLEMENTATIONS

### UI Components

#### Button Component (components/ui/Button.tsx)

```typescript
"use client";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "font-sans font-medium transition-all duration-300 inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-champagne-brass text-obsidian hover:bg-champagne-brass/90",
    secondary: "bg-obsidian text-porcelain border border-champagne-brass/30 hover:border-champagne-brass",
    outline: "border border-champagne-brass text-champagne-brass hover:bg-champagne-brass/10",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
```

#### Badge Component (components/ui/Badge.tsx)

```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sale" | "limited";
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-porcelain text-warm-charcoal border border-champagne-brass/25",
    sale: "bg-deep-wine text-porcelain",
    limited: "bg-obsidian text-porcelain border border-champagne-brass/25",
  };

  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
```

#### BrassLine Component (components/ui/BrassLine.tsx)

```typescript
interface BrassLineProps {
  className?: string;
}

export default function BrassLine({ className = "" }: BrassLineProps) {
  return (
    <div className={`w-full h-px bg-gradient-to-r from-transparent via-champagne-brass/30 to-transparent ${className}`} />
  );
}
```

---

### Layout Components

#### Navbar Component (components/layout/Navbar.tsx)

**Features:**
- Transparent over hero, becomes obsidian on scroll
- Fixed position
- GSAP scroll animation
- Mobile menu overlay
- Cart badge count

**Structure:**
```
Logo (left) | Navigation Links (center) | Search + Cart (right)

Links: Shop, Collections, About, Contact
```

**Desktop:**
- Horizontal layout
- Hover effects on links (champagne brass underline)

**Mobile:**
- Hamburger menu
- Full-screen overlay (obsidian background)
- Vertical links
- Close button

**GSAP ScrollTrigger:**
```typescript
gsap.to(navRef.current, {
  backgroundColor: "rgba(16, 17, 16, 1)",
  padding: "1rem 0",
  scrollTrigger: {
    trigger: navRef.current,
    start: "top -50px",
    toggleActions: "play none none reverse",
  },
});
```

#### Footer Component (components/layout/Footer.tsx)

**Background:** Obsidian  
**Text:** Porcelain with champagne brass accents

**Layout:** 4-column grid (desktop), stack (mobile)

**Columns:**
1. **Brand**
   - CuffKings logo/text
   - Tagline: "Premium cufflinks for men"

2. **Shop**
   - All Cufflinks
   - Gold Collection
   - Silver Collection
   - Gift Sets

3. **Information**
   - About
   - Contact
   - Shipping
   - Care Guide

4. **Connect**
   - WhatsApp
   - Instagram
   - Email

**Bottom:**
- Brass line divider
- Copyright: "© 2026 CuffKings. Peshawar, Pakistan."
- Legal links (if needed)

---

### Product Components

#### ProductCard Component (components/shop/ProductCard.tsx)

**Layout:**
- Product image (aspect-ratio: 1/1)
- Product name (font-display)
- Price (font-sans, medium weight)
- Badges (if sale/limited)

**Hover Effects (GSAP):**
```typescript
gsap.to(imageRef.current, {
  scale: 1.05,
  duration: 0.4,
  ease: "power3.out",
});

// Show brass line on hover
gsap.to(lineRef.current, {
  scaleX: 1,
  duration: 0.3,
});
```

**Interaction:**
- Click anywhere → Navigate to product detail page
- Magnetic effect on CTA (optional, desktop only)

---

## 🎬 ANIMATION SYSTEM (GSAP)

### GSAP Setup

```typescript
// In every client component that uses GSAP
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

### Common Animation Patterns

#### 1. Fade Up on Scroll

```typescript
useEffect(() => {
  const el = elementRef.current;
  
  gsap.from(el, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    },
  });
}, []);
```

#### 2. Stagger Children

```typescript
useEffect(() => {
  const children = containerRef.current?.children;
  
  gsap.from(children, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top 80%",
    },
  });
}, []);
```

#### 3. Parallax Effect

```typescript
useEffect(() => {
  gsap.to(imageRef.current, {
    y: -50,
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
}, []);
```

#### 4. Clip-Path Reveal

```typescript
useEffect(() => {
  gsap.from(imageRef.current, {
    clipPath: "inset(0 0 100% 0)",
    duration: 1,
    ease: "power3.out",
  });
}, []);
```

#### 5. Scale on Hover

```typescript
const handleMouseEnter = () => {
  gsap.to(imageRef.current, {
    scale: 1.05,
    duration: 0.4,
    ease: "power3.out",
  });
};

const handleMouseLeave = () => {
  gsap.to(imageRef.current, {
    scale: 1,
    duration: 0.4,
    ease: "power3.out",
  });
};
```

### Reduced Motion Support

```typescript
useEffect(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (prefersReducedMotion) {
    // Skip or simplify animations
    return;
  }
  
  // Run GSAP animations
}, []);
```

---

## 🛒 STATE MANAGEMENT (ZUSTAND)

### Cart Store (store/cartStore.ts)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  material?: string;
  finish?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cuffkings-cart',
    }
  )
);
```

---

## 📦 PRODUCT DATA (lib/products.ts)

```typescript
export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  description: string;
  material: string;
  finish: string;
  color: string;
  pattern?: string;
  images: string[];
  category: string;
  categorySlug: string;
  isFeatured: boolean;
  isNew: boolean;
  isLimited: boolean;
  stock: "in-stock" | "low-stock" | "out-of-stock";
  details: {
    dimensions?: string;
    weight?: string;
    fastening: string;
    care: string;
  };
}

export const products: Product[] = [
  {
    id: "ivory-pave-gold",
    slug: "ivory-pave-gold-cufflinks",
    name: "Ivory Pavé Gold Cufflinks",
    price: 4500,
    description: "Gold-tone metal with ivory enamel fill and pavé-set crystals. Polished edges, clean finish.",
    material: "Gold-tone metal",
    finish: "High polish",
    color: "Ivory & Gold",
    pattern: "Crystal pavé",
    images: ["/products/ivory-pave-gold-1.jpg", "/products/ivory-pave-gold-2.jpg"],
    category: "Gold Cufflinks",
    categorySlug: "gold-cufflinks",
    isFeatured: true,
    isNew: false,
    isLimited: false,
    stock: "in-stock",
    details: {
      dimensions: "16mm × 16mm",
      weight: "12g per pair",
      fastening: "Bullet back",
      care: "Wipe clean with soft cloth. Avoid water contact.",
    },
  },
  // Add more products...
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}
```

---

## ✅ FORM VALIDATION (lib/validators.ts)

```typescript
import { z } from 'zod';

export const checkoutFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^\+92[0-9]{10}$/, "Please enter a valid Pakistani phone number (+92XXXXXXXXXX)"),
  address: z.string().min(10, "Please enter your complete address"),
  city: z.string().min(2, "Please enter your city"),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
```

---

## 📱 WHATSAPP INTEGRATION (lib/whatsapp.ts)

```typescript
import { CartItem } from '@/store/cartStore';
import { CheckoutFormData } from './validators';

export function generateWhatsAppMessage(
  items: CartItem[],
  formData: CheckoutFormData,
  totalPrice: number
): string {
  let message = "Hello! I'd like to order from CuffKings:\n\n";
  
  // Add products
  items.forEach((item) => {
    message += `${item.name} × ${item.quantity} - Rs. ${item.price * item.quantity}\n`;
  });
  
  message += `\nTotal: Rs. ${totalPrice}\n\n`;
  message += "Delivery Details:\n";
  message += `Name: ${formData.name}\n`;
  message += `Phone: ${formData.phone}\n`;
  message += `Address: ${formData.address}\n`;
  message += `City: ${formData.city}`;
  
  return message;
}

export function openWhatsApp(message: string, phoneNumber: string = "923001234567") {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(url, '_blank');
}
```

---

## 📱 RESPONSIVE DESIGN BREAKPOINTS

```typescript
// Tailwind breakpoints (default)
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

// Custom breakpoints for specific needs
// Mobile S: 320px
// Mobile M: 375px
// Mobile L: 430px
// Tablet: 768px
// Desktop S: 1024px
// Desktop M: 1440px
// Desktop L: 1920px
```

**Responsive Rules:**

**Mobile (< 768px):**
- Single column layouts
- Stack sections vertically
- Full-width images
- Simplified animations
- Touch-friendly controls (44px min)
- No custom cursor
- No magnetic interactions
- Simplified navigation (hamburger menu)

**Tablet (768px - 1023px):**
- 2-column layouts where appropriate
- Moderate animations
- Touch optimization maintained

**Desktop (≥ 1024px):**
- Full editorial grid system
- Asymmetric layouts
- Cinematic animations
- Custom cursor (optional)
- Magnetic interactions on CTAs
- Parallax effects
- Horizontal scrolling sections

---

## ♿ ACCESSIBILITY REQUIREMENTS

### WCAG AA Compliance

**Semantic HTML:**
```html
<!-- Use proper heading hierarchy -->
<h1>Main page title</h1>
<h2>Section heading</h2>
<h3>Subsection heading</h3>

<!-- Use semantic elements -->
<nav>, <main>, <article>, <section>, <aside>, <footer>

<!-- Buttons for actions, links for navigation -->
<button onClick={handleClick}>Add to Cart</button>
<Link href="/shop">Shop Now</Link>
```

**Keyboard Navigation:**
- Tab: Move forward
- Shift + Tab: Move backward
- Enter: Activate buttons/links
- Escape: Close modals/menus
- Arrow keys: Navigate carousels/galleries

**Focus States:**
```css
/* Visible focus indicators */
.button:focus-visible {
  outline: 2px solid var(--color-champagne);
  outline-offset: 2px;
}
```

**Alt Text:**
```tsx
<Image 
  src="/products/ivory-gold.jpg"
  alt="Ivory Pavé Gold Cufflinks showing polished gold-tone metal with ivory enamel and crystal details"
  width={800}
  height={800}
/>
```

**ARIA Labels:**
```tsx
<button aria-label="Add Ivory Pavé Gold Cufflinks to cart">
  Add to Cart
</button>

<nav aria-label="Main navigation">
  {/* navigation links */}
</nav>
```

**Color Contrast:**
- Text on Obsidian: Use Porcelain (#F3EFE7) - Ratio: 13.5:1 ✅
- Text on Porcelain: Use Warm Charcoal (#211D19) - Ratio: 11.2:1 ✅
- Champagne Brass on Obsidian: Ratio: 5.8:1 ✅

**Reduced Motion:**
Already implemented in globals.css

---

## 🎨 CONTENT GUIDELINES

### Voice & Tone

**DO:**
- ✅ Be specific and tactile
- ✅ Use active voice
- ✅ Keep it short and confident
- ✅ Describe actual materials and processes
- ✅ Sound human and considered

**Examples:**
- "Polished metal. Deep enamel. Clean finish."
- "Small details for formal shirts."
- "Gold-tone metal with ivory enamel fill."

**DON'T:**
- ❌ Use generic luxury clichés
- ❌ Make unsupported claims
- ❌ Use excessive adjectives
- ❌ Sound like AI marketing copy

**Bad Examples:**
- "Elevate your style to unprecedented heights"
- "Experience luxury like never before"
- "Game-changing cufflinks that redefine elegance"
- "Unleash your sophisticated side"

### Product Descriptions

**Format:**
```
[Product Name]

[1-2 sentence specific description of materials and finish]

Material: [Specific material]
Finish: [Specific finish type]
Detail: [Specific decorative detail]
```

**Example:**
```
Ivory Pavé Gold Cufflinks

Gold-tone metal with ivory enamel fill and pavé-set crystals. Polished edges, clean finish.

Material: Gold-tone metal
Finish: High polish
Detail: Crystal pavé, ivory enamel
```

---

## 🚀 PERFORMANCE OPTIMIZATION

### Next.js Image Optimization

```tsx
import Image from 'next/image';

// Priority for above-the-fold images
<Image
  src="/hero-product.jpg"
  alt="Featured cufflinks"
  width={1200}
  height={800}
  priority
  quality={90}
/>

// Lazy load for below-the-fold
<Image
  src="/product-2.jpg"
  alt="Silver cufflinks"
  width={800}
  height={800}
  loading="lazy"
  quality={85}
/>
```

### Dynamic Imports

```typescript
// For heavy components
const CustomCursor = dynamic(() => import('@/components/motion/CustomCursor'), {
  ssr: false,
});
```

### GSAP Cleanup

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP animations here
  }, containerRef);
  
  return () => ctx.revert(); // Cleanup on unmount
}, []);
```

### Font Loading

```typescript
// Use display: 'swap' for all fonts
const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap', // Prevent invisible text during load
});
```

---

## 📋 PRE-LAUNCH CHECKLIST

### Design Quality
- [ ] Product is always the visual hero
- [ ] No AI gradients or generic patterns
- [ ] Sharp corners (0px radius) maintained
- [ ] Obsidian + Champagne Brass used correctly
- [ ] Gold used sparingly as accent only
- [ ] Typography hierarchy clear (Instrument Serif / Manrope)
- [ ] Asymmetric editorial layouts (not equal card grids)
- [ ] Generous whitespace maintained
- [ ] Copy is specific and human (not marketing fluff)

### Technical
- [ ] All GSAP animations have cleanup
- [ ] Reduced motion fully supported
- [ ] Next.js Image used everywhere
- [ ] No console errors
- [ ] TypeScript strict mode passing
- [ ] All forms validated with Zod
- [ ] Cart persists in localStorage
- [ ] WhatsApp integration working

### Responsive
- [ ] Mobile (320px - 767px) tested
- [ ] Tablet (768px - 1023px) tested
- [ ] Desktop (1024px+) tested
- [ ] Touch targets 44px minimum on mobile
- [ ] Mobile menu functional
- [ ] No horizontal scroll on any viewport

### Accessibility
- [ ] Semantic HTML used
- [ ] Heading hierarchy logical (h1 → h2 → h3)
- [ ] All images have alt text
- [ ] All interactive elements keyboard accessible
- [ ] Focus states visible
- [ ] Color contrast WCAG AA compliant
- [ ] Reduced motion support working
- [ ] Screen reader tested (if possible)

### Performance
- [ ] Lighthouse score > 90 (Performance)
- [ ] Images optimized and properly sized
- [ ] Fonts loading efficiently
- [ ] GSAP animations not causing jank
- [ ] No layout shifts (CLS score good)
- [ ] First Contentful Paint < 2s

### Content
- [ ] All product data complete
- [ ] All images present and optimized
- [ ] No placeholder text remaining
- [ ] About page accurate (no false claims)
- [ ] Contact information correct
- [ ] WhatsApp number correct

### E-commerce
- [ ] Add to cart working
- [ ] Cart updates correctly
- [ ] Cart persists on refresh
- [ ] Quantity controls working
- [ ] Remove from cart working
- [ ] Checkout form validation working
- [ ] WhatsApp message format correct
- [ ] WhatsApp opens with pre-filled message

---

## 🔮 FUTURE ENHANCEMENTS (OPTIONAL)

### Phase 2 Features
1. **Custom Cursor** (Desktop only)
   - Small dot default
   - Context-aware labels
   - GSAP smooth following
   - Touch device detection

2. **Magnetic Interactions**
   - Major CTAs only
   - 5-10px max movement
   - Smooth GSAP animations

3. **Page Transitions**
   - Obsidian overlay
   - Champagne brass line animation
   - 600-1000ms duration

4. **Horizontal Collection Section**
   - GSAP ScrollTrigger pinning
   - Horizontal product travel on vertical scroll
   - Mobile alternative (swipe gallery)

### Phase 3 Features
1. **Product Zoom**
   - Click/hover to zoom
   - Smooth GSAP transitions
   - Mobile pinch-to-zoom

2. **Search Functionality**
   - Instant search overlay
   - Filter by name, material, color
   - GSAP entrance animation

3. **Wishlist**
   - Save products for later
   - Persist in localStorage
   - Share wishlist via URL

4. **Related Products**
   - Algorithm: Same category, similar price
   - Show 4-6 products
   - Carousel on mobile

---

## 🎓 DESIGN PRINCIPLES SUMMARY

### The 20 Commandments

1. **Product comes first** - Always the visual hero
2. **Black + Gold identity** - Obsidian and Champagne Brass define the brand
3. **Sharp, not rounded** - 0px border-radius (max 2px)
4. **Gold is an accent** - Use sparingly, not as flood
5. **Editorial asymmetry** - Avoid equal card grids
6. **Generous space** - Don't compress sections
7. **Cinematic motion** - GSAP for quality animations
8. **Tactile materials** - Photography prominence
9. **Masculine refinement** - Typography and contrast
10. **No AI patterns** - No purple gradients, blobs, glassmorphism
11. **No SaaS vibes** - Editorial, not dashboard
12. **No generic shadows** - Depth from photography and layering
13. **No fake claims** - Only real product details
14. **Specific copy** - Human, not marketing fluff
15. **Performance matters** - Animations shouldn't cause jank
16. **Accessibility required** - WCAG AA minimum
17. **Mobile-first** - Touch-friendly, simplified
18. **Reduced motion** - Full support required
19. **Product photography** - Large scale, breathing room
20. **Restrained UI** - Interface serves product, not vice versa

---

## 📞 FINAL NOTES

This is a complete specification for building the CuffKings website. Every component, every animation, every design decision is documented.

**Key Success Factors:**
1. The product must always be the most visually prominent element
2. Black (Obsidian) and Gold (Champagne Brass) are the brand colors
3. Use GSAP for all significant animations
4. Keep copy specific and human
5. No generic luxury template patterns
6. WhatsApp-based checkout (no payment gateway)
7. Performance and accessibility are non-negotiable

**When in doubt:**
- Make it darker (not lighter)
- Make it sharper (not rounder)
- Make it simpler (not busier)
- Focus on the product (not the UI)
- Use less gold (not more)

---

**End of Complete Website Prompt**

*Version 3.0 - Ready for AI implementation*  
*CuffKings © 2026*
