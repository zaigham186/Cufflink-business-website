import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { productService } from "@/lib/server/services/product.service";
import { getAdminSession } from "@/lib/server/auth";
import { productSchema } from "@/lib/validations/product.schema";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const isAdmin = await getAdminSession(req);

    const products = await productService.queryProducts({
      category,
      featured,
      search,
      sort,
      includeUnpublished: isAdmin,
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

    // Trigger Next.js on-demand route revalidation
    try {
      revalidatePath("/");
      revalidatePath("/shop");
      revalidatePath("/admin/products");
      revalidatePath("/admin");
      if (result.product?.slug) {
        revalidatePath(`/product/${result.product.slug}`);
      }
    } catch (revalError) {
      console.warn("revalidatePath notice:", revalError);
    }

    return NextResponse.json({ product: result.product }, { status: 201 });
  } catch (error) {
    console.error("API POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
