# CuffKings — Noir Atelier Design System

> **Version:** 2.1  
> **Design direction:** Noir Atelier  
> **Brand:** CuffKings  
> **Product:** Premium men's cufflinks and cufflink sets  
> **Location:** Peshawar, Pakistan  
> **Purpose:** Production design specification for the customer-facing CuffKings website

---

## 1. Design Direction

CuffKings should feel like a **modern luxury men's accessories brand**, combining:

- premium accessories
- men's tailoring
- editorial fashion
- tactile materials
- cinematic product photography
- refined digital motion

The experience should feel like entering a carefully lit, private tailoring and accessories atelier rather than browsing a generic fashion store.

### Core feeling

**Dark. Masculine. Refined. Sensual. Modern. Tactile. Editorial. Confident.**

The site should create a "stop scrolling" effect through:

1. exceptional product photography
2. strong composition
3. sophisticated typography
4. cinematic transitions
5. subtle interactive details
6. generous negative space

Motion must support the product rather than compete with it.

---

## 2. Critical Visual Rule

### The product is always the hero.

Cufflinks are small, detailed objects. The interface must give them enough scale and breathing room to communicate:

- metal
- enamel
- crystal
- engraving
- polish
- texture
- geometry
- craftsmanship

Do not let decorative effects, gradients, animation, or UI chrome become more visually important than the products.

---

## 3. Anti-AI / Anti-Template Rules

The website must **not** look AI-generated, SaaS-like, or like a generic Shopify luxury template.

### Never use

- purple/blue AI gradients
- neon accents
- glassmorphism
- floating blobs
- glowing cards
- excessive rounded cards
- giant pill-shaped buttons
- repetitive equal-size card grids
- generic dashboard-like layouts
- random 3D objects
- decorative particles
- excessive icons
- excessive emojis
- generic stock photography
- fake luxury claims
- excessive gradient text
- random oversized circles
- decoration without a brand reason
- an animation on every element

### Avoid generic copy such as

- "Elevate your style"
- "Redefine luxury"
- "Experience sophistication"
- "Unleash your style"
- "Where elegance meets..."
- "Game-changing"
- "Luxury like never before"

Copy should sound written by a human creative director for a real accessories brand.

---

# 4. Color System

The previous Ink Green / Khaddar Ivory palette is replaced by the Noir Atelier palette.

The website's identity is a **black-and-gold theme**: Obsidian (black) and Champagne Brass (gold) are the two colors that define CuffKings. Porcelain provides a light surface for readability; Deep Petrol and Deep Wine are minor, occasional accents — never primary.

## Primary colors

```css
--obsidian: #101110;
--deep-petrol: #203A3A;
--porcelain: #F3EFE7;
--champagne-brass: #C6A15B;
--deep-wine: #641F2B;
--warm-charcoal: #211D19;
```

### Obsidian — `#101110`

Primary dark surface.

Use for:

- hero
- navigation
- footer
- dark editorial sections
- product showcases
- page transitions
- mobile menu
- major CTA sections

### Deep Petrol — `#203A3A`

Secondary dark tone.

Use selectively for:

- collection chapters
- editorial transitions
- special product stories
- visual variation between dark sections

Do not use it as a dominant global background.

### Porcelain — `#F3EFE7`

Primary light surface.

Use for:

- shop
- product information
- editorial content
- forms
- light collection sections
- supporting content

### Champagne Brass — `#C6A15B`

Represents the physical metal language of CuffKings.

Use sparingly for:

- hairline rules
- product numbering
- selected borders
- hover states
- primary dark-surface CTA
- interactive accents
- fine decorative details

Do not use it for large text blocks.

### Deep Wine — `#641F2B`

Rare accent.

Use only for:

- sale
- limited edition
- special product labels
- occasional editorial accent

Never use it as the primary background.

### Warm Charcoal — `#211D19`

Use for:

- body text on Porcelain
- labels
- product information
- form text

