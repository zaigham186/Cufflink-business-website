import { Suspense } from "react";
import { productService } from "@/lib/server/services/product.service";
import ProductGrid from "@/components/storefront/shop/ProductGrid";
import ShopHeader from "@/components/storefront/shop/ShopHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Cufflinks — CuffKings",
  description:
    "Browse our complete collection across Classical, Signature, and Premium tiers. Polished metal, deep enamel, and precise engraving.",
};

export const revalidate = 60;

export default async function ShopPage() {
  const products = await productService.getAllProducts();

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
