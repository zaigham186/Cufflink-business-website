import { notFound } from "next/navigation";
import Link from "next/link";
import { productService } from "@/lib/server/services/product.service";
import ProductForm from "@/components/admin/ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const productDoc = await productService.getProductById(id);

  if (!productDoc) {
    return (
      <div className="p-12 text-center border border-white/10 space-y-4">
        <h2 className="text-xl font-display text-porcelain">Product Not Found</h2>
        <p className="text-xs text-porcelain/60">
          The requested product ID does not exist in the database.
        </p>
        <Link
          href="/admin/products"
          className="inline-block px-4 py-2 bg-champagne-brass text-obsidian text-xs uppercase tracking-wider"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-champagne-brass/20 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-porcelain tracking-tight">
            Edit: {productDoc.name}
          </h1>
          <p className="text-xs text-porcelain/60 uppercase tracking-widest font-sans mt-1">
            SKU: {productDoc.sku} | Collection: {productDoc.category}
          </p>
        </div>

        <Link
          href={`/product/${productDoc.slug}`}
          target="_blank"
          className="text-xs text-champagne-brass hover:underline uppercase tracking-wider"
        >
          View on Site ↗
        </Link>
      </div>

      <ProductForm product={productDoc as any} />
    </div>
  );
}
