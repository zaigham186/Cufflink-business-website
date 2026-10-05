"use client";

import { useCartStore } from "@/frontend/store/cartStore";
import { useEffect, useState } from "react";
import CheckoutForm from "@/frontend/components/checkout/CheckoutForm";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Graceful loading skeleton while client Zustand store rehydrates
  if (!mounted) {
    return (
      <div className="bg-porcelain text-warm-charcoal min-h-screen pt-24 pb-24">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12 animate-pulse">
          <div className="mb-10 pb-6 border-b border-warm-charcoal/15 flex justify-between items-baseline">
            <div className="space-y-2">
              <div className="h-8 w-64 bg-warm-charcoal/10 rounded" />
              <div className="h-4 w-96 bg-warm-charcoal/5 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 h-96 bg-warm-charcoal/5 rounded" />
            <div className="lg:col-span-5 h-80 bg-obsidian/20 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty after hydration, show a clear and elegant empty state
  if (items.length === 0) {
    return (
      <div className="bg-porcelain text-warm-charcoal min-h-screen pt-24 pb-24 flex items-center">
        <div className="max-w-md mx-auto px-6 text-center space-y-6">
          <div className="w-20 h-20 mx-auto border border-champagne-brass/40 flex items-center justify-center bg-obsidian text-champagne-brass">
            <svg
              className="w-10 h-10"
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
          <div className="space-y-2">
            <h1 className="text-3xl font-display text-warm-charcoal">Your cart is empty</h1>
            <p className="text-sm text-warm-charcoal/70 leading-relaxed">
              You don&apos;t have any cufflinks in your cart yet. Please select pieces from our collection before checking out.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 bg-champagne-brass text-obsidian font-medium text-sm hover:bg-champagne-brass/90 transition-colors"
            >
              Explore the collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-porcelain text-warm-charcoal min-h-screen pt-24 pb-24">
      <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-10 pb-6 border-b border-warm-charcoal/15 flex justify-between items-baseline">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display text-warm-charcoal">
              Order confirmation
            </h1>
            <p className="text-xs sm:text-sm text-warm-charcoal/60 mt-1">
              Complete your delivery details to prepare your WhatsApp order.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <Link
              href="/cart"
              className="text-warm-charcoal/70 hover:text-warm-charcoal transition-colors underline"
            >
              Edit cart
            </Link>
            <span className="text-warm-charcoal/30">•</span>
            <Link
              href="/shop"
              className="text-warm-charcoal/70 hover:text-warm-charcoal transition-colors"
            >
              ← Back to shop
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left - Checkout Form (7 cols) */}
          <div className="lg:col-span-7">
            <CheckoutForm />
          </div>

          {/* Right - Order summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-obsidian text-porcelain border border-champagne-brass/25 p-6 sm:p-8 space-y-6 sticky top-28">
              <div className="flex justify-between items-baseline border-b border-champagne-brass/20 pb-4">
                <h2 className="font-display text-xl text-porcelain">
                  Order summary
                </h2>
                <span className="text-xs text-porcelain/60">
                  {items.reduce((s, i) => s + i.quantity, 0)} {items.reduce((s, i) => s + i.quantity, 0) === 1 ? "pair" : "pairs"}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 divide-y divide-champagne-brass/15">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-4">
                    <div className="relative w-16 h-16 border border-champagne-brass/20 flex-shrink-0 bg-obsidian overflow-hidden">
                      <Image
                        src={item.image || "/products/classic1.jpeg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-porcelain line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-porcelain/60 mt-0.5">
                        Qty: {item.quantity} × Rs. {item.price.toLocaleString()}
                      </p>
                      <p className="text-sm font-medium text-champagne-brass mt-1">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal & Delivery details */}
              <div className="border-t border-champagne-brass/20 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-porcelain/80">
                  <span>Subtotal</span>
                  <span className="font-medium text-porcelain">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-porcelain/80">
                  <span>Delivery</span>
                  <span className="text-xs text-champagne-brass font-medium">
                    Standard Delivery (Nationwide)
                  </span>
                </div>
                <div className="border-t border-champagne-brass/20 pt-3 flex justify-between items-baseline">
                  <span className="font-medium text-porcelain">Total</span>
                  <span className="text-xl font-medium text-champagne-brass">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-deep-petrol/60 border border-champagne-brass/20 text-xs text-porcelain/80 leading-relaxed space-y-1.5">
                <p className="font-medium text-porcelain">Atelier Handcrafted Fulfillment</p>
                <p>
                  Orders are dispatched directly from our Peshawar workshop. Payment is handled safely upon delivery or via bank transfer on WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
