import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/lib/server/services/product.service";
import { getAdminSession } from "@/lib/server/auth";
import { productSchema } from "@/lib/validations/product.schema";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    const products = await productService.queryProducts({
      category,
      featured,
      search,
      sort,
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("API GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await getAdminSession(req);
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const result = await productService.createProduct(parsed.data);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status || 400 });
    }

    return NextResponse.json({ product: result.product }, { status: 201 });
  } catch (error) {
    console.error("API POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