---

# 5. Color Philosophy

The core identity is black and gold — Obsidian and Champagne Brass — used deliberately, not as a generic template default.

Black creates a jewel-box stage: dark, quiet, and confident, so nothing competes with the product.

Gold is used only as a fine accent — hairline rules, borders, hover states, small numbering, primary CTAs on dark surfaces — never as a flood of color across large surfaces or blocks of text. It should read as **polished metal**, not as decoration.

The products themselves still provide additional visual richness on top of this black-and-gold foundation:

- gold
- silver
- blue
- ivory
- black
- gunmetal
- crystal

The UI creates the black-and-gold stage. The product supplies the rest of the color. Overusing gold — large gold text blocks, gold backgrounds, gold buttons everywhere — reads as generic and cheapens the premium feel. Restraint is what makes the gold feel valuable.

---

# 6. Typography

## Display

Primary:

**Instrument Serif**

Fallback:

**Cormorant Garamond**

Use for:

- hero headlines
- major section headings
- editorial statements
- product storytelling
- selected large navigation moments

## UI / Body

**Manrope**

Use for:

- body text
- navigation
- buttons
- product metadata
- forms
- filters
- prices
- admin interface

### Typography character

Display typography should feel:

- editorial
- elegant
- masculine
- tactile
- contemporary

Body typography should feel:

- precise
- clean
- modern
- highly readable

### Avoid

- all-caps headlines
- excessive tracking
- tiny uppercase eyebrow labels
- highlighting random single words
- giant typography used only as decoration

Sentence case is the default.

---

# 7. Type Scale

Use responsive `clamp()` values rather than fixed oversized typography.

Suggested scale:

```css
--text-display: clamp(3.5rem, 8vw, 8.5rem);
--text-h1: clamp(3rem, 6vw, 6.5rem);
--text-h2: clamp(2.5rem, 4vw, 5rem);
--text-h3: clamp(1.75rem, 2.5vw, 3rem);
--text-body: clamp(0.95rem, 1vw, 1.1rem);
```

The exact sizes can be adjusted based on composition.

Typography should never cause poor mobile usability.

---

# 8. Layout Philosophy

The layout is **editorial and asymmetric**.

Do not use a repeated structure such as:

```text
[Card] [Card] [Card]
[Card] [Card] [Card]
```

as the primary visual language.

Instead combine:

- full-bleed imagery
- large feature products
- offset columns
- overlapping content
- asymmetric whitespace
- editorial grids
- oversized product photography
- horizontal storytelling
- pinned sections
- carefully controlled negative space

Each major homepage section should have a distinct composition.

---

# 9. Grid System

Use a flexible 12-column editorial grid on desktop.

Suggested:

```text
12 columns
24px minimum gutter
5–8vw outer margins
```

Use CSS Grid for major compositions.

Products can span:

- 3 columns
- 4 columns
- 5 columns
- 6 columns
- 7 columns
- 8 columns
- full width

Do not make every product span the same number of columns.

---

# 10. Corners and Borders

## Border radius

Use:

```css
border-radius: 0;
```

or a maximum of:

```css
border-radius: 2px;
```

The site should feel sharp and tailored.

### Borders

Use 1px hairline borders.

Preferred colors:

```css
rgba(198,161,91,0.25)
rgba(243,239,231,0.15)
rgba(16,17,16,0.15)
```

Avoid heavy outlines.

---

# 11. Shadows

Do not use generic SaaS shadows.

Avoid:

```css
box-shadow: 0 10px 30px rgba(...)
```

as a standard card treatment.

Depth should come from:

- photography
- lighting
- layering
- contrast
- scale
- spacing

Natural shadows inside product photography are welcome.

---

# 12. Product Photography Direction

Product photography is the central visual asset.

Use the supplied CuffKings product photography as the primary reference.

Visual characteristics:

