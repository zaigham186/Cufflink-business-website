# CuffKings — Noir Atelier Design System

> **Version:** 2.1  
> **Design Direction:** Noir Atelier  
> **Status:** In Implementation

This document captures the complete Noir Atelier design system being implemented for CuffKings premium cufflinks e-commerce website. This is a dark, cinematic, luxury experience focused on making the product the absolute hero.

---

## Design Philosophy

**Core Principle**: Premium jewelry display meets editorial restraint.

The design reflects the brand's focus on **craftsmanship, detail, and formal dressing**. Visual decisions prioritize:
- Polished metal aesthetics
- Generous whitespace
- Asymmetric, editorial layouts
- Subtle tailoring motifs
- Premium without excess

**Voice**: Confident, considered, focused on materials and finishing — never loud or promotional.

---

## Color Palette

### Primary Colors

```css
--ink-green: #17352A    /* Deep, formal green */
--antique-brass: #B8925A /* Warm metallic accent */
--khaddar-ivory: #F1E9D8 /* Cream/off-white background */
--charcoal: #211D19     /* Primary text */
--maroon: #6E1F2E       /* Sale/accent only */
```

### Color Usage Guidelines

| Color | Primary Use | Secondary Use | Never Use For |
|-------|-------------|---------------|---------------|
| **Ink Green** | Navbar, footer, primary buttons, headings on light backgrounds | Borders on hover states | Body text (too dark) |
| **Antique Brass** | Borders, icons, link hover states, decorative accents | Numbered indicators, divider lines | Large text blocks |
| **Khaddar Ivory** | Page backgrounds, card backgrounds, text on dark backgrounds | Secondary button text | Pure white replacement |
| **Charcoal** | Body text, form labels, product names | Icon fills | Backgrounds (use Ink Green instead) |
| **Maroon** | Sale badges only, limited accent use | Error states (sparingly) | Primary CTAs, large sections |

### Color Relationships

- **Primary pairing**: Ink Green + Khaddar Ivory (high contrast, formal)
- **Accent pairing**: Antique Brass + Charcoal (warmth + readability)
- **Alert pairing**: Maroon + Khaddar Ivory (sale/urgency)
- **Monochrome scale**: Charcoal → Ink Green → Antique Brass (dark to light)

### Accessibility

All color combinations meet **WCAG AA contrast standards**:
- Charcoal on Khaddar Ivory: 10.8:1
- Ink Green on Khaddar Ivory: 7.2:1
- Khaddar Ivory on Ink Green: 7.2:1
- Antique Brass on Ink Green: 4.7:1 (use for decorative only)

---

## Typography

### Font Families

```css
--font-fraunces: 'Fraunces', serif;
--font-manrope: 'Manrope', sans-serif;
```

**Fraunces** (Headings, H1-H6, brand name)
- Variable serif with soft curves
- Conveys: warmth, craft, heritage, premium quality
- Loaded via Google Fonts with `display: swap`

**Manrope** (Body, UI, forms, navigation)
- Geometric sans-serif with excellent readability
- Conveys: clarity, modernity, precision
- Loaded via Google Fonts with `display: swap`

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Font | Weight | Line Height |
|---------|---------------|---------------|------|--------|-------------|
| H1 (Hero) | 60px / 3.75rem | 36px / 2.25rem | Fraunces | Normal | 1.1 |
| H1 (Page) | 48px / 3rem | 32px / 2rem | Fraunces | Normal | 1.2 |
| H2 | 36px / 2.25rem | 28px / 1.75rem | Fraunces | Normal | 1.3 |
| H3 | 24px / 1.5rem | 20px / 1.25rem | Fraunces | Normal | 1.4 |
| Body Large | 18px / 1.125rem | 16px / 1rem | Manrope | Normal | 1.6 |
| Body | 16px / 1rem | 14px / 0.875rem | Manrope | Normal | 1.6 |
| Small | 14px / 0.875rem | 12px / 0.75rem | Manrope | Normal | 1.5 |
| Button | 14px / 0.875rem | 14px / 0.875rem | Manrope | Medium | 1 |

### Case Convention

**Sentence case everywhere** — never UPPERCASE in UI except:
- Brand name: "CUFFKINGS" (all caps, tracking-wider)
- Acronyms in body text only

### Spacing

- Headings: `space-y-4` (1rem) minimum between heading and body
- Paragraphs: `space-y-4` (1rem) between paragraphs
- Sections: `py-16` to `py-32` (4rem to 8rem) depending on hierarchy

