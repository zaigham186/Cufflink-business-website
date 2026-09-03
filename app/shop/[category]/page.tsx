import { notFound } from "next/navigation";
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
      title: "Category Not Found — CuffKings",
    };
  }

  return {
    title: `${category.name} — CuffKings`,
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
    <div className="bg-khaddar-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 space-y-3">
          <nav className="flex items-center space-x-2 text-sm opacity-70">
            <a href="/" className="hover:text-ink-green transition-colors">
              Home
            </a>
            <span>/</span>
            <a
              href="/shop"
              className="hover:text-ink-green transition-colors"
            >
              Shop
            </a>
            <span>/</span>
            <span className="opacity-100 font-medium">{category.name}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-fraunces">
            {category.name}
          </h1>
          <p className="text-base opacity-70">{category.description}</p>
          <p className="text-sm opacity-60">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg opacity-70 mb-4">
              No products in this category yet
            </p>
            <a
              href="/shop"
              className="text-sm text-antique-brass hover:text-ink-green transition-colors"
            >
              Browse all products
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
