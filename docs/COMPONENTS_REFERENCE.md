# CuffKings - Complete Components Reference

This document provides detailed specifications for every component in the CuffKings website.

---

## 📁 COMPONENT FILE STRUCTURE

```
components/
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── MobileMenu.tsx (optional separate file)
├── home/
│   ├── HeroNoir.tsx
│   ├── CollectionIntro.tsx
│   ├── FeaturedProductStory.tsx
│   ├── FeaturedProducts.tsx
│   ├── CategoryGrid.tsx
│   ├── BrandStory.tsx
│   └── FinalCTA.tsx
├── shop/
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   └── FilterSidebar.tsx
├── product/
│   ├── ImageGallery.tsx
│   └── AddToCartButton.tsx
├── cart/
│   ├── CartItem.tsx
│   └── CartSummary.tsx
├── checkout/
│   └── CheckoutForm.tsx
└── ui/
    ├── Button.tsx
    ├── Badge.tsx
    ├── BrassLine.tsx
    └── ProductPlaceholder.tsx
```

---

## 🎨 UI COMPONENTS (components/ui/)

### Button.tsx

**Purpose:** Reusable button component with multiple variants

**Props:**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
```

**Variants:**
- `primary`: Champagne brass background, obsidian text (for dark surfaces)
- `secondary`: Obsidian background, porcelain text, champagne brass border
- `outline`: Transparent background, champagne brass border and text

**Sizes:**
- `sm`: px-4 py-2 text-sm
- `md`: px-6 py-3 text-base (default)
- `lg`: px-8 py-4 text-lg

**Behavior:**
- If `href` prop provided: Renders as Next.js Link
- If `onClick` prop provided: Renders as button
- Smooth transitions (300ms)
- Border radius: 0px (sharp)
- Font: Manrope (sans)

**Usage:**
```tsx
<Button variant="primary" size="lg" href="/shop">
  Shop the collection
</Button>

<Button variant="secondary" onClick={handleClick}>
  Learn more
</Button>
```

---

### Badge.tsx

**Purpose:** Product status badges (Sale, Limited, New)

**Props:**
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sale" | "limited";
  className?: string;
}
```

**Variants:**
- `default`: Porcelain background, warm-charcoal text, champagne brass border
- `sale`: Deep wine background, porcelain text (no border)
- `limited`: Obsidian background, porcelain text, champagne brass border

**Style:**
- Small: px-3 py-1 text-xs
- Uppercase, medium tracking
- Sharp corners (0px radius)

**Usage:**
```tsx
<Badge variant="sale">Sale</Badge>
<Badge variant="limited">Limited Edition</Badge>
```

---

### BrassLine.tsx

**Purpose:** Decorative section divider with champagne brass gradient

**Props:**
```typescript
interface BrassLineProps {
  className?: string;
}
```

**Appearance:**
- Height: 1px
- Background: Horizontal gradient (transparent → champagne-brass/30 → transparent)
- Full width by default

**Usage:**
```tsx
<BrassLine className="max-w-container mx-auto my-12" />
```

---

### ProductPlaceholder.tsx

**Purpose:** Loading state for product images

**Props:**
```typescript
interface ProductPlaceholderProps {
  aspectRatio?: "square" | "portrait" | "landscape";
  className?: string;
}
```

**Appearance:**
- Animated shimmer effect
- Obsidian base with champagne brass shimmer
- Matches image aspect ratios

**Usage:**
```tsx
<ProductPlaceholder aspectRatio="square" className="w-full" />
```

---

## 🏗️ LAYOUT COMPONENTS (components/layout/)

### Navbar.tsx

**Purpose:** Main site navigation with scroll behavior

**Features:**
- Fixed position at top
- Transparent over hero section
- Solid obsidian background on scroll
- Desktop: Horizontal layout
- Mobile: Hamburger menu with full-screen overlay

**Structure:**
```
[Logo] --------- [Nav Links] --------- [Search] [Cart (badge)]
```

**Nav Links:**
- Shop
- Collections
- About
- Contact

