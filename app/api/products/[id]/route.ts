import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { productService } from "@/lib/server/services/product.service";
import { getAdminSession } from "@/lib/server/auth";
import { productUpdateSchema } from "@/lib/validations/product.schema";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await productService.getProductById(id);
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ product });
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
    const isAdmin = await getAdminSession(req);
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await productService.getProductById(id);
    const body = await req.json();
    const parsed = productUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const result = await productService.updateProduct(id, parsed.data);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status || 400 });
    }

    // Trigger on-demand cache revalidation across public website and admin
    try {
      revalidatePath("/");
      revalidatePath("/shop");
      revalidatePath("/admin/products");
      revalidatePath("/admin");
      if (result.product?.slug) {
        revalidatePath(`/product/${result.product.slug}`);
      }
      if (existing?.slug && existing.slug !== result.product?.slug) {
        revalidatePath(`/product/${existing.slug}`);
      }
    } catch (revalErr) {
      console.warn("revalidatePath notice:", revalErr);
    }

    return NextResponse.json({ product: result.product });
  } catch (error) {
    console.error("API PUT /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await getAdminSession(_req);
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await productService.getProductById(id);
    const deleted = await productService.deleteProduct(id);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Invalidate cached storefront pages so deleted product is immediately removed
    try {
      revalidatePath("/");
      revalidatePath("/shop");
      revalidatePath("/admin/products");
      revalidatePath("/admin");
      if (existing?.slug) {
        revalidatePath(`/product/${existing.slug}`);
      }
    } catch (revalErr) {
      console.warn("revalidatePath notice:", revalErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API DELETE /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
