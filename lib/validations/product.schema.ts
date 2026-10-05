import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens only"),
  category: z.enum(["Classical", "Signature", "Premium"]),
  categorySlug: z.string().min(2),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000),
  longDescription: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  salePrice: z.number().positive().optional(),
  compareAtPrice: z.number().positive().optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  material: z.string().min(2),
  finish: z.string().min(2),
  color: z.string().min(2),
  shape: z.string().optional(),
  pattern: z.string().optional().default(""),
  isSet: z.boolean().default(false),
  pairsCount: z.number().int().positive().default(1),
  stock: z.enum(["in-stock", "low-stock", "out-of-stock"]).default("in-stock"),
  stockCount: z.number().int().min(0).default(0),
  sku: z.string().min(2).max(50),
  featured: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  isLimited: z.boolean().default(false),
  details: z
    .object({
      dimensions: z.string().optional(),
      weight: z.string().optional(),
      fastening: z.string().default("Swivel toggle"),
      care: z.string().default("Wipe with a soft dry cloth."),
    })
    .optional(),
  hasPhotography: z.boolean().default(false),
  video: z.string().optional(),
  heroVideo: z.string().optional(),
});

export const productUpdateSchema = productSchema.partial();
export type ProductFormData = z.infer<typeof productSchema>;
export type ProductUpdateFormData = z.infer<typeof productUpdateSchema>;