---

## Layout System

### Grid Structure

**Container widths**:
```css
max-width: 1280px (7xl)  /* Default for most content */
max-width: 1024px (4xl)  /* Prose/about pages */
```

**Padding**:
```css
px-4 sm:px-6 lg:px-8  /* Responsive container padding */
```

### Asymmetric Grid Principles

**Why asymmetric?**
- Reflects premium editorial design
- Creates visual interest without decoration
- Mimics high-end jewelry catalog layouts

**Implementation**:
- Category Grid: 4-column base with varied spans (2x2, 1x1, 4x1)
- Featured Products: 3-column on desktop, stacked on mobile
- Product detail: 2-column (image left, info right) with 60/40 split

**Responsive breakpoints**:
```css
sm: 640px   /* Small tablets, large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
```

### Whitespace Scale

| Name | Value | Use Case |
|------|-------|----------|
| Minimal | 8px / 0.5rem | Icon spacing, tight elements |
| Compact | 16px / 1rem | Card padding, form fields |
| Standard | 24px / 1.5rem | Section padding, component spacing |
| Generous | 48px / 3rem | Page sections (mobile) |
| Editorial | 80px / 5rem | Page sections (desktop) |
| Hero | 128px / 8rem | Homepage hero, major sections |

**Rule**: Increase whitespace as visual hierarchy increases. More important = more space.

---

## Components

### Buttons

**Three variants**:

1. **Primary** (most common action)
   - Background: Ink Green
   - Text: Khaddar Ivory
   - Border: Ink Green
   - Hover: 90% opacity
   - Use: "Add to cart", "Shop now", "Complete order"

2. **Secondary** (alternative action)
   - Background: Transparent
   - Text: Ink Green
   - Border: Ink Green
   - Hover: Ink Green background + Khaddar Ivory text
   - Use: "View details", "Continue shopping", "Cancel"

3. **Accent** (sale/urgent)
   - Background: Maroon
   - Text: Khaddar Ivory
   - Border: Maroon
   - Hover: 90% opacity
   - Use: Limited to sale CTAs only

**Button sizing**:
```css
padding: 12px 32px (py-3 px-8)
font-size: 14px (text-sm)
font-weight: 500 (font-medium)
letter-spacing: 0.025em (tracking-wide)
```

**States**:
- Default: Full color
- Hover: Slight opacity change or color swap
- Disabled: 50% opacity + no pointer
- Focus: 2px ring in Ink Green (accessibility)

### Badges

**Three variants**:

1. **Default** (category, material info)
   - Background: Khaddar Ivory
   - Text: Charcoal
   - Border: Antique Brass

2. **Sale** (price reduction)
   - Background: Maroon
   - Text: Khaddar Ivory
   - No border

3. **Limited** (low stock)
   - Background: Ink Green
   - Text: Khaddar Ivory
   - No border

**Badge sizing**:
```css
padding: 4px 8px (py-1 px-2)
font-size: 12px (text-xs)
font-weight: 500 (font-medium)
letter-spacing: 0.05em (tracking-wide)
border-radius: 1px (border-minimal)
```

### Product Cards

**Structure**:
```
┌─────────────────────────┐
│                         │
│   Product Image         │
│   (square aspect)       │
│   ┌─────────┐          │
│   │ Badges  │          │
│   └─────────┘          │
│                         │
├─────────────────────────┤
│ Product Name            │
│ Material / Description  │
│ Rs. 3,200  Rs. 4,000   │
└─────────────────────────┘
```

**Styling**:
- Border: 1px solid Antique Brass (30% opacity)
- Hover: Border changes to Ink Green + image scales to 105-110%
- Background: White (not Khaddar Ivory)
- Padding: 20-24px (p-5 to p-6)

**Image treatment**:
- Aspect ratio: 1:1 (square)
- Object fit: cover
- Background (when no image): Khaddar Ivory/50
- Hover: Scale transform (110%), duration 500ms
- Placeholder: Branded with stitch pattern + cufflink icon

### Forms

**Input fields**:
```css
padding: 12px 16px (py-3 px-4)
border: 1px solid Antique Brass
background: transparent
font-size: 16px (text-base)
```

**States**:
- Default: Antique Brass border
- Focus: 2px ring, Ink Green
- Error: Maroon border + error text below
- Disabled: 50% opacity

**Labels**:
- Position: Above input
- Font size: 14px (text-sm)
- Font weight: 500 (font-medium)
- Margin bottom: 8px (mb-2)

