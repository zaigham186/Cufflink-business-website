"use client";

import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/shop");
    }
  }, [items, router]);

  if (items.length === 0) {
    return null;
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
          <Link
            href="/shop"
            className="text-xs text-warm-charcoal/70 hover:text-warm-charcoal transition-colors"
          >
            ← Back to shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left - Checkout Form (7 cols) */}
          <div className="lg:col-span-7">
            <CheckoutForm />
          </div>

          {/* Right - Order summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-obsidian text-porcelain border border-champagne-brass/25 p-6 sm:p-8 space-y-6 sticky top-28">
              <h2 className="font-display text-xl text-porcelain">
                Order summary
              </h2>

              {/* Items */}
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 divide-y divide-champagne-brass/15">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-4">
                    <div className="relative w-16 h-16 border border-champagne-brass/20 flex-shrink-0 bg-obsidian overflow-hidden">
                      <Image
                        src={item.image}
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
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-champagne-brass mt-1">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal & WhatsApp details */}
              <div className="border-t border-champagne-brass/20 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-porcelain/80">
                  <span>Subtotal</span>
                  <span className="font-medium text-porcelain">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-porcelain/80">
                  <span>Delivery</span>
                  <span className="text-xs text-porcelain/60">
                    Confirmed via WhatsApp
                  </span>
                </div>
                <div className="border-t border-champagne-brass/20 pt-3 flex justify-between items-baseline">
                  <span className="font-medium text-porcelain">Total</span>
                  <span className="text-lg font-medium text-champagne-brass">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-deep-petrol/60 border border-champagne-brass/20 text-xs text-porcelain/80 leading-relaxed">
                Orders are handled directly via WhatsApp from Peshawar,
                Pakistan. No upfront card payment required on site.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
