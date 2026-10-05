import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/lib/db";
import OrderModel from "@/backend/models/Order";
import { getAdminSession } from "@/backend/lib/auth";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { orderId: id };

    const order = await OrderModel.findOne(query).lean();
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      order: {
        ...order,
        _id: (order as any)._id.toString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch order", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { orderId: id };

    const allowedUpdates: Record<string, any> = {};

    if (body.status) {
      const validStatuses = ["pending", "confirmed", "dispatched", "delivered", "cancelled"];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
      }
      allowedUpdates.status = body.status;
    }

    if (typeof body.courierTrackingNumber === "string") {
      allowedUpdates.courierTrackingNumber = body.courierTrackingNumber.trim();
    }

    if (typeof body.notes === "string") {
      allowedUpdates.notes = body.notes.trim();
    }

    const updated = await OrderModel.findOneAndUpdate(
      query,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Order updated successfully",
      order: {
        ...updated,
        _id: (updated as any)._id.toString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update order", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { orderId: id };

    const deleted = await OrderModel.findOneAndDelete(query).lean();
    if (!deleted) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Order removed from registry",
      orderId: (deleted as any).orderId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete order", details: error.message },
      { status: 500 }
    );
  }
}