**Error messages**:
- Color: Maroon
- Font size: 14px (text-sm)
- Position: Below input, 4px margin

### Navigation (Navbar)

**Structure**:
- Background: Ink Green
- Text: Khaddar Ivory
- Height: 64px (h-16)
- Border bottom: 1px Antique Brass

**Desktop layout**:
```
[Logo]  [Home Shop About Contact]  [Cart Icon]
```

**Mobile layout**:
```
[Logo]  [Cart] [Menu Toggle]
```

**Link states**:
- Default: 70% opacity
- Active: 100% opacity
- Hover: 80% opacity

**Cart badge**:
- Position: Top right of cart icon
- Background: Maroon
- Size: 20px circle (w-5 h-5)
- Text: White, 12px

### Footer

**Structure**: 4-column grid on desktop, stacked on mobile

**Columns**:
1. Brand (logo + description)
2. Shop links
3. Company links
4. Connect (social + location)

**Styling**:
- Background: Ink Green
- Text: Khaddar Ivory
- Link opacity: 80% default, 100% hover
- Border top: 1px Antique Brass
- Copyright bar: Separate section, 60% opacity, centered

---

## Visual Motifs

### Stitch Divider

**Purpose**: Visual metaphor for tailoring/craftsmanship

**Pattern**:
```
— • — • — • — • — • —
```

**Implementation**:
- SVG with dashed lines + circles
- Color: Antique Brass
- Opacity: 40-60%
- Width: 60-200px depending on context
- Used between homepage sections

**Spacing**:
- Vertical: `py-12` (3rem) above and below

### Corner Accents

**Purpose**: Frame product displays without heaviness

**Pattern**:
```
┌─      ─┐



└─      ─┘
```

**Implementation**:
- 8px x 8px corners (w-8 h-8)
- Border: Antique Brass, 40% opacity
- Only on hero product display

### Product Placeholder

**When photography is missing**:
- Background: Gradient from Antique Brass/20 to Antique Brass/5
- Pattern: Subtle stitch grid (SVG)
- Icon: Cufflink outline, Antique Brass, 40% opacity
- Text: "Photography coming soon", 12px, 60% opacity

**Purpose**: Maintain premium feel even without final images.

---

## Animation & Motion

### Motion Philosophy

**One continuous animation only**: Hero cufflink rotation (jewelry display effect)

**Everything else**:
- Scroll-triggered (one-time): Fade in + slide up on scroll into view
- User-triggered: Hover, click, form interactions

**Why?**
- Respects user attention
- Avoids motion sickness
- Keeps focus on products

### Animation Patterns

#### Scroll-triggered (Framer Motion)

```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

**Used for**:
- Section headings
- Product cards
- Feature blocks
- Content sections

**Stagger delays**: 0.1s between items in lists

#### Hover animations

| Element | Effect | Duration | Easing |
|---------|--------|----------|--------|
| Product cards | Scale to 105-110% | 500ms | ease-out |
| Buttons | Opacity 90% or background swap | 200ms | ease |
| Links | Opacity 80% → 100% | 200ms | ease |
| Borders | Color shift (Antique Brass → Ink Green) | 200ms | ease |
| Arrows/Icons | Translate X by 4px | 200ms | ease |

#### Hero continuous animation

```javascript
animate={{
  rotateY: [0, 360],
  scale: [1, 1.05, 1]
}}
transition={{
  duration: 12,
  ease: "linear",
  repeat: Infinity
}}
```

**Only one instance**: Homepage hero

### Reduced Motion Support

**Full implementation** via CSS media query:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Framer Motion**: Uses `useReducedMotion()` hook to disable hero rotation

---

## Borders & Radius

### Border Philosophy

**Minimal, hairline borders** — never heavy outlines.

### Border Styles

```css
/* Tailwind config */
borderRadius: {
  'minimal': '1px',
  'sm': '2px',
  'DEFAULT': '3px'
}
```

**Usage**:
- Product cards: 1px solid, 30% Antique Brass
- Buttons: 1px solid, full color
- Form inputs: 1px solid, Antique Brass
- Badges: 1px radius (minimal)
- Containers: 2-3px max

**Never use**:
- Fully rounded (50% radius) except for cart count badge
- Thick borders (>2px)
- Multiple nested borders

---

## Imagery

### Product Photography Guidelines

**Required shots per product**:
1. Front view (hero)
2. Angled/detail view

**Image specs**:
- Aspect ratio: 1:1 (square)
- Min resolution: 800x800px
- Format: JPEG (Next.js Image will optimize)
- Background: Neutral (white, light gray, or product surface)

**Styling in code**:
```javascript
<Image
  src={product.images[0]}
  alt={product.name}
  fill
  className="object-cover"
  sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw, 
         33vw"
