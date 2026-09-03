"use client";

import { useCartStore } from "@/store/cartStore";
import Button from "@/components/ui/Button";

export default function CartSummary() {
  const subtotal = useCartStore((state) => state.getSubtotal());

  return (
    <div className="bg-deep-petrol border border-champagne-brass/20 p-6 lg:p-8 space-y-6 sticky top-24">
      <h2 className="font-display text-xl text-porcelain">Order summary</h2>

      <div className="space-y-3 text-sm text-porcelain">
        <div className="flex justify-between">
          <span className="opacity-70">Subtotal</span>
          <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-70">Shipping</span>
          <span className="text-sm opacity-60">Calculated at checkout</span>
        </div>
      </div>

      <div className="border-t border-champagne-brass/20 pt-4">
        <div className="flex justify-between text-lg font-medium text-porcelain">
          <span>Total</span>
          <span className="text-champagne-brass">Rs. {subtotal.toLocaleString()}</span>
        </div>
        <p className="text-xs text-porcelain/50 mt-2">Final total calculated at checkout</p>
      </div>

      <Button href="/checkout" variant="primary" className="w-full">
        Proceed to checkout
      </Button>

      <div className="text-xs text-porcelain/60 space-y-2 pt-4 border-t border-champagne-brass/10">
        <p>• Secure toggle closure on all cufflinks</p>
        <p>• Ships from Peshawar, Pakistan</p>
        <p>• Contact us for international orders</p>
      </div>
    </div>
  );
}
