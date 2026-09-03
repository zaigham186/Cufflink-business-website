# CuffKings — Premium Men's Cufflinks (Noir Atelier)

A premium e-commerce website for CuffKings, a men's cufflinks brand based in Peshawar, Pakistan. Features a dark, cinematic luxury experience focused on showcasing products as the hero.

## 🎨 Design Direction: Noir Atelier

**Dark. Masculine. Refined. Sensual. Modern. Tactile. Editorial. Confident.**

The site feels like entering a carefully lit, private tailoring and accessories atelier — not a generic fashion store.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Instrument Serif (display), Cormorant Garamond (fallback), Manrope (body/UI)
- **State Management**: Zustand (cart)
- **Animation**: GSAP + ScrollTrigger (cinematic motion)
- **Validation**: Zod
- **Checkout**: WhatsApp integration (client-side only)

## Design System

### Noir Atelier Color Palette

The website's identity is a **black-and-gold theme**:

- **Obsidian** (#101110) - Primary dark surface
- **Deep Petrol** (#203A3A) - Secondary dark (accent sections)
- **Porcelain** (#F3EFE7) - Light surface for readability
- **Champagne Brass** (#C6A15B) - Gold accent (sparingly used)
- **Deep Wine** (#641F2B) - Sale/limited badges only
- **Warm Charcoal** (#211D19) - Text on light surfaces

### Typography

- **Display**: Instrument Serif (fallback: Cormorant Garamond) - editorial, elegant, masculine
- **Body/UI**: Manrope - precise, clean, modern, readable
- **Style**: Sentence case (no all-caps except brand name)
- **Scale**: Responsive `clamp()` values for fluid typography

### Visual Style

- **Layout**: Editorial, asymmetric grids (12-column)
- **Corners**: Sharp (0px) or minimal (2px max)
- **Borders**: Hairline (1px) with champagne brass accents
- **Spacing**: Generous whitespace, editorial breathing room
- **Motion**: Cinematic GSAP animations, ScrollTrigger reveals
- **Photography**: Product is always the hero

## Project Structure

```
app/
├── layout.tsx          # Root layout with fonts & navigation
├── page.tsx            # Homepage
├── shop/               # Shop pages
│   ├── page.tsx        # All products with filtering
│   └── [category]/     # Category-specific pages
├── product/[slug]/     # Product detail pages
├── cart/               # Cart page
├── checkout/           # Checkout with WhatsApp
├── about/              # About page
├── contact/            # Contact page
└── not-found.tsx       # 404 page

components/
├── home/               # Homepage sections
├── shop/               # Shop components
├── product/            # Product detail components
├── cart/               # Cart components
├── checkout/           # Checkout components
├── layout/             # Navbar, Footer
└── ui/                 # Reusable UI components

lib/
├── products.ts         # Static product data + accessor functions
├── whatsapp.ts         # WhatsApp URL generation
└── validators.ts       # Zod schemas

store/
└── cartStore.ts        # Zustand cart state
```

## Key Architecture Decisions

### Design Philosophy

**The product is always the hero.** The interface creates a black-and-gold stage with obsidian darkness and champagne brass accents. The products themselves provide the visual richness — gold, silver, blue enamel, ivory, gunmetal, crystals.

**Black + Gold restraint**: Gold is used only as fine accents (hairline rules, borders, hover states, CTAs on dark surfaces) — never flooding large surfaces. This restraint makes the gold feel valuable.

### Data Layer (lib/products.ts)

Static product data with typed accessor functions:
- `getAllProducts()`
- `getFeaturedProducts()`
- `getProductBySlug(slug)`
- `getProductsByCategory(categorySlug)`

**Important**: This design isolates data access in one file. When swapping to a real database, only `lib/products.ts` changes — components remain untouched.

### Checkout Flow (WhatsApp-only)

1. User fills checkout form (name, phone, address, city)
2. Validated with Zod
3. Order details formatted and URL-encoded
4. Opens WhatsApp with pre-filled message
5. User sends message to confirm order
6. No backend, no order storage, no payment processing at this stage

### Motion System (GSAP)

- **Cinematic animations**: GSAP + ScrollTrigger for quality motion
- **Hero entrance**: Clip-path reveals, staggered text
- **Scroll reveals**: One-time fade-up on scroll into view
- **Product hovers**: Subtle scale transforms (1.03-1.07x)
- **Page transitions**: Obsidian layer with brass line (coming soon)
- **Custom cursor**: Desktop only (coming soon)
- **Magnetic CTAs**: 5-10px movement on major actions (coming soon)
- **Full reduced-motion support**: All animations respect user preferences

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=923001234567
```
(Replace with actual business WhatsApp number, no + sign)

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
npm run build
npm start
```

## Product Data

Current seed data includes 6 products:
1. **Ivory Pavé Gold Cufflinks** (featured, has photography)
2. **Sapphire Ornamental Cufflinks** (featured, has photography)
3. **Onyx Geometric Cufflinks** (featured, has photography)
4. **Gold Trellis Crystal Cufflinks** (has photography)
5. **Royal Blue Floral Cufflinks** (placeholder)
6. **Black Patterned Gunmetal Cufflinks** (placeholder)

Products 1-4 should have actual product images in `/public/products/`. Products 5-6 use a branded placeholder component.

### To Add Real Product Photos
1. Add images to `/public/products/` directory
2. Update image paths in `lib/products.ts`
3. Set `hasPhotography: true` for those products

### To Add New Products
Edit `lib/products.ts` and add new product objects to the `products` array. Follow the existing type structure.

## What's NOT Included (By Design)

This is **frontend-only**. The following are deliberately excluded:

- No MongoDB/database
- No API routes
- No admin panel
- No Cloudinary integration
- No deployment configuration
- No authentication
- No payment processing
- No order management system

These will be added in a separate backend implementation (Prompt 2).

## Accessibility

- Semantic HTML
- Full keyboard navigation
- Visible focus states
- Accessible forms with validation
- Image alt text
- Sufficient color contrast (WCAG AA)
- Reduced motion support

## Browser Support

- Modern browsers (last 2 versions)
- Mobile-first responsive design
- Tested breakpoints: 320px, 375px, 390px, 430px, 768px, 1024px, 1440px, 1920px

## Performance

- Next.js Image optimization
- Server Components by default
- Client Components only where needed (cart, animations, forms)
- Static generation for product pages

## License

Proprietary - CuffKings
