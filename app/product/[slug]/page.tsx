import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import ImageGallery from "@/components/product/ImageGallery";
import AddToCartButton from "@/components/product/AddToCartButton";
import Link from "next/link";
import type { Metadata } from "next";

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
      title: "Product Not Found — CuffKings",
    };
  }

  return {
    title: `${product.name} — CuffKings`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.hasPhotography ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="bg-khaddar-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm mb-8 opacity-70">
          <Link
            href="/"
            className="hover:text-ink-green transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/shop"
            className="hover:text-ink-green transition-colors"
          >
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop/${product.categorySlug}`}
            className="hover:text-ink-green transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="opacity-100 font-medium">{product.name}</span>
        </nav>

        {/* Product content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Images */}
          <ImageGallery
            images={product.images}
            productName={product.name}
            hasPhotography={product.hasPhotography}
          />

          {/* Right - Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-antique-brass mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl sm:text-4xl font-fraunces">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-baseline space-x-3">
                <span className="text-2xl font-medium">
                  Rs. {product.price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg opacity-50 line-through">
                      Rs. {product.compareAtPrice?.toLocaleString()}
                    </span>
                    <span className="text-sm text-maroon font-medium">
                      Save Rs.{" "}
                      {(
                        (product.compareAtPrice || 0) - product.price
                      ).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              <p className="text-base leading-relaxed opacity-80">
                {product.description}
              </p>
            </div>

            {/* Product details */}
            <div className="border-t border-b border-antique-brass/30 py-6 space-y-3">
              <DetailRow label="Material" value={product.material} />
              <DetailRow label="Finish" value={product.finish} />
              <DetailRow label="Color" value={product.color} />
              <DetailRow label="Shape" value={product.shape} />
              <DetailRow label="Pattern" value={product.pattern} />
              {product.isSet && (
                <DetailRow
                  label="Set includes"
                  value={`${product.pairsCount} pair${
                    product.pairsCount > 1 ? "s" : ""
                  }`}
                />
              )}
              <DetailRow label="SKU" value={product.sku} />
            </div>

            {/* Add to cart */}
            <AddToCartButton product={product} />

            {/* Additional info */}
            <div className="pt-6 space-y-4 text-sm opacity-70">
              <p>
                • Secure toggle closure
                <br />
                • Filed edges and polished finish
                <br />
                • Checked before packaging
                <br />• Ships from Peshawar, Pakistan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="opacity-70">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
