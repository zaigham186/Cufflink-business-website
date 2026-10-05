export type OrderStatus =
  | "pending"
  | "confirmed"
  | "dispatched"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  material: string;
}

export interface Order {
  _id?: string;
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  courierTrackingNumber?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface CreateOrderInput {
  orderId?: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod?: string;
  notes?: string;
  items: OrderItem[];
  subtotal?: number;
  deliveryFee?: number;
  total?: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod?: string;
  notes?: string;
  orderId?: string;
}

export type IOrder = Order;
export type IOrderItem = OrderItem;
