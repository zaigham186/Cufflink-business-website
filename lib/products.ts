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

// Static product data - designed to be swapped for database queries later
const products: Product[] = [
  {
    id: "1",
    name: "Ivory Pavé Gold Cufflinks",
    slug: "ivory-pave-gold-cufflinks",
    category: "Gold Cufflinks",
    categorySlug: "gold-cufflinks",
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
    category: "Silver Cufflinks",
    categorySlug: "silver-cufflinks",
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
    category: "Gunmetal Cufflinks",
    categorySlug: "gunmetal-cufflinks",
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
    category: "Gold Cufflinks",
    categorySlug: "gold-cufflinks",
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
    category: "Enamel Cufflinks",
    categorySlug: "enamel-cufflinks",
    description:
      "Silver-tone metal with blue enamel and floral engraving. Polished finish, secure toggle closure.",
    price: 3600,
    images: ["/products/placeholder-brass.jpg"],
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
    hasPhotography: false,
  },
  {
    id: "6",
    name: "Black Patterned Gunmetal Cufflinks",
    slug: "black-patterned-gunmetal-cufflinks",
    category: "Gunmetal Cufflinks",
    categorySlug: "gunmetal-cufflinks",
    description:
      "Gunmetal with black enamel and engraved repeating pattern. Matte finish, filed edges, secure toggle closure.",
    price: 2950,
    images: ["/products/placeholder-brass.jpg"],
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
    hasPhotography: false,
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
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.material.toLowerCase().includes(lowerQuery)
  );
}

// Category data
export interface Category {
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  {
    name: "Gold Cufflinks",
    slug: "gold-cufflinks",
    description: "Gold-tone metal with polished and engraved finishes",
  },
  {
    name: "Silver Cufflinks",
    slug: "silver-cufflinks",
    description: "Silver-tone metal with enamel and crystal detailing",
  },
  {
    name: "Gunmetal Cufflinks",
    slug: "gunmetal-cufflinks",
    description: "Matte gunmetal finish with black enamel",
  },
  {
    name: "Enamel Cufflinks",
    slug: "enamel-cufflinks",
    description: "Deep enamel detailing with engraved patterns",
  },
  {
    name: "Statement Cufflinks",
    slug: "statement-cufflinks",
    description: "Bold designs and unique patterns",
  },
  {
    name: "Gift Sets",
    slug: "gift-sets",
    description: "Curated sets in presentation boxes",
  },
];