**GSAP Animations:**
1. **Scroll transformation:**
```typescript
gsap.to(navRef.current, {
  backgroundColor: "rgba(16, 17, 16, 1)",
  padding: "1rem 0",
  boxShadow: "0 1px 0 rgba(198, 161, 91, 0.1)",
  scrollTrigger: {
    trigger: document.body,
    start: "top -50px",
    toggleActions: "play none none reverse",
  },
});
```

2. **Mobile menu entrance:**
```typescript
gsap.from(".mobile-menu-link", {
  opacity: 0,
  y: 20,
  duration: 0.3,
  stagger: 0.05,
});
```

**Cart Badge:**
- Shows item count from Zustand store
- Champagne brass background
- Positioned top-right of cart icon

**State:**
```typescript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const cartItemCount = useCartStore((state) => state.getTotalItems());
```

**Mobile Menu:**
- Full viewport height
- Obsidian background with opacity 0.98
- Close button (X) top-right
- Links stacked vertically
- Large touch targets (44px min)

---

### Footer.tsx

**Purpose:** Site footer with links and information

**Background:** Obsidian  
**Text:** Porcelain with champagne brass accents

**Layout:** 4-column grid (desktop), stack (mobile)

**Columns:**

1. **Brand**
```
CuffKings
Premium cufflinks for men
```

2. **Shop**
```
All Cufflinks
Gold Collection
Silver Collection
Blue Collection
Gunmetal Collection
Gift Sets
```

3. **Information**
```
About
Contact
Shipping Information
Care Guide
Size Guide
```

4. **Connect**
```
WhatsApp
Instagram
Email
```

**Bottom Section:**
```
[Brass Line Divider]

© 2026 CuffKings. Peshawar, Pakistan.
Privacy Policy | Terms of Service
```

**Styling:**
- Section padding: py-16 lg:py-24
- Column heading: font-display, text-champagne-brass, mb-6
- Links: text-porcelain/70 hover:text-champagne-brass
- Bottom text: text-sm, text-porcelain/50

---

## 🏠 HOME PAGE COMPONENTS (components/home/)

### HeroNoir.tsx

**Purpose:** Full-screen cinematic hero section