- close-up metal detail
- polished surfaces
- controlled highlights
- dark fabric
- formal shirts
- cuff details
- wood
- stone
- display trays
- cufflink boxes
- macro crops
- soft directional light
- rich shadows
- clean compositions

Preferred product worlds:

### Gold / Ivory

Warm, refined, formal.

### Blue / Silver

Rich enamel, cooler and more ornamental.

### Gunmetal / Black

Dark, masculine, architectural.

### Image treatment

Use large images.

Avoid excessive filters.

Do not artificially add gradients or glow to product images.

---

# 13. Homepage Visual Sequence

The homepage should behave like a cinematic product campaign.

Recommended structure:

```text
01. Opening / Hero
02. Collection Introduction
03. Featured Product Story
04. Material Story
05. Horizontal Collection Experience
06. Asymmetric Collection Showcase
07. Editorial Brand Story
08. Final CTA
09. Footer
```

Every section should have a deliberate visual purpose.

---

# 14. Hero

## Composition

Minimum height:

```css
min-height: 100svh;
```

Background:

`#101110`

Use a large product image as the primary visual.

The product should feel almost like a premium menswear campaign photograph.

### Suggested copy

```text
The detail
changes everything.
```

Supporting copy:

```text
Cufflinks built around polished metal,
considered patterns and the details of formal dressing.
```

Primary CTA:

```text
Shop the collection
```

Secondary link:

```text
Explore the pieces
```

Keep copy short.

---

# 15. Hero Animation

Use GSAP.

Initial sequence:

1. Obsidian background establishes.
2. CuffKings wordmark reveals.
3. Hero image reveals through a clip-path mask.
4. Product scales subtly into position.
5. Headline reveals line by line.
6. Supporting copy fades/rises.
7. CTA enters.
8. Fine Champagne Brass rule draws into place.

Target entrance duration:

`800–1500ms`

Do not create a long loading experience.

---

# 16. Hero Scroll Experience

Use GSAP ScrollTrigger.

During the first viewport of scrolling:

- product subtly scales
- image shifts position
- hero typography moves out of the composition
- next section begins overlapping
- background transitions naturally

Use:

- transform
- opacity
- scale
- clip-path

Avoid excessive blur.

---

# 17. Collection Introduction

Transition from Obsidian into Porcelain.

Large editorial statement:

```text
Designed for the details.
```

Supporting text should explain the product world in plain language.

Then introduce the first product imagery.

Use subtle ScrollTrigger reveals.

---

# 18. Featured Product Story

Feature one product at large scale.

Recommended hero product:

**Ivory Pavé Gold Cufflinks**

The product should occupy a large part of the viewport.

As the user scrolls, reveal material details.

Sequence:

```text
Polished metal.
```

then:

```text
Ivory enamel.
```

then:

```text
Crystal pavé.
```

then:

```text
Finished for formal dressing.
```

Use product imagery or macro crops to support each statement.

Do not make claims that are not supported by actual product specifications.

---

# 19. Material Story

Create a tactile material section.

Focus on:

### Metal

Polished surface and edge detail.

### Enamel

Color depth and contrast.

### Crystal

Light-catching details.

### Engraving

Pattern and surface detail.

Use photography rather than generic icons.

---

# 20. Horizontal Collection Experience

Create one major horizontal storytelling section on desktop.

The user scrolls vertically.

Products travel horizontally.

Example:

```text
Choose
your finish.

Gold → Blue → Silver → Gunmetal
```

Use:

**GSAP ScrollTrigger**

The section should feel like an editorial campaign.

Do not make it excessively long.

On mobile:

replace horizontal pinning with a natural vertical/swipe-friendly sequence.

---

# 21. Collection Showcase

Use asymmetric product compositions.

Example:

```text
┌─────────────────────┐
│                     │
│      FEATURED       │
│       GOLD          │
│                     │
└─────────────────────┘

     ┌────────┐
     │ BLUE   │
     └────────┘

             ┌─────────────┐
             │  GUNMETAL   │
             └─────────────┘
```

