"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

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
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);

  const hasMultipleImages = product.images && product.images.length > 1;
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0] || "/products/classic1.jpeg",
      material: product.material || "Solid Brass",
    });

    setAdded(true);
    openDrawer();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between bg-[#111215] border border-champagne-brass/25 hover:border-champagne-brass transition-all duration-300 rounded-[2px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-champagne-brass/5 ${className}`}
    >
      {/* 1. Clickable Image Container - Refined Square Aspect */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative aspect-square w-full overflow-hidden bg-[#0c0d10] select-none cursor-pointer"
        aria-label={`View details of ${product.name}`}
      >
        {/* Primary Image */}
        <Image
          src={product.images[0] || "/products/classic1.jpeg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-all duration-500 ease-out ${
            hasMultipleImages && isHovered
              ? "opacity-0 scale-105"
              : "opacity-100 group-hover:scale-105"
          }`}
        />

        {/* Secondary Image hover flip */}
        {hasMultipleImages && product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-500 ease-out ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {showCollectionBadge && (
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold px-2 py-0.5 bg-obsidian/90 backdrop-blur-sm border border-champagne-brass/40 text-champagne-brass rounded-[1px]">
              {product.category}
            </span>
          )}
          {hasDiscount && (
            <span className="text-[9px] tracking-wider uppercase font-medium px-1.5 py-0.5 bg-deep-wine text-porcelain rounded-[1px]">
              Sale
            </span>
          )}
          {isLowStock && (
            <span className="text-[9px] tracking-wider uppercase font-medium px-1.5 py-0.5 bg-champagne-brass/20 text-champagne-brass border border-champagne-brass/40 rounded-[1px]">
              Low Stock
            </span>
          )}
        </div>

        {/* 2 Angles Tag */}
        {hasMultipleImages && (
          <div className="absolute bottom-2.5 right-2.5 text-[8.5px] tracking-wider uppercase text-porcelain/70 bg-obsidian/85 px-1.5 py-0.5 border border-champagne-brass/20 rounded-[1px] pointer-events-none">
            2 Views
          </div>
        )}
      </Link>

      {/* 2. Compact, Professional Product Details */}
      <div className="p-3.5 sm:p-4 bg-[#111215] border-t border-champagne-brass/15 flex flex-col justify-between flex-1 gap-2.5">
        <div>
          {/* Title */}
          <Link
            href={`/product/${product.slug}`}
            className="block text-xs sm:text-sm font-display font-medium text-porcelain group-hover:text-champagne-brass transition-colors line-clamp-1 leading-snug"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Material */}
          <p className="text-[10.5px] sm:text-[11px] text-porcelain/60 mt-0.5 line-clamp-1 font-sans">
            {product.material}
          </p>
        </div>

        {/* Price & Status Row */}
        <div className="flex items-baseline justify-between pt-1 border-t border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-semibold text-champagne-brass font-mono">
              Rs. {product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-[10px] sm:text-[11px] text-porcelain/40 line-through font-mono">
                Rs. {product.compareAtPrice?.toLocaleString()}
              </span>
            )}
          </div>

          <span className={`text-[10px] font-sans ${isOutOfStock ? "text-deep-wine font-medium" : "text-emerald-400/90"}`}>
            {isOutOfStock ? "Sold out" : "In stock"}
          </span>
        </div>

        {/* Dedicated Instant Add to Cart Action Button - Always visible on all devices */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            aria-label={isOutOfStock ? "Sold out" : `Add ${product.name} to cart`}
            className={`w-full py-2 sm:py-2.5 px-3 text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 rounded-[2px] shadow-sm select-none ${
              isOutOfStock
                ? "bg-white/5 text-porcelain/30 border border-white/10 cursor-not-allowed"
                : added
                ? "bg-emerald-600 text-white border border-emerald-500 shadow-emerald-900/30"
                : "bg-champagne-brass text-obsidian hover:bg-champagne-brass-light border border-champagne-brass active:scale-[0.99] cursor-pointer"
            }`}
          >
            {isOutOfStock ? (
              <span>Sold Out</span>
            ) : added ? (
              <span className="flex items-center gap-1.5 font-bold">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Added to Cart ✓
              </span>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

        {/* Gold Accent Line that expands on card hover */}
        <div className="h-0.5 w-0 bg-champagne-brass group-hover:w-full transition-all duration-300 ease-out" />
      </div>
    </div>
  );
}
