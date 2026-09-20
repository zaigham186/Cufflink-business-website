"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  className?: string;
  showCollectionBadge?: boolean;
}

export default function ProductCard({
  product,
  className = "",
  showCollectionBadge = true,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hasMultipleImages = product.images && product.images.length > 1;
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  // Collection badge styling
  const collectionColors = {
    Classical: "border-champagne-brass/30 text-champagne-brass/90 bg-obsidian/80",
    Signature: "border-champagne-brass/50 text-champagne-brass bg-obsidian/80",
    Premium: "border-champagne-brass text-champagne-brass bg-obsidian/90 font-medium",
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      data-cursor="view"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group block bg-obsidian border border-champagne-brass/20 hover:border-champagne-brass/70 transition-all duration-300 overflow-hidden transform hover:-translate-y-1.5 shadow-lg hover:shadow-2xl hover:shadow-champagne-brass/5 ${className}`}
    >
      {/* Image Container with secondary image hover flip */}
      <div className="aspect-square relative overflow-hidden bg-obsidian select-none">
        {/* Primary Image */}
        <Image
          src={product.images[0] || "/products/classic1.jpeg"}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ease-out ${
            hasMultipleImages && isHovered
              ? "opacity-0 scale-105"
              : "opacity-100 group-hover:scale-105"
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Secondary Angle Image (if exists) */}
        {hasMultipleImages && product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Badges Top-Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {showCollectionBadge && (
            <span
              className={`text-[10px] tracking-widest uppercase px-2 py-0.5 border ${
                collectionColors[product.category] || "border-champagne-brass/30 text-champagne-brass"
              }`}
            >
              {product.category}
            </span>
          )}
          {hasDiscount && <Badge variant="sale">Sale</Badge>}
          {isLowStock && <Badge variant="limited">Low stock</Badge>}
        </div>

        {/* Multiple angles indicator tag */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 right-3 text-[9px] tracking-wider text-porcelain/60 bg-obsidian/80 px-1.5 py-0.5 border border-champagne-brass/20">
            2 ANGLES
          </div>
        )}
      </div>

      {/* Product Details Block */}
      <div className="p-5 lg:p-6 space-y-3 bg-obsidian text-porcelain border-t border-champagne-brass/10">
        <div>
          <h3 className="text-base font-display text-porcelain group-hover:text-champagne-brass transition-colors duration-200 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-porcelain/60 mt-1 line-clamp-1">
            {product.material} • {product.finish}
          </p>
        </div>

        {/* Price & Stock status */}
        <div className="flex items-baseline justify-between pt-1 border-t border-white/5">
          <div className="flex items-baseline space-x-2">
            <span className="text-sm sm:text-base font-medium text-champagne-brass">
              Rs. {product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xs text-porcelain/40 line-through">
                Rs. {product.compareAtPrice?.toLocaleString()}
              </span>
            )}
          </div>

          <span
            className={`text-[11px] ${
              isOutOfStock
                ? "text-deep-wine font-medium"
                : isLowStock
                ? "text-champagne-brass"
                : "text-porcelain/50"
            }`}
          >
            {isOutOfStock
              ? "Sold out"
              : isLowStock
              ? `${product.stock} remaining`
              : "In stock"}
          </span>
        </div>

        {/* Hover action indicator */}
        <div className="pt-2 flex items-center justify-between text-xs text-champagne-brass/80 group-hover:text-champagne-brass transition-colors">
          <span className="text-[11px] tracking-wider uppercase font-medium">
            View piece
          </span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </div>

        {/* Animated Gold Rule on hover */}
        <div className="h-0.5 w-0 bg-champagne-brass group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </Link>
  );
}