Use deliberately different product sizes.

Do not force all products into identical cards.

---

# 22. Product Card

Product cards should be image-led.

Show:

- product image
- product name
- price
- material/finish where useful
- availability
- optional sale/limited badge

### Hover

Use GSAP:

- image scale: approximately `1.03–1.07`
- subtle image translation
- brass line reveal
- metadata movement

Do not tilt cards aggressively.

Do not add glow.

Do not rotate cards.

---

# 23. Custom Cursor

Desktop pointer devices only.

Default:

small dot.

Product hover:

```text
View
```

Image hover:

```text
Explore
```

CTA hover:

```text
Open
```

Use GSAP for smooth following.

Disable on:

- touch devices
- mobile
- reduced-motion preference

The custom cursor must never interfere with normal pointer behavior.

---

# 24. Magnetic Interactions

Use only on major CTAs.

Maximum movement:

`5–10px`

Suitable elements:

- Shop the collection
- Add to cart
- Primary CTA

Do not make every button magnetic.

---

# 25. Navigation

## Desktop

Transparent over hero.

Example:

```text
CUFFKINGS

Shop    Collections    About    Contact

Search    Cart
```

On scroll:

- compact navbar
- Obsidian background
- subtle transition
- maintain generous spacing

Use GSAP.

Do not create a huge floating rounded navbar.

---

# 26. Mobile Navigation

Full-screen Obsidian overlay.

Navigation:

```text
Shop
Collections
About
Contact
```

Links enter vertically.

Use GSAP.

Minimum touch target:

`44px`

No custom cursor.

---

# 27. Page Transitions

Use a short cinematic page transition.

Concept:

```text
Obsidian layer
      ↓
Champagne Brass line
      ↓
new page reveal
```

Duration:

approximately `600–1000ms`

Do not delay navigation unnecessarily.

Respect reduced motion.

---

# 28. Shop Page

The Shop page should feel like an editorial catalogue.

Opening:

```text
Every detail counts.
```

Then:

- category controls
- filters
- product composition

Filters:

- Category
- Price
- Color
- Finish
- Pattern
- Featured

Sorting:

- Featured
- Newest
- Price low to high
- Price high to low

Desktop:

asymmetric editorial grid.

Mobile:

single/dual-column product layout depending on viewport width.

---

# 29. Product Page

The product page should not resemble a default Shopify template.

Prioritize the product image.

Suggested structure:

```text
Large product gallery

Product name
Price
Material
Finish
Color
Description
Availability
Quantity
Add to cart
```

Then:

```text
Material story
Product details
Related products
```

Use large visual sections.

---

# 30. Product Gallery

Support:

- primary image
- secondary image
- macro/detail image
- zoom
- thumbnail navigation
- mobile swipe

Use Next/Image.

Use GSAP only where it improves the gallery experience.

Do not add unnecessary animation.

---

# 31. Cart Experience

Use Zustand.

Persist cart in localStorage.

Cart drawer should slide in from the side on desktop.

Show:

- product image
- name
- quantity
- price
- subtotal
- remove

Use a short GSAP entrance.

Cart must remain fast and functional.

---

# 32. Checkout

Checkout is WhatsApp-based.

There is:

- no payment gateway
- no order database
- no order API
- no customer account

Fields:

- Name
- Phone
- Address
- City

Validate with Zod.

Generate a URL-encoded WhatsApp message.

After opening WhatsApp, show:

```text
Your order details are ready in WhatsApp.
Send the message there to confirm your order.
```

---

# 33. About Page

The About page should feel editorial.

Do not invent heritage or craftsmanship claims.

Do not claim:

- generations of experience
- awards
- certifications
- handmade production
- historical facts

unless provided by the business.

Focus on:

- CuffKings
- Peshawar
- men's accessories
- formal dressing
- materials
- product details
- design

Use large photography and restrained copy.

---

# 34. Contact Page

Keep it simple.

