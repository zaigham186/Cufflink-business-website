import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/lib/db";
import ProductModel from "@/backend/models/Product";
import { getAdminSession } from "@/backend/lib/auth";
import { productSchema } from "@/backend/lib/validators";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "createdAt";

    const query: Record<string, any> = {};
    if (category && category !== "all") query.categorySlug = category.toLowerCase().trim();
    if (featured === "true") query.featured = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { material: { $regex: search, $options: "i" } },
        { color: { $regex: search, $options: "i" } },
        { finish: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sortMap: Record<string, Record<string, 1 | -1>> = {
      newest: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      name: { name: 1 },
    };

    const sortOption = sortMap[sort] || { createdAt: -1 };
    const docs = await ProductModel.find(query)
      .sort(sortOption as any)
      .lean();

    return NextResponse.json({
      products: docs.map((d: any) => ({
        ...d,
        _id: d._id?.toString(),
        id: d._id?.toString(),
      })),
    });
  } catch (error) {
    console.error("API GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const body = await req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const existing = await ProductModel.findOne({
      $or: [{ slug: parsed.data.slug }, { sku: parsed.data.sku }],
    });
    if (existing) {
      return NextResponse.json({ error: "Slug or SKU already exists" }, { status: 409 });
    }

    // Auto calculate stock status if needed
    const stockCount = parsed.data.stockCount ?? 0;
    const stockStatus = parsed.data.stock || (stockCount === 0 ? "out-of-stock" : stockCount <= 5 ? "low-stock" : "in-stock");

    const product = await ProductModel.create({
      ...parsed.data,
      stock: stockStatus,
      stockCount: stockCount,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("API POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
