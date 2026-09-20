import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import ProductGrid from "@/components/shop/ProductGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Cufflinks — CuffKings",
  description:
    "Browse our complete collection across Classical, Signature, and Premium tiers. Polished metal, deep enamel, and precise engraving.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="bg-porcelain min-h-screen pt-20">
      {/* Header */}
      <div className="bg-obsidian text-porcelain py-16 lg:py-24 border-b border-champagne-brass/20">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-h1 font-display leading-[1.05]">
              Every detail counts.
            </h1>
            <p className="text-body text-porcelain/80 leading-relaxed max-w-2xl">
              Browse our complete collection of cufflinks. Polished metal, deep
              enamel, and precise engraving.
            </p>
          </div>
        </div>
      </div>

      {/* Products with Suspense for useSearchParams */}
      <Suspense
        fallback={
          <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12 py-20 text-sm text-warm-charcoal/60">
            Loading...
          </div>
        }
      >
        <ProductGrid products={products} />
      </Suspense>
    </div>
  );
}