Include:

- WhatsApp
- email
- social media
- business information
- location

Primary action:

```text
Contact via WhatsApp
```

---

# 35. Content Style

## Voice

Confident.

Specific.

Tactile.

Human.

Short.

Active.

Never over-explained.

### Good

```text
Polished metal. Deep enamel. A clean finish.
```

```text
Small details deserve a closer look.
```

```text
Made for formal shirts and considered details.
```

### Bad

```text
Elevate your style with our premium luxury cufflinks.
```

---

# 36. Motion System

## Primary library

**GSAP**

## Required

**GSAP ScrollTrigger**

Optional where genuinely useful:

- GSAP Flip
- GSAP Observer

Do not use Framer Motion as the primary animation system.

---

# 37. Motion Categories

### Cinematic motion

For:

- hero
- major section transitions
- product storytelling
- page transitions
- horizontal collection

### Interaction motion

For:

- product hover
- buttons
- cursor
- navigation
- cart drawer

### Micro motion

For:

- cart updates
- filter changes
- form states
- image loading

Animation should be smooth and controlled.

---

# 38. Recommended GSAP Easing

Preferred:

```text
power3.out
power4.out
expo.out
```

Avoid excessive:

```text
bounce
elastic
back
```

The brand should feel refined, not playful.

---

# 39. Scroll Reveal

Default:

```text
opacity: 0 → 1
y: 30–50px → 0
```

Duration:

```text
0.8–1.2s
```

Use stagger only for genuinely related elements.

Do not create dozens of independent animations for small text fragments.

---

# 40. Image Reveal

Use clip-path.

Example concept:

```css
clip-path: inset(0 0 100% 0);
```

to:

```css
clip-path: inset(0 0 0 0);
```

This should feel like an editorial photograph being revealed.

---

# 41. Parallax

Use subtle parallax.

Maximum movement:

approximately `20–40px`.

Never make the product feel detached from its layout.

---

# 42. Reduced Motion

Fully support:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

- disable custom cursor
- disable magnetic interactions
- disable parallax
- simplify page transitions
- disable smooth scrolling
- reduce ScrollTrigger effects
- keep essential reveals instant/minimal

All functionality must remain available.

---

# 43. Responsive Design

Mobile-first.

Support:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

### Mobile

Prioritize:

- product photography
- readability
- touch interaction
- simple composition
- natural scrolling

Avoid forcing complex desktop animation onto mobile.

### Tablet

Moderate desktop composition.

### Desktop

Full editorial composition and cinematic motion.

---

# 44. Accessibility

Target WCAG AA.

Implement:

- semantic HTML
- logical heading hierarchy
- keyboard navigation
- visible focus states
- accessible forms
- alt text
- accessible buttons
- ARIA where necessary
- reduced-motion support
- sufficient contrast

Keyboard:

- Tab
- Shift + Tab
- Enter
- Escape
- Arrow keys where appropriate

---

# 45. Performance

Animation must not destroy performance.

Use:

- Next/Image
- responsive image sizes
- lazy loading
- priority only for critical hero imagery
- dynamic imports for heavy client-side motion where appropriate
- GSAP cleanup
- scoped animations
- Server Components by default

Avoid:

- unnecessary JavaScript
- huge unoptimized images
- excessive ScrollTriggers
- layout-thrashing animation
- animating width/height/top/left when transforms can be used

Prefer:

```text
transform
opacity
clip-path
```

for animation.

---

# 46. Animation Lifecycle

Every GSAP animation must be properly scoped and cleaned up.

Use:

```text
useGSAP()
GSAP Context
ScrollTrigger cleanup
```

Do not create global uncontrolled timelines.

Do not leak event listeners.

---

# 47. Icons

Use icons only when they improve usability.

Prefer a restrained outline icon set.

Avoid using icons as decoration.

Examples:

- Search
- Cart
- Menu
- Close
- Plus
- Minus

Keep strokes fine and consistent.

