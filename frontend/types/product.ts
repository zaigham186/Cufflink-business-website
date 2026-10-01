// types/product.ts
// Authoritative shared Product type — referenced by Mongoose schema, API routes, and frontend components.

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
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export type ProductInput = Omit<Product, "id" | "slug"> & {
  id?: string;
  slug?: string;
};
