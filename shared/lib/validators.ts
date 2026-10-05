import { z } from "zod";

export const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z
    .string()
    .trim()
    .min(9, "Please enter a valid phone number")
    .regex(/^[0-9+\s()-]+$/, "Phone number contains invalid characters"),
  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(250, "Address must be less than 250 characters"),
  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(60, "City must be less than 60 characters"),
  paymentMethod: z.string().optional(),
  notes: z.string().max(300, "Notes must be under 300 characters").optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Admin Product Schema
export const productSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens only"),
  category: z.enum(["Classical", "Signature", "Premium"]),
  categorySlug: z.string().min(2),
  description: z.string().min(10).max(1000),
  longDescription: z.string().optional(),
  price: z.number().positive(),
  salePrice: z.number().positive().optional(),
  compareAtPrice: z.number().positive().optional(),
  images: z.array(z.string()).min(1, "At least one image required"),
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

// Admin Collection Settings Schema
export const collectionSettingsSchema = z.object({
  tier: z.enum(["Classical", "Signature", "Premium"]),
  priceRangeLabel: z.string().min(2),
  description: z.string().min(5),
});
export type CollectionSettingsFormData = z.infer<typeof collectionSettingsSchema>;

// Admin Site Content Schema
export const siteContentSchema = z.object({
  heroHeadline: z.string().min(2),
  heroSubtext: z.string().min(2),
  whatsappNumber: z.string().min(7),
  deliveryFeePkr: z.number().min(0),
  faqDeliveryTime: z.string(),
  faqDeliveryCoverage: z.string(),
  faqReturnPolicy: z.string(),
});
export type SiteContentFormData = z.infer<typeof siteContentSchema>;
