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
