"use client";

import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-obsidian min-h-screen pt-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <h1 className="text-h2 font-display mb-12 text-porcelain">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left - Form */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Right - Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-deep-petrol border border-champagne-brass/20 p-6 lg:p-8 space-y-6 sticky top-24">
              <h2 className="font-display text-xl text-porcelain">Order summary</h2>

              {/* Items */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 border border-champagne-brass/20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-porcelain line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-porcelain/60 mt-1">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-champagne-brass mt-1">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-champagne-brass/20 pt-4 space-y-3">
                <div className="flex justify-between text-porcelain">
                  <span className="opacity-70">Subtotal</span>
                  <span className="font-medium">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-porcelain">
                  <span className="opacity-70">Shipping</span>
                  <span className="text-sm opacity-60">TBD</span>
                </div>
                <div className="border-t border-champagne-brass/20 pt-3">
                  <div className="flex justify-between text-lg font-medium text-porcelain">
                    <span>Total</span>
                    <span className="text-champagne-brass">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-porcelain/50 mt-2">
                    + shipping (calculated after order)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