---

# 48. Buttons

Sharp and editorial.

Radius:

`0–2px`

Primary dark-surface button:

Champagne Brass.

Light-surface button:

Obsidian.

Avoid pill buttons.

Avoid excessive arrows.

Use text such as:

```text
Shop the collection
Add to cart
View details
Continue shopping
```

---

# 49. Loading States

Avoid generic spinning loaders.

Prefer:

- subtle text state
- skeleton only where useful
- image reveal
- progressive content appearance

Example:

```text
Loading...
```

Do not over-design loading states.

---

# 50. Empty States

Keep them concise.

Example:

```text
Your cart is empty.

Start with a closer look at the collection.
```

CTA:

```text
Shop cufflinks
```

---

# 51. Product Badges

Use sparingly.

Possible:

```text
Limited stock
Sale
New
Limited edition
```

Use Deep Wine only when appropriate.

Do not cover product photography with badges.

---

# 52. Product Data Visual Language

Where useful, present details like an atelier specification:

```text
Material
Gold-tone metal

Finish
Polished

Detail
Crystal pavé

Collection
Gold cufflinks
```

Use Manrope.

Keep the presentation clean and compact.

---

# 53. Brand Storytelling

The site should communicate the product through details.

Story sequence:

```text
Object
↓
Material
↓
Detail
↓
Finish
↓
How it wears
```

Do not rely on exaggerated brand claims.

---

# 54. SEO Visual Considerations

SEO content should remain natural.

Use:

- descriptive product names
- descriptive image alt text
- meaningful headings
- semantic sections
- readable content

Do not stuff keywords into visible copy.

---

# 55. Technical Design Principles

The design system should be implemented as reusable components.

Use:

- CSS variables for design tokens
- Tailwind for utility styling
- reusable layout primitives
- reusable typography classes
- reusable motion utilities
- reusable product components

Do not hard-code the same values repeatedly.

---

# 56. Recommended Component Groups

```text
components/

layout/
  Navbar
  Footer
  MobileMenu

motion/
  PageTransition
  HeroAnimation
  Reveal
  Magnetic
  CustomCursor
  HorizontalScroll
  ImageReveal

home/
  Hero
  CollectionIntro
  FeaturedStory
  MaterialStory
  HorizontalCollection
  CollectionShowcase
  BrandStory
  FinalCTA

shop/
  ShopHeader
  ProductGrid
  ProductCard
  FilterSidebar

product/
  ImageGallery
  ProductInfo
  ProductDetails
  AddToCartButton
  RelatedProducts

cart/
  CartDrawer
  CartItem
  CartSummary

checkout/
  CheckoutForm

ui/
  Button
  Badge
  BrassLine
```

---

# 57. Design Token Reference

```css
:root {
  --color-obsidian: #101110;
  --color-deep-petrol: #203A3A;
  --color-porcelain: #F3EFE7;
  --color-champagne: #C6A15B;
  --color-deep-wine: #641F2B;
  --color-charcoal: #211D19;

  --radius-sharp: 0px;
  --radius-minimal: 2px;

  --border-hairline: 1px;

  --container-max: 1600px;
}
```

---

# 58. Spacing Philosophy

Use generous whitespace.

Suggested spacing scale:

```text
4px
8px
12px
16px
24px
32px
48px
64px
80px
96px
128px
160px
200px
```

Large editorial sections may use:

```text
160–240px
```

vertical spacing on desktop.

Do not compress sections just to fit more content.

---

# 59. Background Transitions

Do not use the same background for the entire page.

Create visual chapters:

```text
Obsidian
↓
Porcelain
↓
Obsidian
↓
Deep Petrol
↓
Porcelain
↓
Obsidian
```

Transitions should feel intentional.

Do not add gradients simply to transition colors.

---

# 60. Editorial Grid Details

Subtle details may include:

- product numbers
- collection numbers
- thin brass rules
- small page references
- measurement-inspired lines
- tailoring-inspired seam details
- restrained labels

