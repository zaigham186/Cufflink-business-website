"use client";

import Image from "next/image";
import Link from "next/link";
import { CartItem as CartItemType } from "@/store/cartStore";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 sm:gap-6 py-6">
      {/* Image */}
      <Link
        href={`/product/${item.slug}`}
        className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 border border-champagne-brass/20 overflow-hidden hover:border-champagne-brass/60 transition-all duration-200"
      >
        <Image
          src={item.image}
          alt={item.name}
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <Link
            href={`/product/${item.slug}`}
            className="font-display text-lg text-porcelain hover:text-champagne-brass transition-colors duration-200 line-clamp-1"
          >
            {item.name}
          </Link>
          <p className="text-sm text-porcelain/60 mt-2 line-clamp-1">{item.material}</p>
        </div>

        <div className="flex items-end justify-between gap-4 mt-4">
          {/* Quantity controls */}
          <div className="flex items-center border border-champagne-brass/30 bg-obsidian">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-1 text-porcelain hover:bg-champagne-brass hover:text-obsidian transition-all duration-200 text-sm"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-4 py-1 border-x border-champagne-brass/30 text-sm min-w-[3rem] text-center text-porcelain">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 text-porcelain hover:bg-champagne-brass hover:text-obsidian transition-all duration-200 text-sm"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-medium text-champagne-brass">
              Rs. {(item.price * item.quantity).toLocaleString()}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-porcelain/50">
                Rs. {item.price.toLocaleString()} each
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={() => removeItem(item.id)}
        className="flex-shrink-0 p-2 text-porcelain/60 hover:text-deep-wine transition-colors duration-200 self-start"
        aria-label="Remove item"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
