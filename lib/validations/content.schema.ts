import { z } from "zod";

export const siteContentSchema = z.object({
  heroHeadline: z.string().min(2, "Hero headline required"),
  heroSubtext: z.string().min(2, "Hero subtext required"),
  whatsappNumber: z.string().min(7, "Valid WhatsApp number required"),
  deliveryFeePkr: z.number().min(0, "Delivery fee must be 0 or more"),
  faqDeliveryTime: z.string(),
  faqDeliveryCoverage: z.string(),
  faqReturnPolicy: z.string(),
});

export type SiteContentFormData = z.infer<typeof siteContentSchema>;
