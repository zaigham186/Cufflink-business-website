import { z } from "zod";

export const collectionSettingsSchema = z.object({
  tier: z.enum(["Classical", "Signature", "Premium"]),
  priceRangeLabel: z.string().min(2, "Price range label required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export type CollectionSettingsFormData = z.infer<typeof collectionSettingsSchema>;