Use these sparingly.

The interface should never look like a technical blueprint.

---

# 61. Desktop Experience

At 1440px+:

The site should feel immersive.

Use:

- large product photography
- wide compositions
- generous margins
- asymmetry
- pinned storytelling
- horizontal movement
- sophisticated typography

At 1920px:

Do not simply scale everything indefinitely.

Maintain readable content width.

---

# 62. Mobile Experience

Mobile must feel intentionally designed.

Use:

- full-width photography
- strong serif headings
- compact navigation
- natural product browsing
- touch-friendly controls
- simple transitions

Remove:

- custom cursor
- excessive parallax
- complex desktop pinning
- unnecessary hover interactions

---

# 63. What Makes This Design "CuffKings"

The visual identity must repeatedly connect to the physical product world:

```text
metal
+
fabric
+
shirt cuffs
+
engraving
+
enamel
+
crystal
+
tailoring
+
fine metal detailing
```

Do not use unrelated visual metaphors.

---

# 64. Final Creative Quality Test

Before approving any page, evaluate:

### Does it look AI-generated?

If yes, remove generic elements.

### Does it look like SaaS?

If yes, redesign the composition.

### Does it look like a Shopify template?

If yes, improve editorial hierarchy.

### Is animation distracting?

If yes, remove it.

### Does the product feel expensive?

If no, improve scale, photography, spacing and lighting.

### Does it feel masculine?

If no, refine typography, contrast and imagery.

### Does it feel modern?

If no, simplify the UI and improve motion.

### Does it feel tactile?

If no, bring material photography forward.

### Does it feel like CuffKings?

If no, return attention to the products.

---

# 65. Final Creative Standard

CuffKings should feel like:

**A premium cufflink showroom translated into a cinematic digital experience.**

It should combine:

**Fine accessories**
+
**Tailoring**
+
**Editorial fashion**
+
**Modern interaction**
+
**Cinematic motion**

The final emotional impression should be:

**"I want to see these products up close."**

Not:

**"This website has lots of animations."**

That distinction is critical.

---

# 66. Final Rules

1. Product comes first.
2. Photography comes second.
3. Typography creates the editorial character.
4. Motion creates the digital experience.
5. UI remains restrained.
6. Obsidian creates the foundation.
7. Champagne Brass is an accent, not a flood of gold.
8. Porcelain provides visual breathing room.
9. Deep Petrol provides controlled variation.
10. Deep Wine remains rare.
11. No generic AI design patterns.
12. No SaaS visual language.
13. No excessive rounded cards.
14. No generic shadows.
15. No decorative animation without purpose.
16. No fake marketing claims.
17. No generic luxury clichés.
18. No unnecessary UI.
19. Every major section should have a deliberate composition.
20. The cufflinks must always remain the visual hero.

---

## Design Maintenance

Update this document whenever:

- a new design token is introduced
- a major layout pattern is introduced
- a motion pattern changes
- typography changes
- a new component becomes part of the visual system
- accessibility behavior changes
- product photography standards change

### Final review checklist

- [ ] Noir Atelier palette is used consistently
- [ ] Instrument Serif / Cormorant Garamond used for display
- [ ] Manrope used for body/UI
- [ ] Sharp corners maintained
- [ ] No generic SaaS cards
- [ ] No AI-style gradients
- [ ] Product photography is dominant
- [ ] Homepage composition is asymmetric
- [ ] GSAP drives major motion
- [ ] ScrollTrigger is used intentionally
- [ ] Custom cursor is desktop-only
- [ ] Magnetic interactions are restrained
- [ ] Mobile removes unnecessary desktop effects
- [ ] Reduced motion is supported
- [ ] WCAG AA accessibility is maintained
- [ ] Animation does not compromise performance
- [ ] Copy remains specific and human
- [ ] No unsupported brand claims
- [ ] Product remains the visual hero
