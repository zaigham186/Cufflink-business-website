# CuffKings - Technical Implementation Guide

Complete technical reference for building the CuffKings website with Next.js, TypeScript, Tailwind CSS, and GSAP.

---

## 📦 PROJECT SETUP

### 1. Initialize Next.js Project

```bash
npx create-next-app@latest cuffkings --typescript --tailwind --app --eslint
cd cuffkings
```

### 2. Install Dependencies

```bash
npm install gsap zustand zod
npm install -D @types/node
```

### 3. Project Structure

```
cuffkings/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   ├── about/
│   ├── contact/
│   ├── shop/
│   ├── product/
│   ├── cart/
│   └── checkout/
├── components/
│   ├── layout/
│   ├── home/
│   ├── shop/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   └── ui/
├── lib/
│   ├── products.ts
│   ├── validators.ts
│   └── whatsapp.ts
├── store/
│   └── cartStore.ts
├── public/
│   └── products/
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## ⚙️ CONFIGURATION FILES

### package.json

```json
{
  "name": "cuffkings",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "gsap": "^3.15.0",
    "next": "^15.1.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zod": "^3.24.1",
    "zustand": "^5.0.2"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.20",
    "eslint": "^9",
    "eslint-config-next": "^15.1.6",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

### tailwind.config.ts

```typescript
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
        // Noir Atelier Palette
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

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [], // Add your image domains here
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
};

export default nextConfig;
```

### .env.local

```env
# WhatsApp Business Number (without + sign)
NEXT_PUBLIC_WHATSAPP_NUMBER=923001234567

# Site URL (for metadata)
NEXT_PUBLIC_SITE_URL=https://cuffkings.com

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🎨 STYLING SETUP

### app/globals.css

```css
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

  /* Custom selection */
  ::selection {
    @apply bg-champagne-brass text-obsidian;
  }
  
  /* Smooth scrolling (respects reduced motion) */
  html {
    scroll-behavior: smooth;
  }
  
  /* Focus visible for keyboard navigation */
  :focus-visible {
    outline: 2px solid var(--color-champagne);
    outline-offset: 2px;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-obsidian);
}

::-webkit-scrollbar-thumb {
  background: var(--color-champagne);
  border-radius: 0;
}