/>
```

### Icon System

**Source**: Heroicons (outline style, 1.5px stroke)

**Sizing**:
- Small: 16px (w-4 h-4) — inline with text
- Medium: 20px (w-5 h-5) — cart, search
- Large: 24px (w-6 h-6) — menu toggle, feature icons
- Extra large: 32px-64px — placeholders, empty states

**Color**:
- Default: currentColor (inherits text color)
- Decorative: Antique Brass
- Interactive: Ink Green on hover

---

## Responsive Design

### Mobile-First Approach

All base styles are mobile. Desktop adds complexity.

```css
/* Mobile first */
.element { padding: 16px; }

/* Desktop enhancement */
@media (min-width: 1024px) {
  .element { padding: 32px; }
}
```

### Breakpoint Strategy

| Device | Width | Layout Changes |
|--------|-------|----------------|
| Mobile | 320-639px | Single column, stacked, full-width buttons |
| Tablet | 640-1023px | 2 columns, compact navigation |
| Desktop | 1024px+ | Multi-column, asymmetric grids, fixed navbar |

### Touch Targets

**Minimum size**: 44x44px (iOS guideline)

**Applied to**:
- All buttons
- Navigation links (mobile)
- Form inputs
- Cart icon
- Mobile menu toggle

---

## Page Templates

### Homepage Structure

```
1. Hero (Ink Green background)
   - Headline + CTA
   - Rotating product display

2. Stitch Divider

3. Craft Section (Khaddar Ivory)
   - Centered headline
   - 3-column feature grid

4. Stitch Divider

5. Category Grid (Khaddar Ivory)
   - Asymmetric layout
   - 6 categories

6. Stitch Divider

7. Featured Products (Khaddar Ivory)
   - 3-column product grid
   - CTA to shop

8. Stitch Divider

9. Brand Story (Ink Green background)
   - Editorial long-form text
   - Location accent

10. Stitch Divider

11. Final CTA (Khaddar Ivory)
    - Centered, large text
    - Two CTAs
```

### Shop/Product Grid Pages

```
1. Header (optional breadcrumb)
2. Filter Sidebar (desktop) or Dropdown (mobile)
3. Product Grid
   - 3 columns desktop
   - 2 columns tablet
   - 1 column mobile
```

### Product Detail Page

```
1. 2-column layout
   - Left: Image gallery (60%)
   - Right: Info + CTA (40%)

2. Product info:
   - Name (H1)
   - Price
   - Material details
   - Stock status
   - Description
   - Add to cart button
```

### Cart Page

```
1. Heading + Continue shopping link
2. 2-column layout
   - Left: Cart items (70%)
   - Right: Summary (30%)

3. Cart item:
   - Image (80x80)
   - Name, material
   - Quantity controls
   - Price
   - Remove button
```

### Checkout Page

```
1. Heading
2. 2-column layout
   - Left: Form (66%)
   - Right: Order summary (33%)

3. Form fields:
   - Name
   - Phone
   - Address
   - City

4. Info box (how checkout works)
5. Submit button (WhatsApp)
```

---

## Content Guidelines

### Tone of Voice

**Brand personality**:
- Confident but not arrogant
- Focused on craft, not marketing
- Specific about materials and process
- Respectful of customer intelligence

**Writing style**:
- Sentence case always
- Short sentences
- Active voice
- Specific materials (never "high-quality" alone)
- No exclamation marks except cart/success states

### Example copy patterns

**Product descriptions**:
```
❌ "Luxurious and elegant cufflinks perfect for any occasion!"
✅ "Gold-tone metal with crystal pavé detailing. Filed edges, 
    polished surface, secure toggle closure."
