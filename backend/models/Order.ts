import mongoose, { Schema, Document, Model } from "mongoose";

export type OrderStatus = "pending" | "confirmed" | "dispatched" | "delivered" | "cancelled";

export interface IOrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  material?: string;
}

export interface IOrder extends Document {
  orderId: string; // e.g. CK-48192
  customerName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  notes?: string;
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  courierTrackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    image: { type: String, required: true },
    material: { type: String },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    paymentMethod: {
      type: String,
      default: "Cash on Delivery (COD)",
    },
    notes: { type: String, default: "" },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, default: 180 },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "dispatched", "delivered", "cancelled"],
      default: "pending",
      index: true,
    },
    courierTrackingNumber: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const OrderModel: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;
