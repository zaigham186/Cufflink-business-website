// lib/products.ts
import { connectToDatabase } from "@/backend/lib/db";
import ProductModel from "@/backend/models/Product";
import type { Product, CollectionCategory, CollectionSlug, StockStatus } from "@/shared/types/product";

export type { Product, CollectionCategory, CollectionSlug, StockStatus };

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

function toPlain(doc: any): Product {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : doc;
  const count = typeof obj.stockCount === "number" ? obj.stockCount : 10;
  const status: StockStatus = obj.stock || (count === 0 ? "out-of-stock" : count <= 5 ? "low-stock" : "in-stock");
  return {
    ...obj,
    _id: obj._id ? obj._id.toString() : undefined,
    id: obj._id ? obj._id.toString() : obj.id,
    stock: count,
    stockStatus: status,
    stockCount: count,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    await connectToDatabase();
    const docs = await ProductModel.find({}).sort({ createdAt: -1 }).lean();
    return docs.map(toPlain);
  } catch (error) {
    console.error("getAllProducts error:", error);
    return [];
  }
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  try {
    await connectToDatabase();
    const docs = await ProductModel.find({ featured: true }).limit(limit).lean();
    return docs.map(toPlain);
  } catch (error) {
    console.error("getFeaturedProducts error:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    await connectToDatabase();
    const doc = await ProductModel.findOne({ slug }).lean();
    return doc ? toPlain(doc) : undefined;
  } catch (error) {
    console.error(`getProductBySlug (${slug}) error:`, error);
    return undefined;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    await connectToDatabase();
    const lowerSlug = categorySlug.toLowerCase().trim();
    const docs = await ProductModel.find({
      $or: [{ categorySlug: lowerSlug }, { category: { $regex: new RegExp(`^${lowerSlug}$`, "i") } }],
    }).lean();
    return docs.map(toPlain);
  } catch (error) {
    console.error(`getProductsByCategory (${categorySlug}) error:`, error);
    return [];
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query || !query.trim()) return [];
  try {
    await connectToDatabase();
    const docs = await ProductModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { material: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { color: { $regex: query, $options: "i" } },
        { finish: { $regex: query, $options: "i" } },
        { pattern: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).lean();
    return docs.map(toPlain);
  } catch (error) {
    console.error("searchProducts error:", error);
    return [];
  }
}

export async function filterProducts(filters: {
  category?: string;
  color?: string;
  finish?: string;
  pattern?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Product[]> {
  await connectToDatabase();
  const query: Record<string, any> = {};
  if (filters.category && filters.category !== "all") {
    query.categorySlug = filters.category.toLowerCase().trim();
  }
  if (filters.color) query.color = { $regex: filters.color, $options: "i" };
  if (filters.finish) query.finish = { $regex: filters.finish, $options: "i" };
  if (filters.pattern) query.pattern = { $regex: filters.pattern, $options: "i" };
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.price = {};
    if (filters.minPrice !== undefined) query.price.$gte = filters.minPrice;
    if (filters.maxPrice !== undefined) query.price.$lte = filters.maxPrice;
  }
  const docs = await ProductModel.find(query).sort({ createdAt: -1 }).lean();
  return docs.map(toPlain);
}
