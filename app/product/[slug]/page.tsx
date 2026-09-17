import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getProductBySlug,
  getAllProducts,
  getProductsByCategory,
} from "@/lib/products";
import ImageGallery from "@/components/product/ImageGallery";
import AddToCartButton from "@/components/product/AddToCartButton";
import ProductCard from "@/components/shop/ProductCard";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found — CuffKings",
    };
  }

  return {
    title: `${product.name} — CuffKings`,
    description: product.description,
    openGraph: {
      title: `${product.name} — CuffKings`,
      description: product.description,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products from same category, excluding current product
  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-porcelain text-warm-charcoal min-h-screen pt-24 pb-24">
      <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Breadcrumb - subdued sentence case */}
        <nav
          className="flex items-center space-x-2 text-xs text-warm-charcoal/60 mb-10"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-warm-charcoal transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/shop"
            className="hover:text-warm-charcoal transition-colors"
          >
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.categorySlug}`}
            className="hover:text-warm-charcoal transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-warm-charcoal truncate">{product.name}</span>
        </nav>

        {/* 60/40 Split: Gallery & Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Gallery (~60% = 7 cols on desktop) */}
          <div className="lg:col-span-7">
            <ImageGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Info Panel (~40% = 5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title & Price */}
            <div className="space-y-3 pb-6 border-b border-warm-charcoal/15">
              <h1 className="text-3xl sm:text-4xl font-display leading-tight text-warm-charcoal">
                {product.name}
              </h1>

              <div className="flex items-baseline space-x-3">
                <span className="text-2xl font-medium text-warm-charcoal">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.compareAtPrice &&
                  product.compareAtPrice > product.price && (
                    <span className="text-sm text-warm-charcoal/50 line-through">
                      Rs. {product.compareAtPrice.toLocaleString()}
                    </span>
                  )}
              </div>

              {/* Availability */}
              <div className="pt-1">
                <span
                  className={`text-xs font-medium ${
                    isOutOfStock
                      ? "text-deep-wine"
                      : isLowStock
                      ? "text-warm-charcoal"
                      : "text-warm-charcoal/70"
                  }`}
                >
                  {isOutOfStock
                    ? "Out of stock"
                    : isLowStock
                    ? `Only ${product.stock} pairs remaining`
                    : "In stock"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="text-sm text-warm-charcoal/80 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Specs: Material, Finish, Color */}
            <div className="py-4 border-t border-b border-warm-charcoal/15 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-warm-charcoal/60">Material</span>
                <span className="text-warm-charcoal font-medium">
                  {product.material}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-warm-charcoal/60">Finish</span>
                <span className="text-warm-charcoal font-medium">
                  {product.finish}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-warm-charcoal/60">Color</span>
                <span className="text-warm-charcoal font-medium">
                  {product.color}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-warm-charcoal/60">Closure</span>
                <span className="text-warm-charcoal font-medium">
                  Swivel toggle closure
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-warm-charcoal/60">Origin</span>
                <span className="text-warm-charcoal font-medium">
                  Peshawar, Pakistan
                </span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <AddToCartButton product={product} />
          </div>
        </div>

        {/* Related Products Section - Below */}
        {relatedProducts.length > 0 && (
          <div className="mt-28 pt-16 border-t border-warm-charcoal/15">
            <div className="mb-10 flex justify-between items-baseline">
              <h2 className="text-2xl font-display text-warm-charcoal">
                Related pieces
              </h2>
              <Link
                href={`/shop?category=${product.categorySlug}`}
                className="text-xs text-warm-charcoal/70 hover:text-warm-charcoal transition-colors"
              >
                More in {product.category} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
