import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/server/db";
import OrderModel, { OrderStatus } from "@/models/Order";
import type { Order, CreateOrderInput } from "@/types/order";

function toPlainOrder(doc: any): Order {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    _id: obj._id ? obj._id.toString() : undefined,
    createdAt: obj.createdAt ? new Date(obj.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: obj.updatedAt ? new Date(obj.updatedAt).toISOString() : new Date().toISOString(),
  };
}

function getOrderQuery(idOrOrderId: string) {
  const isObjectId = mongoose.Types.ObjectId.isValid(idOrOrderId);
  return isObjectId ? { _id: idOrOrderId } : { orderId: idOrOrderId };
}

export class OrderRepository {
  async findAll(query: Record<string, any> = {}, limit?: number): Promise<Order[]> {
    await connectToDatabase();
    let q = OrderModel.find(query).sort({ createdAt: -1 });
    if (limit) q = q.limit(limit);
    const docs = await q.lean();
    return docs.map(toPlainOrder);
  }

  async findById(idOrOrderId: string): Promise<Order | null> {
    await connectToDatabase();
    const doc = await OrderModel.findOne(getOrderQuery(idOrOrderId)).lean();
    return doc ? toPlainOrder(doc) : null;
  }

  async create(data: CreateOrderInput): Promise<Order> {
    await connectToDatabase();
    const order = await OrderModel.create(data);
    return toPlainOrder(order);
  }

  async insertMany(orders: any[]): Promise<void> {
    await connectToDatabase();
    await OrderModel.insertMany(orders);
  }

  async update(idOrOrderId: string, updateData: Record<string, any>): Promise<Order | null> {
    await connectToDatabase();
    const doc = await OrderModel.findOneAndUpdate(
      getOrderQuery(idOrOrderId),
      { $set: updateData },
      { returnDocument: "after", runValidators: true }
    ).lean();
    return doc ? toPlainOrder(doc) : null;
  }

  async delete(idOrOrderId: string): Promise<boolean> {
    await connectToDatabase();
    const result = await OrderModel.findOneAndDelete(getOrderQuery(idOrOrderId));
    return !!result;
  }

  async count(query: Record<string, any> = {}): Promise<number> {
    await connectToDatabase();
    return OrderModel.countDocuments(query);
  }
}

export const orderRepository = new OrderRepository();
