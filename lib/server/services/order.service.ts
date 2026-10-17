import { orderRepository } from "@/lib/server/repositories/order.repository";
import type { Order, CreateOrderInput, OrderStatus } from "@/types/order";

export class OrderService {
  async getOrders(options: {
    status?: string;
    search?: string;
    limit?: number;
  } = {}): Promise<Order[]> {
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
      courierProvider?: string;
      dispatchedAt?: string | Date;
      deliveredAt?: string | Date;
      notes?: string;
    }
  ): Promise<Order | null> {
    const allowed: Record<string, any> = {};

    if (updates.status) {
      allowed.status = updates.status;
      if (updates.status === "dispatched" && !updates.dispatchedAt) {
        allowed.dispatchedAt = new Date();
      }
      if (updates.status === "delivered" && !updates.deliveredAt) {
        allowed.deliveredAt = new Date();
      }
    }

    if (typeof updates.courierTrackingNumber === "string") {
      allowed.courierTrackingNumber = updates.courierTrackingNumber.trim();
    }
    if (typeof updates.courierProvider === "string") {
      allowed.courierProvider = updates.courierProvider.trim();
    }
    if (updates.dispatchedAt) {
      allowed.dispatchedAt = new Date(updates.dispatchedAt);
    }
    if (updates.deliveredAt) {
      allowed.deliveredAt = new Date(updates.deliveredAt);
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