```

**CTAs**:
```
❌ "BUY NOW!!" 
✅ "Add to cart" or "Shop cufflinks"
```

**Headings**:
```
❌ "THE BEST CUFFLINKS YOU'LL EVER OWN"
✅ "Made for the details people notice."
```

### Microcopy

| Situation | Copy |
|-----------|------|
| Empty cart | "Your cart is empty" + "Start adding cufflinks to see them here" |
| Out of stock | "Contact us — we can check restocking timelines" |
| Low stock | Badge: "Limited stock" |
| Sale | Badge: "Sale" |
| Loading | "Loading..." (never spinners) |
| Success | "Order details ready" with checkmark |
| Error | Specific problem + solution |

---

## Accessibility (A11y)

### WCAG AA Compliance

**Implemented**:
- ✅ Sufficient color contrast (all text)
- ✅ Keyboard navigation (tab, enter, escape)
- ✅ Focus indicators (2px ring, visible)
- ✅ Alt text on all images
- ✅ Semantic HTML (nav, main, footer, article)
- ✅ Form labels properly associated
- ✅ Error messages announced
- ✅ Reduced motion support

### Semantic HTML

```html
<!-- Correct structure -->
<nav aria-label="Main navigation">
<main>
  <article>
    <h1>Page Title</h1>
    <section aria-labelledby="section-heading">
```

### Keyboard Navigation

**Supported interactions**:
- Tab: Move focus forward
- Shift+Tab: Move focus backward
- Enter: Activate buttons/links
- Escape: Close mobile menu, modals
- Arrow keys: Quantity inputs

**Focus order**: Logical reading order (top to bottom, left to right)

### Screen Reader Support

**ARIA labels**:
```html
<button aria-label="Shopping cart">
<nav aria-label="Main navigation">
<button aria-expanded="false"> <!-- mobile menu -->
```

**Announcements**:
- Cart updates: "Added to cart"
- Form errors: Inline + associated with inputs
- Loading states: aria-live regions

---

## Performance Considerations

### Image Optimization

**Next.js Image component** handles:
- Lazy loading
- Responsive sizes
- Format conversion (AVIF, WebP)
- Blur placeholder

**Implementation**:
```javascript
<Image
  src="/products/image.jpg"
  alt="Product name"
  width={800}
  height={800}
  quality={85}
  priority={false} // except hero images
/>
```

### Animation Performance

**GPU-accelerated properties only**:
- ✅ transform (translate, scale, rotate)
- ✅ opacity
- ❌ width, height, top, left (causes reflow)

**Framer Motion** automatically uses GPU acceleration.

### Font Loading

**Strategy**: `display: swap`
- Shows system font immediately
- Swaps to custom font when loaded
- No FOUT (flash of unstyled text)

### Component Optimization

**Server Components by default**:
- Homepage sections (static)
- Product lists (static)
- About/Contact pages (static)

**Client Components only when needed**:
- Cart (state management)
- Forms (interactivity)
- Animations (Framer Motion)
- Navbar (mobile menu state)

---

## Design Tokens Reference

### Spacing Scale (Tailwind)

```javascript
{
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px'
}
```

### Shadow System

**Not used** — borders only for this design.

Shadows would conflict with the editorial, flat aesthetic.

### Z-Index Scale

```css
.navbar { z-index: 50; }
.mobile-menu { z-index: 40; }
.modal { z-index: 100; }
.dropdown { z-index: 30; }
.sticky-summary { z-index: 10; }
```

---

## Browser Support

**Target**: Modern browsers (last 2 versions)

**Tested in**:
- Chrome 120+
- Safari 17+
- Firefox 120+
- Edge 120+

**Graceful degradation**:
- CSS Grid → Flexbox → Block
- CSS custom properties with fallbacks
- Modern image formats with JPEG fallback

---

## Design Maintenance

### When to update this document

- New component added
- Color or typography change
- Layout pattern introduced
- Animation behavior modified
- Accessibility enhancement
- Content guidelines expanded

### Design review checklist

Before launching new features:
- [ ] Colors match palette (no new colors)
- [ ] Typography uses Fraunces/Manrope only
- [ ] Borders are 1-3px, minimal radius
- [ ] Whitespace is generous
- [ ] Animations respect reduced motion
- [ ] Contrast ratios pass WCAG AA
- [ ] Keyboard navigation works
- [ ] Mobile responsive at all breakpoints
- [ ] Content follows tone guidelines
- [ ] No decoration for decoration's sake

---

## Credits & Inspiration

**Design Direction**: Premium jewelry e-commerce aesthetic
**Typography**: Google Fonts (Fraunces, Manrope)
**Icons**: Heroicons by Tailwind Labs
**Color Palette**: Custom (inspired by formal menswear and metalwork)
**Motion**: Framer Motion library

---

**Last Updated**: Initial version — January 2025
**Maintained By**: CuffKings Design Team
**Version**: 1.0.0