**Layout:**
- Height: min-height: 100svh
- Background: Obsidian (#101110)
- Two-column: Product image (60%) + Content (40%)

**Content:**
```
Small label: "CUFFKINGS"
Headline: "The detail changes everything."
Subheading: "Cufflinks built around polished metal, considered patterns and the details of formal dressing."
Primary CTA: "Shop the collection"
Secondary Link: "Explore the pieces"
Decorative brass line
Scroll indicator: "Scroll to explore"
```

**GSAP Entrance Sequence:**
```typescript
const tl = gsap.timeline();

// 1. Label fade in
tl.from(".hero-label", {
  opacity: 0,
  y: 20,
  duration: 0.6,
});

// 2. Product image clip-path reveal
tl.from(".hero-image", {
  clipPath: "inset(0 0 100% 0)",
  duration: 1.2,
  ease: "power3.out",
}, "-=0.3");

// 3. Headline reveal (line by line)
tl.from(".hero-headline", {
  opacity: 0,
  y: 30,
  duration: 0.8,
}, "-=0.6");

// 4. Subheading fade
tl.from(".hero-subheading", {
  opacity: 0,
  y: 20,
  duration: 0.6,
}, "-=0.4");

// 5. CTAs appear
tl.from(".hero-cta", {
  opacity: 0,
  y: 15,
  duration: 0.5,
  stagger: 0.1,
}, "-=0.3");

// 6. Brass line draws
tl.from(".hero-brass-line", {
  scaleX: 0,
  duration: 0.8,
  ease: "power2.out",
}, "-=0.4");

// 7. Scroll indicator pulses
tl.from(".scroll-indicator", {
  opacity: 0,
  y: -10,
  duration: 0.5,
});
```

**ScrollTrigger Parallax:**
```typescript
gsap.to(".hero-image", {
  scale: 1.1,
  y: -50,
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
});

gsap.to(".hero-content", {
  opacity: 0.3,
  y: -80,
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
});
```

**Reduced Motion:**
```typescript
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  // Skip entrance animations
  gsap.set([".hero-label", ".hero-image", ".hero-headline"], { opacity: 1, y: 0 });
}
```

---

### CollectionIntro.tsx

**Purpose:** Editorial introduction to the collection

**Background:** Porcelain  
**Layout:** Centered content, max-width 900px

**Content:**
```
Headline: "Designed for the details."
Body: "Small metal objects for formal shirts. Polished finishes, enamel depth, engraved patterns, and crystal accents. CuffKings focuses on what's visible at the cuff."
```

**Animation:**
```typescript
gsap.from(".collection-intro", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".collection-intro",
    start: "top 80%",
  },
});
```

**Styling:**
- Padding: py-section (clamp(5rem, 10vw, 10rem))
- Headline: text-h2, font-display, text-warm-charcoal
- Body: text-body, text-warm-charcoal/80, leading-relaxed

---

### FeaturedProductStory.tsx

**Purpose:** Large featured product with detailed specifications

**Background:** Obsidian  
**Layout:** 2-column (image 50% + details 50%)

**Product:** Ivory Pavé Gold Cufflinks

**Content Structure:**
```
[Large Product Image]

Product Name: "Ivory Pavé Gold Cufflinks"
Price: "Rs. 4,500"

01 / Material
Gold-tone metal base with high-polish finish.

02 / Enamel
Ivory enamel fill, applied carefully and leveled flush.

03 / Crystal
Pavé-set crystals. Small, precise, light-catching.

04 / Finish
Polished edges. Metal meets enamel cleanly.

[Add to Cart Button]
```

**Animation - Sequential Reveals:**
```typescript
const details = gsap.utils.toArray(".detail-section");

gsap.from(details, {
  opacity: 0,
  x: -30,
  duration: 0.6,
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".featured-product",
    start: "top 70%",
  },
});
```

**Styling:**
- Detail numbers: font-sans, text-champagne-brass, text-sm
- Detail titles: font-display, text-porcelain, text-xl
- Detail body: text-porcelain/80, text-base, leading-relaxed
- Spacing between details: mb-8

---

### FeaturedProducts.tsx

**Purpose:** Grid of featured/highlighted products

**Background:** Deep Petrol  
**Layout:** Asymmetric editorial grid

**Grid Structure (Desktop):**
```
[Large Featured]     [Standard]
[Large Featured]     [Standard]

[Standard]  [Standard]  [Standard]

[Full Width Featured]
```

**Animation:**
```typescript
const products = gsap.utils.toArray(".product-card");

gsap.from(products, {
  opacity: 0,
  y: 40,
  duration: 0.7,
  stagger: 0.08,
  scrollTrigger: {
    trigger: ".featured-products",
    start: "top 75%",
  },
});
```

**Content:**
- Section headline: "Featured collection"
- 6-8 products total
- Mix of sizes (some span 2 columns, some 1 column)
- "View all" CTA at bottom

---

### CategoryGrid.tsx

**Purpose:** Navigational grid for product categories

**Background:** Deep Petrol  
**Layout:** Asymmetric grid (desktop), vertical stack (mobile)

**Categories:**
1. Gold Cufflinks (large, 2×2)
2. Silver Cufflinks (small, 1×1)
3. Gunmetal Cufflinks (small, 1×1)
4. Statement Cufflinks (wide, 4×1)
5. Enamel Cufflinks (medium, 1×1)
6. Gift Sets (medium, 1×1)

**Desktop Grid:**
```
[Gold: 2×2]    [Silver] [Gunmetal]
               [Enamel] [Gift Sets]

[Statement: Full Width 4×1]
```

**Card Content:**
```
Category Name (H3, display font)
Description (Small text)
"View collection →" (Link with arrow)
```

**Hover Effect:**
```typescript
// On category card hover
gsap.to(cardRef.current, {
  borderColor: "rgba(198, 161, 91, 1)", // Full opacity brass
  duration: 0.3,
});

gsap.to(".category-arrow", {
  x: 4,
  duration: 0.3,
});
```

**Animation:**
```typescript
const cards = gsap.utils.toArray(".category-card");

cards.forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 40,
    duration: 0.7,
    delay: i * 0.08,
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
    },
  });
});
```

---

### BrandStory.tsx

**Purpose:** Brand narrative and values

**Background:** Porcelain  
**Layout:** 2-column editorial (desktop), single column (mobile)

**Content:**
```
Left Column (40%):
Headline: "Made in Peshawar. Designed around formal details."

Right Column (60%):
Body: "CuffKings sources and curates premium cufflinks for men who pay attention to formal dressing. We work with metal finishes, enamel color, engraved patterns and crystal detailing. Each piece is selected for how it looks at the cuff — polished, deliberate, and considered."

[Learn more about us →]
```

**Animation:**
```typescript
gsap.from(".brand-story-headline", {
  opacity: 0,
  x: -30,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".brand-story",
    start: "top 75%",
  },
});

gsap.from(".brand-story-body", {
  opacity: 0,
  x: 30,
  duration: 0.8,
  delay: 0.2,
  scrollTrigger: {
    trigger: ".brand-story",
    start: "top 75%",
  },
});
```

---

### FinalCTA.tsx

**Purpose:** Final homepage call-to-action

**Background:** Obsidian  
**Layout:** Centered content

**Content:**
```
Headline: "Small details. Carefully chosen."
CTA Button: "Shop cufflinks"
```

**Styling:**
- Generous padding: py-section-lg (clamp(8rem, 15vw, 15rem))
- Headline: text-h2, font-display, text-porcelain, text-center
- Button: Large primary button, centered

**Animation:**
```typescript
gsap.from(".final-cta", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".final-cta",
    start: "top 80%",
  },
});
```

---

## 🛍️ SHOP COMPONENTS (components/shop/)

### ProductCard.tsx

**Purpose:** Individual product display in grids

**Props:**
```typescript
interface ProductCardProps {
  product: Product;
  size?: "small" | "medium" | "large";
  className?: string;
}
```

**Structure:**
```
[Product Image - aspect ratio 1:1]
[Badge if sale/limited]
Product Name (font-display)
Price (with strikethrough if sale)
```

**Hover Effect (GSAP):**
```typescript
const handleMouseEnter = () => {
  gsap.to(imageRef.current, {
    scale: 1.05,
    duration: 0.4,
    ease: "power3.out",
  });
  
  gsap.to(".brass-line", {
    scaleX: 1,
    duration: 0.3,
  });
};

const handleMouseLeave = () => {
  gsap.to(imageRef.current, {
    scale: 1,
    duration: 0.4,
    ease: "power3.out",
  });
  
  gsap.to(".brass-line", {
    scaleX: 0,
    duration: 0.3,
  });
};
```

**Interaction:**
- Click → Navigate to /product/[slug]
- Keyboard: Enter key triggers navigation
- Focus state: Champagne brass outline

---

### ProductGrid.tsx

**Purpose:** Container for product listings with grid layout

**Props:**
```typescript
interface ProductGridProps {
  products: Product[];
  layout?: "asymmetric" | "standard";
  selectedCategory?: string;
  sortBy?: string;
}
```

**Layouts:**

**Asymmetric (Default):**
- Products span different widths (3, 4, 5, 6 columns)
- First product is featured (larger)
- Editorial feel

**Standard:**
- Equal-width products (3 or 4 columns)
- For filtered views

**Grid Configuration:**
```css
/* Desktop */
.product-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

/* Tablet */
@media (max-width: 1023px) {
  .product-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

/* Mobile */
@media (max-width: 767px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

**Header:**
```
Category Name / Filter Results
Product count
[Sort Dropdown] [Filter Toggle (mobile)]
```

---

### FilterSidebar.tsx

**Purpose:** Product filtering and sorting controls

**Layout:**
- Desktop: Fixed sidebar, 280px width
- Mobile: Overlay drawer from right

**Filter Sections:**

1. **Category**
```
○ All Cufflinks
○ Gold Cufflinks
○ Silver Cufflinks
○ Blue Cufflinks
○ Gunmetal Cufflinks
○ Crystal Cufflinks
○ Gift Sets
```

2. **Price Range**
```
○ All Prices
○ Under Rs. 3,000
○ Rs. 3,000 - Rs. 5,000
○ Above Rs. 5,000
```

3. **Color**
```
□ Gold
□ Silver
□ Blue
□ Black
□ Ivory
□ Multi-color
```

4. **Finish**
```
□ Polished
□ Matte
□ Brushed
□ Textured
```

5. **Features**
```
□ Enamel
□ Crystal
□ Engraved
□ Limited Edition
```

6. **Sort By**
```
○ Featured
○ Newest First
○ Price: Low to High
○ Price: High to Low
```

**Mobile Animation:**
```typescript
gsap.from(".filter-sidebar", {
  x: "100%",
  duration: 0.3,
  ease: "power3.out",
});
```

**State Management:**
```typescript
interface FilterState {
  category: string | null;
  priceRange: [number, number] | null;
  colors: string[];
  finishes: string[];
  features: string[];
  sortBy: string;
}
```

---

## 📦 PRODUCT COMPONENTS (components/product/)

### ImageGallery.tsx

**Purpose:** Product image display with zoom and navigation

**Props:**
```typescript
interface ImageGalleryProps {
  images: string[];
  productName: string;
}
```

**Layout:**
```
[Main Image - Large]

[Thumbnail 1] [Thumbnail 2] [Thumbnail 3] [Thumbnail 4]
```

**Features:**
1. **Thumbnail Navigation**
   - Click thumbnail → Switch main image
   - Active thumbnail: Champagne brass border
   - GSAP fade transition (300ms)

2. **Zoom (Desktop)**
   - Click main image → Open zoom overlay
   - Mousemove → Pan zoomed image
   - Click outside / Escape → Close

3. **Swipe (Mobile)**
   - Swipe left/right to navigate
   - Dots indicator below image
   - Auto-hide thumbnails

**Animation:**
```typescript
// Image transition
gsap.to(".main-image", {
  opacity: 0,
  duration: 0.15,
  onComplete: () => {
    // Change image source
    gsap.to(".main-image", {
      opacity: 1,
      duration: 0.15,
    });
  },
});
```

**Zoom Overlay:**
- Background: rgba(16, 17, 16, 0.95)
- Image: Scale 2x, pan with mouse
- Close button: Top-right
- Escape key closes

---

### AddToCartButton.tsx

**Purpose:** Add product to cart with quantity selector

**Props:**
```typescript
interface AddToCartButtonProps {
  product: Product;
  className?: string;
}
```

**Layout:**
```
[Quantity Selector: - [1] +]

[Add to Cart Button (Full Width)]
```

**Quantity Selector:**
- Minus button (disabled at quantity 1)
- Number display (editable input)
- Plus button
- Range: 1-10

**Add to Cart Flow:**
1. User clicks "Add to Cart"
2. Show loading state (300ms)
3. Add to Zustand cart store
4. Success animation (checkmark, 500ms)
5. Show "Added to cart" (1.5s)
6. Revert to normal state

**Animation:**
```typescript
const handleAddToCart = async () => {
  // Loading
  gsap.to(".button-text", { opacity: 0, duration: 0.2 });
  gsap.to(".button-spinner", { opacity: 1, duration: 0.2 });
  
  // Add to cart
  await new Promise(resolve => setTimeout(resolve, 300));
  useCartStore.getState().addItem(product);
  
  // Success
  gsap.to(".button-spinner", { opacity: 0, duration: 0.2 });
  gsap.to(".button-checkmark", { 
    opacity: 1,
    scale: 1,
    duration: 0.3,
  });
  
  setTimeout(() => {
    gsap.to(".button-checkmark", { opacity: 0, duration: 0.2 });
    gsap.to(".button-text", { opacity: 1, duration: 0.2 });
  }, 1500);
};
```

**Styling:**
- Button: Large, champagne brass, full width
- Quantity controls: Border, champagne brass/30
- Disabled state: Opacity 0.5, cursor not-allowed

---

## 🛒 CART COMPONENTS (components/cart/)

### CartItem.tsx

**Purpose:** Individual item in cart

**Props:**
```typescript
interface CartItemProps {
  item: CartItem;
}
```

**Layout:**
```
[Image 100×100]  Product Name       Quantity: [- 1 +]  Rs. 4,500
                 Gold-tone, Polished                    [Remove]
```

**Features:**
- Update quantity (calls cartStore.updateQuantity)
- Remove item (with confirm animation)
- Show material/finish details
- Calculate line total (price × quantity)

**Remove Animation:**
```typescript
const handleRemove = () => {
  gsap.to(itemRef.current, {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    duration: 0.3,
    ease: "power2.out",
    onComplete: () => {
      useCartStore.getState().removeItem(item.id);
    },
  });
};
```

**Styling:**
- Border bottom: 1px champagne-brass/20
- Padding: py-4
- Grid: 4 columns (image, details, quantity, price+remove)
- Mobile: Stack vertically

---

### CartSummary.tsx

**Purpose:** Cart totals and checkout CTA

**Props:**
```typescript
interface CartSummaryProps {
  className?: string;
}
```

**Layout:**
```
Order Summary
-----------------------
Subtotal:      Rs. 9,000
Shipping:      Calculated at checkout

Total:         Rs. 9,000
-----------------------

[Proceed to Checkout]
[Continue Shopping]
```

**Calculations:**
- Subtotal: Sum of all (item.price × item.quantity)
- Shipping: Text only (calculated later via WhatsApp)
- Total: Same as subtotal

**Styling:**
- Background: Porcelain
- Border: 1px champagne-brass/20
- Padding: p-6
- Sticky on desktop (top: 8rem)

---

## 💳 CHECKOUT COMPONENTS (components/checkout/)

### CheckoutForm.tsx

**Purpose:** Collect delivery information for WhatsApp order

**State:**
```typescript
interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  city: string;
}

