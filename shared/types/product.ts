export type Collection = "Classical" | "Signature" | "Premium";
export type CollectionCategory = Collection;
export type CollectionSlug = "classical" | "signature" | "premium" | string;
export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface Product {
  _id?: string;
  id: string;
  name: string;
  slug: string;
  category: Collection;
  categorySlug: string;
  description: string;
  longDescription?: string;
  price: number;
  salePrice?: number;
  compareAtPrice?: number;
  images: string[];
  material: string;
  finish: string;
  color: string;
  shape?: string;
  pattern: string;
  isSet: boolean;
  pairsCount: number;
  stock: number;
  stockStatus?: StockStatus;
  stockCount?: number;
  sku: string;
  featured: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isLimited?: boolean;
  details?: {
    dimensions?: string;
    weight?: string;
    fastening: string;
    care: string;
  };
  hasPhotography?: boolean;
  video?: string;
  heroVideo?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type ProductInput = Omit<Product, "id" | "slug"> & {
  id?: string;
  slug?: string;
};
