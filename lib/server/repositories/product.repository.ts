import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/server/db";
import ProductModel, { IProductDocument } from "@/models/Product";
import type { Product, StockStatus } from "@/types/product";

function toPlainProduct(doc: any): Product {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : doc;
  const count = typeof obj.stockCount === "number" ? obj.stockCount : 10;
  const status: StockStatus =
    obj.stock || (count === 0 ? "out-of-stock" : count <= 5 ? "low-stock" : "in-stock");
  return {
    ...obj,
    _id: obj._id ? obj._id.toString() : undefined,
    id: obj._id ? obj._id.toString() : obj.id,
    stock: count,
    stockStatus: status,
    stockCount: count,
  };
}

function getQueryByIdOrSlug(idOrSlug: string) {
  const isObjectId = mongoose.Types.ObjectId.isValid(idOrSlug);
  return isObjectId ? { _id: idOrSlug } : { slug: idOrSlug };
}

export class ProductRepository {
  async findAll(query: Record<string, any> = {}, sort: any = { createdAt: -1 }): Promise<Product[]> {
    await connectToDatabase();
    const docs = await ProductModel.find(query).sort(sort).lean();
    return docs.map(toPlainProduct);
  }

  async findFeatured(limit = 6): Promise<Product[]> {
    await connectToDatabase();
    const docs = await ProductModel.find({ featured: true }).limit(limit).lean();
    return docs.map(toPlainProduct);
  }

  async findBySlug(slug: string): Promise<Product | null> {
    await connectToDatabase();
    const doc = await ProductModel.findOne({ slug }).lean();
    return doc ? toPlainProduct(doc) : null;
  }

  async findById(id: string): Promise<Product | null> {
    await connectToDatabase();
    const doc = await ProductModel.findOne(getQueryByIdOrSlug(id)).lean();
    return doc ? toPlainProduct(doc) : null;
  }

  async findByCategory(categorySlug: string): Promise<Product[]> {
    await connectToDatabase();
    const lowerSlug = categorySlug.toLowerCase().trim();
    const docs = await ProductModel.find({
      $or: [
        { categorySlug: lowerSlug },
        { category: { $regex: new RegExp(`^${lowerSlug}$`, "i") } },
      ],
    }).lean();
    return docs.map(toPlainProduct);
  }

  async search(searchQuery: string): Promise<Product[]> {
    if (!searchQuery || !searchQuery.trim()) return [];
    await connectToDatabase();
    const docs = await ProductModel.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { material: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { color: { $regex: searchQuery, $options: "i" } },
        { finish: { $regex: searchQuery, $options: "i" } },
        { pattern: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    }).lean();
    return docs.map(toPlainProduct);
  }

  async filter(filters: {
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
    return docs.map(toPlainProduct);
  }

  async checkExisting(slug: string, sku: string): Promise<boolean> {
    await connectToDatabase();
    const existing = await ProductModel.findOne({
      $or: [{ slug }, { sku }],
    });
    return !!existing;
  }

  async create(data: any): Promise<Product> {
    await connectToDatabase();
    const created = await ProductModel.create(data);
    return toPlainProduct(created);
  }

  async update(idOrSlug: string, data: any): Promise<Product | null> {
    await connectToDatabase();
    const updated = await ProductModel.findOneAndUpdate(
      getQueryByIdOrSlug(idOrSlug),
      { $set: data },
      { returnDocument: "after", runValidators: true }
    ).lean();
    return updated ? toPlainProduct(updated) : null;
  }

  async delete(idOrSlug: string): Promise<boolean> {
    await connectToDatabase();
    const deleted = await ProductModel.findOneAndDelete(getQueryByIdOrSlug(idOrSlug));
    return !!deleted;
  }

  async count(query: Record<string, any> = {}): Promise<number> {
    await connectToDatabase();
    return ProductModel.countDocuments(query);
  }
}

export const productRepository = new ProductRepository();