::-webkit-scrollbar-thumb:hover {
  background: #B89144;
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
  
  html {
    scroll-behavior: auto;
  }
}
```

---

## 📝 ROOT LAYOUT

### app/layout.tsx

```typescript
import type { Metadata } from "next";
import { Instrument_Serif, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CuffKings — Premium Cufflinks for Men | Peshawar, Pakistan",
  description: "Premium men's cufflinks featuring polished metal, enamel, crystal, and engraved patterns. Based in Peshawar, Pakistan.",
  keywords: "cufflinks, men's accessories, formal wear, gold cufflinks, silver cufflinks, Peshawar, Pakistan",
  authors: [{ name: "CuffKings" }],
  openGraph: {
    title: "CuffKings — Premium Cufflinks for Men",
    description: "Premium men's cufflinks featuring polished metal, enamel, crystal, and engraved patterns.",
    type: "website",
    locale: "en_US",
    url: "https://cuffkings.com",
    siteName: "CuffKings",
  },
  twitter: {
    card: "summary_large_image",
    title: "CuffKings — Premium Cufflinks for Men",
    description: "Premium men's cufflinks featuring polished metal, enamel, crystal, and engraved patterns.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${cormorantGaramond.variable} ${manrope.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 🗄️ DATA LAYER

### lib/products.ts

```typescript
export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  description: string;
  longDescription?: string;
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
    longDescription: "Gold-tone metal base with high-polish finish. Ivory enamel fill, applied carefully and leveled flush. Pavé-set crystals — small, precise, light-catching. Polished edges where metal meets enamel cleanly.",
    material: "Gold-tone metal",
    finish: "High polish",
    color: "Ivory & Gold",
    pattern: "Crystal pavé",
    images: [
      "/products/ivory-pave-gold-1.jpg",
      "/products/ivory-pave-gold-2.jpg",
      "/products/ivory-pave-gold-3.jpg",
    ],
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
      care: "Wipe clean with soft cloth. Avoid water contact. Store in provided box.",
    },
  },
  {
    id: "blue-enamel-silver",
    slug: "blue-enamel-silver-cufflinks",
    name: "Blue Enamel Silver Cufflinks",
    price: 3800,
    description: "Silver-tone metal with deep blue enamel. Geometric pattern, polished finish.",
    material: "Silver-tone metal",
    finish: "High polish",
    color: "Blue & Silver",
    pattern: "Geometric",
    images: ["/products/blue-enamel-silver-1.jpg"],
    category: "Blue Cufflinks",
    categorySlug: "blue-cufflinks",
    isFeatured: true,
    isNew: true,
    isLimited: false,
    stock: "in-stock",
    details: {
      dimensions: "14mm × 18mm",
      weight: "10g per pair",
      fastening: "Whale back",
      care: "Wipe clean. Avoid harsh chemicals.",
    },
  },
  // Add more products...
];

// Utility functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "all") return products;
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(limit?: number): Product[] {
  const featured = products.filter((p) => p.isFeatured);
  return limit ? featured.slice(0, limit) : featured;
}

export function getNewProducts(limit?: number): Product[] {
  const newProducts = products.filter((p) => p.isNew);
  return limit ? newProducts.slice(0, limit) : newProducts;
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.material.toLowerCase().includes(lowerQuery) ||
      p.color.toLowerCase().includes(lowerQuery)
  );
}

export function filterProducts(filters: {
  category?: string;
  priceRange?: [number, number];
  colors?: string[];
  finishes?: string[];
  inStockOnly?: boolean;
}): Product[] {
  let filtered = [...products];

  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((p) => p.categorySlug === filters.category);
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter((p) => {
      const price = p.salePrice || p.price;
      return price >= min && price <= max;
    });
  }

  if (filters.colors && filters.colors.length > 0) {
    filtered = filtered.filter((p) =>
      filters.colors!.some((color) => p.color.toLowerCase().includes(color.toLowerCase()))
    );
  }

  if (filters.finishes && filters.finishes.length > 0) {
    filtered = filtered.filter((p) =>
      filters.finishes!.some((finish) => p.finish.toLowerCase().includes(finish.toLowerCase()))
    );
  }

  if (filters.inStockOnly) {
    filtered = filtered.filter((p) => p.stock === "in-stock");
  }

  return filtered;
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "newest":
      return sorted.sort((a, b) => (a.isNew ? -1 : 1));
    case "price-low-high":
      return sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    case "price-high-low":
      return sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    case "featured":
    default:
      return sorted.sort((a, b) => (a.isFeatured ? -1 : 1));
  }
}

export const categories = [
  { name: "All Cufflinks", slug: "all" },
  { name: "Gold Cufflinks", slug: "gold-cufflinks" },
  { name: "Silver Cufflinks", slug: "silver-cufflinks" },
  { name: "Blue Cufflinks", slug: "blue-cufflinks" },
  { name: "Gunmetal Cufflinks", slug: "gunmetal-cufflinks" },
  { name: "Crystal Cufflinks", slug: "crystal-cufflinks" },
  { name: "Gift Sets", slug: "gift-sets" },
];
```

---

## ✅ VALIDATION

### lib/validators.ts

```typescript
import { z } from "zod";

// Checkout form validation
export const checkoutFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z
    .string()
    .regex(
      /^\+92[0-9]{10}$/,
      "Please enter a valid Pakistani phone number in format: +92XXXXXXXXXX"
    ),
  address: z
    .string()
    .min(10, "Please enter your complete address")
    .max(500, "Address must be less than 500 characters"),
  city: z
    .string()
    .min(2, "Please enter your city")
    .max(100, "City name must be less than 100 characters"),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

// Contact form validation (if needed)
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

---

## 📱 WHATSAPP INTEGRATION

### lib/whatsapp.ts

```typescript
import { CartItem } from "@/store/cartStore";
import { CheckoutFormData } from "./validators";

/**
 * Generate WhatsApp message from cart items and customer info
 */
export function generateWhatsAppMessage(
  items: CartItem[],
  formData: CheckoutFormData,
  totalPrice: number
): string {
  let message = "Hello! I'd like to order from CuffKings:\n\n";

  // Add each product
  items.forEach((item) => {
    message += `• ${item.name}\n`;
    message += `  Quantity: ${item.quantity}\n`;
    message += `  Price: Rs. ${item.price.toLocaleString()}\n`;
    message += `  Subtotal: Rs. ${(item.price * item.quantity).toLocaleString()}\n\n`;
  });

  message += `*Total: Rs. ${totalPrice.toLocaleString()}*\n\n`;
  message += "📦 *Delivery Details:*\n";
  message += `Name: ${formData.name}\n`;
  message += `Phone: ${formData.phone}\n`;
  message += `Address: ${formData.address}\n`;
  message += `City: ${formData.city}\n\n`;
  message += "Please confirm the order and provide shipping details.";

  return message;
}

/**
 * Open WhatsApp with pre-filled message
 */
export function openWhatsApp(message: string, phoneNumber?: string): void {
  const number = phoneNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${number}?text=${encodedMessage}`;

  // Open in new tab
  window.open(url, "_blank");
}

/**
 * Generate WhatsApp contact link
 */
export function getWhatsAppContactLink(
  message: string = "Hello! I have a question about CuffKings products."
): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
}
```

---

## 🛒 STATE MANAGEMENT

### store/cartStore.ts

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  material?: string;
  finish?: string;
  color?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (id: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            // Increase quantity if item already exists
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }

          // Add new item with quantity 1
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
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemQuantity: (id) => {
        const item = get().items.find((i) => i.id === id);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "cuffkings-cart", // localStorage key
    }
  )
);
```

---

## 🎬 GSAP UTILITIES

### lib/gsap-utils.ts

```typescript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Fade up animation
 */
export function fadeUp(
  element: HTMLElement | null,
  options?: {
    delay?: number;
    duration?: number;
    y?: number;
  }
) {
  if (!element || prefersReducedMotion()) return;

  gsap.from(element, {
    opacity: 0,
    y: options?.y || 50,
    duration: options?.duration || 0.8,
    delay: options?.delay || 0,
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    },
  });
}

