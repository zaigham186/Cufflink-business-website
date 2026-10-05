import Link from "next/link";
import { connectToDatabase } from "@/backend/lib/db";
import ProductModel from "@/backend/models/Product";
import ProductTable from "@/backend/admin-components/ProductTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await connectToDatabase();
  const docs = await ProductModel.find({}).sort({ createdAt: -1 }).lean();

  const formattedProducts = docs.map((doc: any) => ({
    ...doc,
    _id: doc._id.toString(),
    id: doc._id.toString(),
    stockCount: typeof doc.stockCount === "number" ? doc.stockCount : 10,
    stockStatus: doc.stock || "in-stock",
    stock: typeof doc.stockCount === "number" ? doc.stockCount : 10,
  }));

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="pb-6 border-b border-champagne-brass/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display text-porcelain tracking-tight">
            Cufflink Catalog
          </h1>
          <p className="text-xs text-porcelain/60 uppercase tracking-widest font-sans mt-1">
            Total active pieces: {formattedProducts.length}
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-champagne-brass text-obsidian text-xs font-medium uppercase tracking-widest hover:bg-champagne-brass/90 transition-all duration-200 shadow-lg"
        >
          + Add New Product
        </Link>
      </div>

      <ProductTable initialProducts={formattedProducts as any} />
    </div>
  );
}
