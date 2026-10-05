import mongoose, { Schema, Document, Model } from "mongoose";
import type { Collection, StockStatus } from "@/shared/types/product";

export interface IProductDocument extends Document {
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
  stock: StockStatus;
  stockCount: number;
  sku: string;
  featured: boolean;
  isFeatured?: boolean;
  isLimited?: boolean;
  details?: {
    dimensions?: string;
    weight?: string;
    fastening?: string;
    care?: string;
  };
  hasPhotography?: boolean;
  video?: string;
  heroVideo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Classical", "Signature", "Premium"],
    },
    categorySlug: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    images: [{ type: String }],
    material: { type: String, required: true },
    finish: { type: String, required: true },
    color: { type: String, required: true },
    shape: { type: String },
    pattern: { type: String, default: "" },
    isSet: { type: Boolean, default: false },
    pairsCount: { type: Number, default: 1 },
    stock: {
      type: String,
      enum: ["in-stock", "low-stock", "out-of-stock"],
      default: "in-stock",
    },
    stockCount: { type: Number, default: 0 },
    sku: { type: String, required: true, unique: true, uppercase: true },
    featured: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isLimited: { type: Boolean, default: false },
    details: {
      dimensions: { type: String },
      weight: { type: String },
      fastening: { type: String, default: "Swivel toggle" },
      care: { type: String, default: "Wipe with a soft dry cloth." },
    },
    hasPhotography: { type: Boolean, default: false },
    video: { type: String },
    heroVideo: { type: String },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });

const ProductModel: Model<IProductDocument> =
  mongoose.models.Product ||
  mongoose.model<IProductDocument>("Product", ProductSchema);

export default ProductModel;
