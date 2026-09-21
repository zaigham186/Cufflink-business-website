# CuffKings — About & Contact Page Details Reference (Updated)

> **Document Status:** Reference & Content Audit (Reflected for Prompt 7)  
> **Source Files Inspected:**  
> - [`app/about/page.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/about/page.tsx)  
> - [`app/contact/page.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/contact/page.tsx)  
> - [`components/contact/ContactInquiryForm.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/contact/ContactInquiryForm.tsx)  
> - [`components/contact/ContactChannels.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/contact/ContactChannels.tsx)  
> - [`components/contact/ContactFAQ.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/contact/ContactFAQ.tsx)  
> - [`components/home/MoreAboutCufflinks.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/home/MoreAboutCufflinks.tsx)  
> - [`components/layout/Footer.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/layout/Footer.tsx)  

---

## Part 1: About Page Details (`/about`)

### 1. Page Metadata
- **File:** [`app/about/page.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/about/page.tsx)
- **Page Title:** `About — CuffKings`
- **Meta Description:** `Cufflinks built around polished metal, considered patterns and the details of formal dressing. Handcrafted in Peshawar, Pakistan.`

---

### 2. Section 1: Header & Intro Block
*Dark Obsidian Background (`bg-obsidian text-porcelain`)*

| Element | Value / Copy |
| :--- | :--- |
| **Eyebrow / Badge** | `CUFFKINGS ATELIER` *(Tracked letter-spacing: 0.25em, Champagne Brass color)* |
| **Main Heading (H1)** | `The detail changes everything.` |
| **Body Description** | *"CuffKings focuses on men's accessories for formal dressing. Crafted across three collections — Classical, Signature, and Premium — every pair starts with solid metal, filed surfaces and hand-set enamel, finished and inspected in Peshawar before it is packed."* |

---

### 3. Section 2: Large Editorial Photography Break
*Editorial Image Banner*

| Element | Details |
| :--- | :--- |
| **Image File** | `/editorial/craftsmanship-detail.jpg` |
| **Alt Text** | `"Cufflink hand finishing and filing in Peshawar workshop"` |
| **Aspect Ratio / Size**| `aspect-[21/9]`, `min-h-[350px]`, full-width with `bg-obsidian/30` overlay |
| **Animation** | `ImageReveal` (GSAP smooth reveal from bottom, duration 1.3s) |

---

### 4. Section 3: Narrative & Materials Section
*Light Porcelain Contrast Section (`bg-porcelain text-warm-charcoal`)*

#### Left Column — Story & Craftsmanship:
- **Heading (H2):** `Based in Peshawar. Focused on formal dressing.`
- **Paragraph 1:**  
  *"Formal dressing leaves little room for excess. When a suit fits and a shirt cuff sits right at the wrist, the cufflink is the single point where craftsmanship, weight, and metal finish meet."*
- **Paragraph 2:**  
  *"Operating from Peshawar, Pakistan, we work closely with metalworkers and enamel craftspeople. We focus on finishing: filing sharp burrs, balancing weight so the cuff hangs cleanly, and testing toggle backings for reliable tension."*
- **Location Tag:** `Khyber Pakhtunkhwa, Pakistan` *(with champagne brass divider)*

#### Right Column — Materials Breakdown (With Explicit Tier Tags):
1. **Solid metal surfaces** — `(Classical and above)`
   - *Description:* *"Gold-tone, silver-tone, and matte gunmetal. Each surface is filed and mirror-polished or wire-brushed so light reflects cleanly across edges."*
2. **Deep mineral enamel** — `(Signature and above)`
   - *Description:* *"Sapphire blue, black, and ivory fills. Set flush with the cufflink perimeter to eliminate ridges that catch on fabric."*
3. **Engraving and crystal pavé** — `(Premium)`
   - *Description:* *"Geometric repeats, trellis lattice, and floral engraving cut deep enough to provide tactile texture without ostentation."*

---

### 5. Section 4: "Three collections, one standard of finish" (New Tier Section)
*Dark Obsidian Background (`bg-obsidian text-porcelain`)*

