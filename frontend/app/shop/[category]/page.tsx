import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductsByCategory, categories } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return {
      title: "Collection not found — CuffKings",
    };
  }

  return {
    title: `${category.name} Collection — CuffKings`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(categorySlug);

  return (
    <div className="bg-porcelain text-warm-charcoal min-h-screen pt-24 pb-24">
      <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-12 space-y-4 pb-8 border-b border-warm-charcoal/15">
          <nav
            className="flex items-center space-x-2 text-xs text-warm-charcoal/60"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-warm-charcoal transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-warm-charcoal transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-warm-charcoal">{category.name} Collection</span>
          </nav>

          <h1 className="text-h2 font-display text-warm-charcoal leading-tight">
            {category.name} Collection
          </h1>
          <p className="text-body text-warm-charcoal/80 max-w-2xl">
            {category.description}
          </p>
          <p className="text-xs text-warm-charcoal/60">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {products.map((product, index) => {
              const span =
                index === 0
                  ? "lg:col-span-7"
                  : index === 1
                  ? "lg:col-span-5"
                  : "lg:col-span-4";
              return (
                <div key={product.id} className={span}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border border-warm-charcoal/10 bg-porcelain space-y-4">
            <p className="text-base text-warm-charcoal/70">
              No cufflinks in this collection yet.
            </p>
            <Link
              href="/shop"
              className="inline-block text-xs font-medium text-warm-charcoal underline underline-offset-4 hover:text-champagne-brass transition-colors"
            >
              Browse all pieces →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
