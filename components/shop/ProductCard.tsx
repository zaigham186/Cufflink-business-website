import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group block bg-obsidian border border-champagne-brass/20 hover:border-champagne-brass/60 transition-all duration-300 overflow-hidden transform hover:-translate-y-1 ${className}`}
    >
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden bg-obsidian">
        <Image
          src={product.images[0] || "/products/ivory-pave-gold-1.jpg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges - Deep Wine for Sale, Obsidian for Limited */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {hasDiscount && <Badge variant="sale">Sale</Badge>}
          {isLowStock && <Badge variant="limited">Limited</Badge>}
        </div>
      </div>

      {/* Info Block */}
      <div className="p-5 lg:p-6 space-y-3 bg-obsidian text-porcelain">
        <div>
          <h3 className="text-base lg:text-lg font-display text-porcelain group-hover:text-champagne-brass transition-colors duration-200 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-porcelain/60 mt-1 line-clamp-1">
            {product.material}
          </p>
        </div>

        {/* Price & Availability */}
        <div className="flex items-baseline justify-between pt-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-base lg:text-lg font-medium text-champagne-brass">
              Rs. {product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xs text-porcelain/40 line-through">
                Rs. {product.compareAtPrice?.toLocaleString()}
              </span>
            )}
          </div>

          <span
            className={`text-xs ${
              isOutOfStock
                ? "text-deep-wine font-medium"
                : isLowStock
                ? "text-champagne-brass"
                : "text-porcelain/50"
            }`}
          >
            {isOutOfStock
              ? "Out of stock"
              : isLowStock
              ? `${product.stock} left`
              : "In stock"}
          </span>
        </div>

        {/* Brass Line Reveal on Hover */}
        <div className="h-px w-0 bg-champagne-brass group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </Link>
  );
}
