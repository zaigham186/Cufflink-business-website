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

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  image: z.string(),
  material: z.string(),
});

export const createOrderSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().min(2),
  phone: z.string().min(9),
  address: z.string().min(5),
  city: z.string().min(2),
  paymentMethod: z.string().default("Cash on Delivery (COD)"),
  notes: z.string().max(300).optional().default(""),
  items: z.array(orderItemSchema).min(1, "Order must contain at least one item"),
  subtotal: z.number().optional(),
  deliveryFee: z.number().default(180),
  total: z.number().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z
    .enum(["pending", "confirmed", "dispatched", "delivered", "cancelled"])
    .optional(),
  courierTrackingNumber: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
