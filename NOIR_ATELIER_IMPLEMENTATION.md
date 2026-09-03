# CuffKings Noir Atelier — Implementation Status

This document tracks the implementation of the complete Noir Atelier design system for CuffKings.

---

## Design Direction

**From:** Light editorial (Ink Green + Khaddar Ivory)  
**To:** Dark cinematic luxury (Obsidian + Champagne Brass)

**Core Principle:** The product is always the hero. Dark, masculine, refined, sensual, modern, tactile, editorial, confident.

---

## ✅ Phase 1: Core Design Tokens (COMPLETED)

### Color Palette
- ✅ Updated Tailwind config with Noir Atelier palette
  - `obsidian: #101110` (primary dark)
  - `deep-petrol: #203A3A` (secondary dark)
  - `porcelain: #F3EFE7` (light surface)
  - `champagne-brass: #C6A15B` (gold accent)
  - `deep-wine: #641F2B` (sale/limited accent)
  - `warm-charcoal: #211D19` (text on light)

### Typography
- ✅ Replaced Fraunces with **Instrument Serif** (primary display)
- ✅ Added **Cormorant Garamond** (fallback display)
- ✅ Kept **Manrope** for body/UI
- ✅ Implemented responsive `clamp()` typography scale
- ✅ Updated font variables in layout.tsx

### Layout
- ✅ Sharp corners (0px border-radius default, max 2px)
- ✅ Updated border styles (hairline, champagne-brass accents)
- ✅ CSS custom properties for design tokens
- ✅ Updated global styles (globals.css)

---

## ✅ Phase 2: Core Components (COMPLETED)

### UI Components
- ✅ **Button** - Updated with Noir Atelier colors and hover effects
- ✅ **Badge** - Updated variants (default, sale, limited)
- ✅ **BrassLine** - New component for section dividers

### Layout Components
- ✅ **Navbar** - Complete redesign:
  - Fixed/transparent over hero
  - Obsidian background on scroll
  - Champagne brass accents
  - Full-screen mobile menu
  - Removed "Home" link (logo serves this purpose)
  
- ✅ **Footer** - Updated with:
  - Obsidian background
  - Porcelain text
  - Champagne brass accents and dividers
  - Refined spacing

---

## ✅ Phase 3: Home Page Components (COMPLETED)

- ✅ **HeroNoir** - Brand new cinematic hero:
  - GSAP entrance animations
  - Full viewport height
  - Product image with overlay
  - Clip-path reveals
  - Champagne brass line accent
  - Scroll indicator
  - Reduced motion support

- ✅ **CollectionIntro** - New component:
  - Porcelain background section
  - GSAP ScrollTrigger animations
  - Editorial typography

- ✅ **FeaturedProductStory** - New component:
  - 2-column layout (image + details)
  - Numbered detail sections (01-04)
  - Sequential GSAP reveals
  - Obsidian background

- ✅ Updated **Homepage** structure with BrassLine dividers

---

## 📦 Dependencies

- ✅ **GSAP 3.12.5** installed (replaced Framer Motion)
- ✅ **GSAP ScrollTrigger** registered in components
- ✅ Zustand (cart state management)
- ✅ Zod (form validation)

---

## 🚧 Phase 4: Remaining Components (IN PROGRESS)

### Home Page
- ⏳ **FeaturedProducts** - Needs Noir Atelier styling
- ⏳ **BrandStory** - Needs obsidian background + styling updates
- ⏳ **FinalCTA** - Needs styling updates
- ⏳ **CraftSection** - Remove or integrate into new design
- ⏳ **CategoryGrid** - Redesign with asymmetric editorial grid

### Shop Pages
- ⏳ **ProductCard** - Update hover effects with GSAP
- ⏳ **ProductGrid** - Implement asymmetric editorial grid
- ⏳ **FilterSidebar** - Noir Atelier styling
- ⏳ **Shop page** - Porcelain background, updated typography

### Product Pages
- ⏳ **ProductDetail page** - 60/40 split layout
- ⏳ **ImageGallery** - GSAP transitions, zoom functionality
- ⏳ **AddToCartButton** - Noir styling + micro-interactions

### Cart & Checkout
- ⏳ **Cart page** - Noir Atelier theme
- ⏳ **CartItem** - Updated styling
- ⏳ **CartSummary** - Updated styling
- ⏳ **CheckoutForm** - Porcelain background, refined inputs

### Static Pages
- ⏳ **About page** - Editorial layout, obsidian sections
- ⏳ **Contact page** - Clean minimal design

### Utilities
- ⏳ **ProductPlaceholder** - Update for dark theme
- ⏳ **StitchDivider** - Replace with BrassLine or remove

---

## 🎯 Phase 5: Advanced Features (TODO)

### Animation & Motion
- ⏳ **Custom Cursor** (desktop only)
  - Small dot default
  - "View" on product hover
  - "Explore" on image hover
  - "Open" on CTA hover
  - Touch device detection

- ⏳ **Magnetic Interactions** (major CTAs only)
  - 5-10px max movement
  - GSAP smooth following