/**
 * Stagger children animation
 */
export function staggerChildren(
  container: HTMLElement | null,
  options?: {
    stagger?: number;
    duration?: number;
    y?: number;
  }
) {
  if (!container || prefersReducedMotion()) return;

  const children = Array.from(container.children) as HTMLElement[];

  gsap.from(children, {
    opacity: 0,
    y: options?.y || 30,
    duration: options?.duration || 0.6,
    stagger: options?.stagger || 0.1,
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
    },
  });
}

/**
 * Clip-path reveal animation
 */
export function clipPathReveal(
  element: HTMLElement | null,
  options?: {
    direction?: "bottom" | "top" | "left" | "right";
    duration?: number;
    delay?: number;
  }
) {
  if (!element || prefersReducedMotion()) return;

  const direction = options?.direction || "bottom";
  let clipPath = "inset(0 0 100% 0)"; // from bottom (default)

  if (direction === "top") clipPath = "inset(100% 0 0 0)";
  if (direction === "left") clipPath = "inset(0 100% 0 0)";
  if (direction === "right") clipPath = "inset(0 0 0 100%)";

  gsap.from(element, {
    clipPath,
    duration: options?.duration || 1,
    delay: options?.delay || 0,
    ease: "power3.out",
  });
}

/**
 * Scale on hover
 */
export function scaleOnHover(
  element: HTMLElement | null,
  scale: number = 1.05
): (() => void) | undefined {
  if (!element || prefersReducedMotion()) return;

  const handleMouseEnter = () => {
    gsap.to(element, {
      scale,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  element.addEventListener("mouseenter", handleMouseEnter);
  element.addEventListener("mouseleave", handleMouseLeave);

  // Return cleanup function
  return () => {
    element.removeEventListener("mouseenter", handleMouseEnter);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
}

/**
 * Parallax effect
 */
export function parallax(
  element: HTMLElement | null,
  options?: {
    amount?: number;
    trigger?: HTMLElement | null;
  }
) {
  if (!element || prefersReducedMotion()) return;

  gsap.to(element, {
    y: -(options?.amount || 50),
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
}
```

---

## 🔍 SEO & METADATA

### Metadata for Each Page

```typescript
// app/shop/page.tsx
export const metadata: Metadata = {
  title: "Shop All Cufflinks | CuffKings",
  description: "Browse our complete collection of premium men's cufflinks. Gold, silver, blue, gunmetal, and crystal designs.",
};

// app/about/page.tsx
export const metadata: Metadata = {
  title: "About Us | CuffKings",
  description: "Learn about CuffKings — premium men's cufflinks designed in Peshawar, Pakistan.",
};

// app/product/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: "Product Not Found | CuffKings",
    };
  }

  return {
    title: `${product.name} | CuffKings`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}
```

---

## 🚀 DEPLOYMENT

### Build & Deploy

```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Deploy to Vercel
vercel deploy --prod
```

### Environment Variables (Production)

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=923001234567
NEXT_PUBLIC_SITE_URL=https://cuffkings.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## ✅ TESTING CHECKLIST

### Pre-Deployment Testing

**Functionality:**
- [ ] All pages load without errors
- [ ] Navigation links work
- [ ] Product filtering works
- [ ] Product sorting works
- [ ] Add to cart works
- [ ] Cart quantity updates work
- [ ] Remove from cart works
- [ ] Cart persists on refresh
- [ ] Checkout form validation works
- [ ] WhatsApp message generates correctly
- [ ] WhatsApp opens with message

**Responsive:**
- [ ] Mobile (375px) - All pages
- [ ] Tablet (768px) - All pages
- [ ] Desktop (1440px) - All pages
- [ ] Large Desktop (1920px) - All pages

**Performance:**
- [ ] Lighthouse score > 90
- [ ] Images optimized
- [ ] No console errors
- [ ] No unnecessary re-renders

**Accessibility:**
- [ ] All images have alt text
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Reduced motion works
- [ ] Color contrast passes WCAG AA

---

**End of Technical Implementation Guide**

*Last Updated: January 2026*
