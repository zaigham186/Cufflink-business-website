export type CollectionCategory = "Classical" | "Signature" | "Premium";
export type CollectionSlug = "classical" | "signature" | "premium";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CollectionCategory;
  categorySlug: CollectionSlug;
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
  video?: string;
  heroVideo?: string;
}

/**
 * Price guidance per tier (informational for new products):
 * - Classical: Rs. 700–800
 * - Signature: Rs. 1,000–1,400
 * - Premium: Rs. 1,500–2,500
 *
 * ⚠️ PRICING MISMATCH FLAG:
 * The current 6 seeded products (Rs. 2,850–4,100) all exceed the new Premium
 * ceiling of Rs. 2,500. Assigned all 6 to "Premium" for now since they are closest.
 * This pricing mismatch requires client input before treating as final — do not quietly re-price.
 */
const products: Product[] = [
  {
    id: "1",
    name: "Ivory Pavé Gold Cufflinks",
    slug: "ivory-pave-gold-cufflinks",
    category: "Premium",
    categorySlug: "premium",
    description:
      "Gold-tone metal paired with ivory enamel and crystal pavé detailing. Filed edges, polished surface, secure toggle closure.",
    price: 3200,
    images: ["/products/ivory-pave-gold-1.jpg", "/products/ivory-pave-gold-2.jpg"],
    material: "Gold-tone metal, ivory enamel, crystal pavé",
    finish: "Polished",
    color: "Gold, Ivory",
    shape: "Rectangular",
    pattern: "Pavé crystal border",
    isSet: false,
    pairsCount: 1,
    stock: 12,
    sku: "CK-IPG-001",
    featured: true,
    hasPhotography: true,
  },
  {
    id: "2",
    name: "Sapphire Ornamental Cufflinks",
    slug: "sapphire-ornamental-cufflinks",
    category: "Premium",
    categorySlug: "premium",
    description:
      "Silver-tone metal with deep blue enamel and engraved floral detailing. Polished edges, secure toggle closure.",
    price: 4100,
    images: ["/products/sapphire-ornamental-1.jpg", "/products/sapphire-ornamental-2.jpg"],
    material: "Silver-tone metal, deep blue enamel",
    finish: "Polished with engraved pattern",
    color: "Silver, Blue",
    shape: "Circular",
    pattern: "Floral engraving",
    isSet: false,
    pairsCount: 1,
    stock: 8,
    sku: "CK-SO-002",
    featured: true,
    hasPhotography: true,
  },
  {
    id: "3",
    name: "Onyx Geometric Cufflinks",
    slug: "onyx-geometric-cufflinks",
    category: "Premium",
    categorySlug: "premium",
    description:
      "Gunmetal finish with black enamel and engraved geometric pattern. Matte surface, filed edges, secure toggle closure.",
    price: 2850,
    images: ["/products/onyx-geometric-1.jpg", "/products/onyx-geometric-2.jpg"],
    material: "Gunmetal finish, black enamel",
    finish: "Matte gunmetal",
    color: "Gunmetal, Black",
    shape: "Square",
    pattern: "Geometric engraving",
    isSet: false,
    pairsCount: 1,
    stock: 15,
    sku: "CK-OG-003",
    featured: true,
    hasPhotography: true,
  },
  {
    id: "4",
    name: "Gold Trellis Crystal Cufflinks",
    slug: "gold-trellis-crystal-cufflinks",
    category: "Premium",
    categorySlug: "premium",
    description:
      "Gold-tone metal with crystal detailing and engraved lattice pattern. Polished surface, filed edges, secure toggle closure.",
    price: 3450,
    images: ["/products/gold-trellis-crystal-1.jpg", "/products/gold-trellis-crystal-2.jpg"],
    material: "Gold-tone metal, crystal detailing",
    finish: "Polished",
    color: "Gold",
    shape: "Rectangular",
    pattern: "Lattice engraving",
    isSet: false,
    pairsCount: 1,
    stock: 10,
    sku: "CK-GTC-004",
    featured: false,
    hasPhotography: true,
  },
  {
    id: "5",
    name: "Royal Blue Floral Cufflinks",
    slug: "royal-blue-floral-cufflinks",
    category: "Premium",
    categorySlug: "premium",
    description:
      "Silver-tone metal with blue enamel and floral engraving. Polished finish, secure toggle closure.",
    price: 3600,
    images: ["/products/royal-blue-floral-1.jpg"],
    material: "Silver-tone metal, blue enamel",
    finish: "Polished with engraving",
    color: "Silver, Blue",
    shape: "Circular",
    pattern: "Floral engraving",
    isSet: false,
    pairsCount: 1,
    stock: 6,
    sku: "CK-RBF-005",
    featured: false,
    hasPhotography: true,
  },
  {
    id: "6",
    name: "Black Patterned Gunmetal Cufflinks",
    slug: "black-patterned-gunmetal-cufflinks",
    category: "Premium",
    categorySlug: "premium",
    description:
      "Gunmetal with black enamel and engraved repeating pattern. Matte finish, filed edges, secure toggle closure.",
    price: 2950,
    images: ["/products/black-patterned-gunmetal-1.jpg"],
    material: "Gunmetal, black enamel",
    finish: "Matte gunmetal",
    color: "Gunmetal, Black",
    shape: "Rectangular",
    pattern: "Repeating geometric pattern",
    isSet: false,
    pairsCount: 1,
    stock: 9,
    sku: "CK-BPG-006",
    featured: false,
    hasPhotography: true,
  },
];

// Data access functions - swap these implementations for database queries later
export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function searchProducts(query: string): Product[] {
  if (!query || !query.trim()) return [];
  const lowerQuery = query.toLowerCase().trim();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.material.toLowerCase().includes(lowerQuery) ||
      product.finish.toLowerCase().includes(lowerQuery) ||
      product.color.toLowerCase().includes(lowerQuery) ||
      product.pattern.toLowerCase().includes(lowerQuery)
  );
}

// Collection / Category data
export interface Category {
  name: CollectionCategory;
  slug: CollectionSlug;
  description: string;
  priceRange: string;
}

export const categories: Category[] = [
  {
    name: "Classical",
    slug: "classical",
    description: "Essential formal cufflinks with a clean finish and timeless proportions.",
    priceRange: "Rs. 700–800",
  },
  {
    name: "Signature",
    slug: "signature",
    description: "Refined details, rich mineral enamel, and subtle surface textures.",
    priceRange: "Rs. 1,000–1,400",
  },
  {
    name: "Premium",
    slug: "premium",
    description: "Artisanal pieces featuring fine engraving, crystal pavé, and stone detailing.",
    priceRange: "Rs. 1,500–2,500",
  },
];
