import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/backend/lib/db";
import ProductModel from "@/backend/models/Product";
import { getAdminSession } from "@/backend/lib/auth";
import { productUpdateSchema } from "@/backend/lib/validators";

function getQuery(id: string) {
  const isObjectId = mongoose.Types.ObjectId.isValid(id);
  return isObjectId ? { _id: id } : { slug: id };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const product = await ProductModel.findOne(getQuery(id)).lean();
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      product: {
        ...product,
        _id: (product as any)._id?.toString(),
        id: (product as any)._id?.toString(),
      },
    });
  } catch (error) {
    console.error("API GET /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await connectToDatabase();
    const body = await req.json();
    const parsed = productUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const updateData: any = { ...parsed.data };
    if (typeof updateData.stockCount === "number" && !updateData.stock) {
      updateData.stock =
        updateData.stockCount === 0
          ? "out-of-stock"
          : updateData.stockCount <= 5
          ? "low-stock"
          : "in-stock";
    }

    const product = await ProductModel.findOneAndUpdate(getQuery(id), updateData, { new: true });
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ product });
  } catch (error) {
    console.error("API PUT /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await connectToDatabase();
    const product = await ProductModel.findOneAndDelete(getQuery(id));
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API DELETE /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