const [formData, setFormData] = useState<CheckoutFormData>({
  name: "",
  phone: "+92",
  address: "",
  city: "",
});

const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
```

**Fields:**

1. **Name**
```
Label: "Full name"
Placeholder: "Ahmed Khan"
Validation: Min 2 characters
```

2. **Phone**
```
Label: "Phone number"
Placeholder: "+92 300 1234567"
Validation: Pakistani format (+92 followed by 10 digits)
```

3. **Address**
```
Label: "Delivery address"
Type: Textarea (3 rows)
Placeholder: "House/flat number, street name, area"
Validation: Min 10 characters
```

4. **City**
```
Label: "City"
Placeholder: "Peshawar"
Validation: Required, min 2 characters
```

**Validation (Zod):**
```typescript
import { checkoutFormSchema } from '@/lib/validators';

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    // Validate with Zod
    checkoutFormSchema.parse(formData);
    
    // Generate WhatsApp message
    const message = generateWhatsAppMessage(
      cartItems,
      formData,
      totalPrice
    );
    
    // Open WhatsApp
    openWhatsApp(message);
    
    // Show success message
    setShowSuccess(true);
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: any = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
    }
  }
};
```

**Success State:**
```
✓ Order details sent to WhatsApp!

Your order information has been prepared. Please send the message in WhatsApp to complete your order.

We'll confirm your order and provide shipping details within a few hours.

[Back to Shop]
```

**Input Styling:**
- Background: White
- Border: 1px champagne-brass/30 (red if error)
- Text: Warm charcoal
- Focus: 2px champagne brass ring
- Padding: px-4 py-3
- Font: Manrope

---

## 📊 SUMMARY

**Total Components:** 24

**By Category:**
- UI: 4 components
- Layout: 2 components (+ mobile menu)
- Home: 7 components
- Shop: 3 components
- Product: 2 components
- Cart: 2 components
- Checkout: 1 component

**Animation Library:** GSAP + ScrollTrigger
**State Management:** Zustand (cart)
**Validation:** Zod (forms)
**Styling:** Tailwind CSS

---

**End of Components Reference**

*Last Updated: January 2026*
