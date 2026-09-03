"use client";

import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="bg-obsidian min-h-screen pt-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="max-w-md mx-auto space-y-8">
            <div className="w-24 h-24 mx-auto border border-champagne-brass/30 flex items-center justify-center bg-deep-petrol/20">
              <svg
                className="w-12 h-12 text-champagne-brass/60"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-display mb-3 text-porcelain">Your cart is empty</h1>
              <p className="text-sm text-porcelain/60">
                Start adding cufflinks to see them here
              </p>
            </div>
            <Button href="/shop" variant="primary">
              Shop cufflinks
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian min-h-screen pt-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-champagne-brass/20">
          <h1 className="text-h2 font-display text-porcelain">Your cart</h1>
          <Link
            href="/shop"
            className="text-sm text-champagne-brass hover:text-porcelain transition-colors duration-200"
          >
            Continue shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-deep-petrol border border-champagne-brass/20">
              <div className="divide-y divide-champagne-brass/20">
                {items.map((item) => (
                  <div key={item.id} className="px-6">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
