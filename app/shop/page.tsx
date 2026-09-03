import { getAllProducts } from "@/lib/products";
import ProductGrid from "@/components/shop/ProductGrid";

export const metadata = {
  title: "Shop All Cufflinks — CuffKings",
  description:
    "Browse our complete collection of premium men's cufflinks. Gold-tone, silver, gunmetal, enamel and crystal detailing.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="bg-porcelain min-h-screen pt-20">
      {/* Header */}
      <div className="bg-obsidian text-porcelain py-16 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-h1 font-display mb-6">
              Every detail counts.
            </h1>
            <p className="text-xl opacity-80 leading-relaxed">
              Browse our complete collection of cufflinks. Polished metal, deep enamel, precise engraving.
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <ProductGrid products={products} />
    </div>
  );
}
