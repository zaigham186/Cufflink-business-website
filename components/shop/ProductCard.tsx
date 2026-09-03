import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import ProductPlaceholder from "@/components/ui/ProductPlaceholder";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-obsidian border border-champagne-brass/20 hover:border-champagne-brass/60 transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-square relative overflow-hidden bg-obsidian">
        {product.hasPhotography ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <ProductPlaceholder />
        )}

        {/* Badges */}
        {(hasDiscount || product.stock < 5) && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hasDiscount && <Badge variant="sale">Sale</Badge>}
            {product.stock < 5 && product.stock > 0 && (
              <Badge variant="limited">Limited stock</Badge>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 lg:p-6 space-y-3 bg-obsidian">
        <div>
          <h3 className="text-base lg:text-lg font-display text-porcelain group-hover:text-champagne-brass transition-colors duration-200 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-porcelain/60 mt-2 line-clamp-1">
            {product.material}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-medium text-champagne-brass">
            Rs. {product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-sm text-porcelain/40 line-through">
              Rs. {product.compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Hover line */}
        <div className="h-px w-0 bg-champagne-brass group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </Link>
  );
}