- **Eyebrow:** `THE THREE TIERS`
- **Heading (H2):** `Three collections, one standard of finish.`
- **Sub-narrative:** *"From clean daily essentials to ornate ceremonial statements, each tier is defined by its materials and finish complexity—never by compromises in construction."*
- **Three Columns:**
  1. **Classical Collection** (`Rs. 700–800`):
     - *"A clean, single-finish surface — polished or brushed metal, precise edges, nothing extra. Built for daily formal wear."*
     - Direct Link: [`/shop?category=classical`](file:///shop?category=classical)
  2. **Signature Collection** (`Rs. 1,000–1,400`):
     - *"Metal paired with enamel or engraved detail — a level of finish worth a second look up close."*
     - Direct Link: [`/shop?category=signature`](file:///shop?category=signature)
  3. **Premium Collection** (`Rs. 1,500–2,500`):
     - *"Crystal pavé, fine engraving, and the most demanding finishing work we do — reserved for occasions that call for it."*
     - Direct Link: [`/shop?category=premium`](file:///shop?category=premium)

---

### 6. Section 5: Atelier Weight & Sartorial Anatomy Component
*From [`components/home/MoreAboutCufflinks.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/home/MoreAboutCufflinks.tsx) (`bg-deep-petrol text-porcelain`)*

- **Eyebrow:** `ATELIER NOTES`
- **Heading (H2):** `Considered patterns. Balanced weight.`
- **Narrative:**  
  *"A cufflink should anchor a cuff without pulling the fabric. We calibrate the weight of each pair between 14 and 22 grams—substantial enough to feel intentional, balanced enough to sit cleanly through an evening."*
- **Key Statistics:**
  - **`14–22g`**: *Calibrated pair weight for balanced drape*
  - **`100%`**: *Surface-inspected under directional light*
- **Secondary Link:** `Read about the workshop in Peshawar →` (links to `/about`)
- **Workshop Image:** `/editorial/peshawar-atelier.jpg`  
  - *Alt:* `"Peshawar jewelry workbench with cufflinks and finishing tools"`

---

### 7. Section 6: Atelier Closing CTA Block
*Dark Obsidian Background (`bg-obsidian text-porcelain`)*

- **Heading (H3):** `Finished for the occasion.`
- **Body Text:** *"Whether selected for a wedding, evening formalwear, or black-tie dress, our pieces are built to remain understated and sharp."*
- **Call-to-Action Button:**
  - **Button Text:** `Explore the pieces`
  - **Button Link:** `/shop`
  - **Button Styling:** Champagne Brass background (`bg-champagne-brass text-obsidian`) with magnetic hover interaction

---
---

## Part 2: Contact Page Details (`/contact`)

### 1. Page Metadata
- **File:** [`app/contact/page.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/app/contact/page.tsx)
- **Page Title:** `Contact — CuffKings`
- **Meta Description:** `Direct contact for CuffKings cufflinks via WhatsApp, email, and social. Located in Peshawar, Pakistan.`

---

### 2. Header & Main Title Block
*Obsidian Background (`bg-obsidian text-porcelain`)*

| Element | Value / Copy |
| :--- | :--- |
| **Eyebrow / Badge** | `CUFFKINGS PESHAWAR` *(Letter-spacing: 0.25em, Champagne Brass)* |
| **Main Heading (H1)** | `Contact the atelier` |
| **Subtitle Description** | *"For order confirmations, custom requests, and finish inquiries. We respond directly."* |

---

### 3. Editorial Photography Break (New)
- **Image File:** `/editorial/contact-editorial.jpg`
- **Alt Text:** `"CuffKings atelier workshop desk with cufflinks, bespoke tailoring tools and ledger"`
- **Treatment:** `aspect-[21/9]`, `min-h-[320px]`, `ImageReveal` animation matching About page.

---

### 4. Interactive Inquiry Form (`ContactInquiryForm.tsx`)
- **Component File:** [`components/contact/ContactInquiryForm.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/contact/ContactInquiryForm.tsx)
- **Fields:**
  1. `Your Name` (text input, required)
  2. `Inquiry Type` (dropdown with options: *General inquiry*, *Custom order*, *Collection question*, *Order status*)
  3. `Message` (textarea, required)
- **Submission Action:** Launches `wa.me` in a new tab with pre-formatted WhatsApp message:
  ```text
  *New Inquiry — CuffKings Atelier*

  *Client Name:* [Name]
  *Inquiry Type:* [Inquiry Type]

  *Message:*
  [Message]

  Sent from the CuffKings website contact page.
  ```

---

### 5. Direct Channels Grid (`ContactChannels.tsx`)
- **Component File:** [`components/contact/ContactChannels.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/contact/ContactChannels.tsx)

| Channel | Label | Target / Value | Action / Link | Icon |
| :--- | :--- | :--- | :--- | :--- |
| **WhatsApp Direct** | `WhatsApp Direct` | `+92 300 1234567` | WhatsApp deep-link | Chat bubble icon |
| **Direct Email** | `Direct Email` | `info@cuffkings.pk` | `mailto:info@cuffkings.pk` | Envelope icon |
| **Social** | `Instagram` | `@cuffkings` | `https://instagram.com` | Camera glyph |
| **Workshop & Atelier** | `Workshop & Atelier` | `Peshawar, Pakistan` | Display text | Atelier pin icon |

---

### 6. Client FAQ Accordion Section (`ContactFAQ.tsx`)
- **Component File:** [`components/contact/ContactFAQ.tsx`](file:///c:/Users/Hp/OneDrive/Desktop/All%20files/cufflinks%20website/components/contact/ContactFAQ.tsx)
- **Questions & Policy Status:**
  1. *"How do I place an order?"* &rarr; **Active**: *"Add pieces to your cart and check out through WhatsApp — we'll confirm availability and delivery details directly with you."*
  2. *"How do I care for my cufflinks?"* &rarr; **Active**: *"Wipe with a soft, dry cloth after wear. Avoid direct contact with perfume or lotion on enamel or crystal surfaces, and store in the box when not in use."*
  3. *"How long does delivery take?"* &rarr; **Flagged**: `// TODO: Confirm actual delivery timeframe with the client before production launch`
  4. *"Do you deliver nationwide?"* &rarr; **Flagged**: `// TODO: Confirm delivery coverage/areas with the client before production launch`
  5. *"What if I want to exchange or return a piece?"* &rarr; **Flagged**: `// TODO: Confirm the actual return/exchange policy with the client — do not invent one`