- ⏳ **Page Transitions**
  - Obsidian layer
  - Champagne brass line
  - 600-1000ms duration

- ⏳ **Horizontal Collection Section**
  - GSAP ScrollTrigger pinning
  - Horizontal product travel
  - Mobile-friendly alternative

### Product Experience
- ⏳ **Product zoom functionality**
- ⏳ **Related products**
- ⏳ **Image gallery improvements**

---

## 📋 Technical Checklist

### Performance
- ✅ Next.js Image optimization configured
- ✅ Server Components by default
- ✅ Client Components only where needed
- ⏳ GSAP cleanup and lifecycle management
- ⏳ ScrollTrigger optimization
- ⏳ Dynamic imports for heavy animations

### Accessibility
- ✅ Reduced motion support in global CSS
- ✅ Reduced motion checks in GSAP animations
- ✅ Semantic HTML structure
- ⏳ Keyboard navigation testing
- ⏳ Focus states verification
- ⏳ Screen reader testing
- ⏳ WCAG AA contrast verification (new palette)

### Responsive
- ✅ Mobile-first approach maintained
- ⏳ Test all breakpoints (320px - 1920px)
- ⏳ Touch target sizes (44px minimum)
- ⏳ Mobile menu functionality
- ⏳ Disable desktop-only features on mobile

---

## 🎨 Design Quality Checklist

Before approving any component:

- [ ] Does it look AI-generated? (If yes, redesign)
- [ ] Does it look like SaaS? (If yes, improve editorial hierarchy)
- [ ] Does it look like a generic template? (If yes, add unique composition)
- [ ] Is animation distracting? (If yes, reduce or remove)
- [ ] Does the product feel expensive? (Scale, photography, spacing)
- [ ] Does it feel masculine? (Typography, contrast, imagery)
- [ ] Does it feel modern? (Simplified UI, refined motion)
- [ ] Does it feel tactile? (Material photography forward)
- [ ] Does it feel like CuffKings? (Product always hero)

---

## 🚀 Deployment Readiness

### Before Launch
- [ ] All components migrated to Noir Atelier
- [ ] GSAP animations optimized and tested
- [ ] Performance audit completed
- [ ] Accessibility audit completed
- [ ] Mobile testing on real devices
- [ ] Cross-browser testing
- [ ] Product images optimized
- [ ] SEO metadata updated
- [ ] Analytics configured
- [ ] Error tracking configured

### Content
- [ ] Product photography meets guidelines
- [ ] Copy follows Noir Atelier tone
- [ ] No generic luxury claims
- [ ] All CTAs use specific language
- [ ] Metadata and alt text updated

---

## 📊 Migration Timeline

**Week 1: Core Foundation** (COMPLETED ✅)
- Design tokens
- Typography
- Core components (Button, Badge, Navbar, Footer)
- New Hero component

**Week 2: Home Page** (IN PROGRESS 🚧)
- All homepage sections
- GSAP ScrollTrigger integration
- Featured product storytelling
- Collection showcases

**Week 3: Shop & Product Pages** (TODO ⏳)
- Shop grid redesign
- Product detail pages
- Cart experience
- Checkout flow

**Week 4: Polish & Advanced Features** (TODO ⏳)
- Custom cursor
- Magnetic interactions
- Page transitions
- Performance optimization
- Accessibility audit

**Week 5: Testing & Launch** (TODO ⏳)
- Cross-browser testing
- Mobile device testing
- Performance testing
- Final QA
- Deployment

---

## 📝 Notes

### Key Differences from Previous Design

| Aspect | Previous (Light) | New (Noir Atelier) |
|--------|------------------|---------------------|
| **Primary BG** | Khaddar Ivory (#F1E9D8) | Obsidian (#101110) |
| **Accent** | Antique Brass (#B8925A) | Champagne Brass (#C6A15B) |
| **Display Font** | Fraunces | Instrument Serif / Cormorant Garamond |
| **Animation** | Framer Motion | GSAP + ScrollTrigger |
| **Style** | Light editorial | Dark cinematic luxury |
| **Corners** | 1-3px radius | 0px (sharp) |
| **Motion** | Subtle, restrained | Cinematic, editorial |

### Design Principles

1. **Product first** - Always the visual hero
2. **Black + Gold** - Core identity colors
3. **Sharp, not rounded** - Tailored aesthetic
4. **Generous space** - Editorial breathing room
5. **Cinematic motion** - GSAP for quality animations
6. **Masculine refinement** - Typography + contrast
7. **Tactile materials** - Photography prominence
8. **No AI patterns** - Avoid generic gradients/blobs
9. **No SaaS vibes** - Editorial, not dashboard
10. **Specific copy** - Human, not marketing fluff

---

## 🔗 References

- **Full Design Spec**: `CuffKings_DESIGN (2).md`
- **Previous Design**: `DESIGN.md` (archived)
- **README**: `README.md`
- **Tailwind Config**: `tailwind.config.ts`
- **Global Styles**: `app/globals.css`

---

**Last Updated**: January 2025  
**Current Phase**: 3/5 (Home Page Components)  
**Completion**: ~40%
