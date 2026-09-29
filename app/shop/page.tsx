import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import ProductGrid from "@/components/shop/ProductGrid";
import ShopHeader from "@/components/shop/ShopHeader";
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
      {/* Animated Header */}
      <ShopHeader />

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
