// types/collection.ts
// Shared Collection type definition

import { CollectionCategory, CollectionSlug } from "./product";

export interface CollectionSetting {
  id?: string;
  name: CollectionCategory;
  slug: CollectionSlug;
  tagline: string;
  priceRange: string;
  description: string;
  bannerImage?: string;
  featuredProductIds?: string[];
  sortOrder?: number;
  isActive?: boolean;
  updatedAt?: string | Date;
}
