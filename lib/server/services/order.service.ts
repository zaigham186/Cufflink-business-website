import { orderRepository } from "@/lib/server/repositories/order.repository";
import type { Order, CreateOrderInput, OrderStatus } from "@/types/order";

export const INITIAL_ATELIER_ORDERS = [
  {
    orderId: "CK-84192",
    customerName: "Malik Shahryar",
    phone: "03215549021",
    address: "House 42-B, Street 9, Sector F-7/2",
    city: "Islamabad",
    paymentMethod: "Cash on Delivery (COD)",
    notes: "Please pack in formal executive presentation box for gift.",
    items: [
      {
        productId: "sample-1",
        name: "Imperial Guilloché Emerald Studs",
        slug: "imperial-guilloche-emerald-studs",
        price: 1800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=800&auto=format&fit=crop",
        material: "Brass / Gold Electroplate",
      },
    ],
    subtotal: 1800,
    deliveryFee: 180,
    total: 1980,
    status: "dispatched" as OrderStatus,
    courierTrackingNumber: "TCS-924185012PK",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18),
  },
  {
    orderId: "CK-84193",
    customerName: "Barrister Daniyal Khan",
    phone: "03008451129",
    address: "Suite 404, Eden Heights, Jail Road, Gulberg",
    city: "Lahore",
    paymentMethod: "Cash on Delivery (COD)",
    notes: "Deliver before 5 PM to law chambers.",
    items: [
      {
        productId: "sample-2",
        name: "Bespoke Onyx Octagonal Cufflinks",
        slug: "bespoke-onyx-octagonal-cufflinks",
        price: 1400,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop",
        material: "Gunmetal & Onyx Stone",
      },
      {
        productId: "sample-3",
        name: "Classical Florentine Silver Knot",
        slug: "classical-florentine-silver-knot",
        price: 800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
        material: "Silver Plate",
      },
    ],
    subtotal: 3600,
    deliveryFee: 180,
    total: 3780,
    status: "confirmed" as OrderStatus,
    courierTrackingNumber: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
  },
  {
    orderId: "CK-84194",
    customerName: "Dr. Hamza Afridi",
    phone: "03339182344",
    address: "Bungalow 18, Phase 5, Hayatabad",
    city: "Peshawar",
    paymentMethod: "Cash on Delivery (COD)",
    notes: "Local delivery in Peshawar.",
    items: [
      {
        productId: "sample-4",
        name: "Vintage Monogram Brass Cufflinks",
        slug: "vintage-monogram-brass-cufflinks",
        price: 1200,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=800&auto=format&fit=crop",
        material: "Champagne Brass",
      },
    ],
    subtotal: 1200,
    deliveryFee: 180,
    total: 1380,
    status: "pending" as OrderStatus,
    courierTrackingNumber: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
  },
];

export class OrderService {
  async ensureInitialOrders(): Promise<void> {
    const count = await orderRepository.count();
    if (count === 0) {
      await orderRepository.insertMany(INITIAL_ATELIER_ORDERS);
    }
  }

  async getOrders(options: {
    status?: string;
    search?: string;
    limit?: number;
  } = {}): Promise<Order[]> {
    await this.ensureInitialOrders();

    const query: Record<string, any> = {};

    if (options.status && options.status !== "all") {
      query.status = options.status;
    }

    if (options.search) {
      const regex = new RegExp(options.search, "i");
      query.$or = [
        { orderId: regex },
        { customerName: regex },
        { phone: regex },
        { city: regex },
        { "items.name": regex },
      ];
    }

    return orderRepository.findAll(query, options.limit);
  }

  async getOrderById(id: string): Promise<Order | null> {
    return orderRepository.findById(id);
  }

  async createOrder(input: CreateOrderInput): Promise<Order> {
    const finalOrderId =
      input.orderId || `CK-${Math.floor(10000 + Math.random() * 90000)}`;

    const deliveryFee = typeof input.deliveryFee === "number" ? input.deliveryFee : 180;
    const calcSubtotal =
      typeof input.subtotal === "number"
        ? input.subtotal
        : input.items.reduce(
            (sum, item) => sum + item.price * (item.quantity || 1),
            0
          );
    const finalTotal =
      typeof input.total === "number" ? input.total : calcSubtotal + deliveryFee;

    return orderRepository.create({
      ...input,
      orderId: finalOrderId,
      subtotal: calcSubtotal,
      deliveryFee,
      total: finalTotal,
      paymentMethod: input.paymentMethod || "Cash on Delivery (COD)",
      notes: input.notes || "",
    });
  }

  async updateOrder(
    id: string,
    updates: {
      status?: string;
      courierTrackingNumber?: string;
      notes?: string;
    }
  ): Promise<Order | null> {
    const allowed: Record<string, any> = {};
    if (updates.status) allowed.status = updates.status;
    if (typeof updates.courierTrackingNumber === "string") {
      allowed.courierTrackingNumber = updates.courierTrackingNumber.trim();
    }
    if (typeof updates.notes === "string") {
      allowed.notes = updates.notes.trim();
    }

    return orderRepository.update(id, allowed);
  }

  async deleteOrder(id: string): Promise<boolean> {
    return orderRepository.delete(id);
  }

  async count(query: Record<string, any> = {}): Promise<number> {
    return orderRepository.count(query);
  }
}

export const orderService = new OrderService();
