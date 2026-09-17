"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useCartStore } from "@/store/cartStore";

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    getSubtotal,
  } = useCartStore();

  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const subtotal = getSubtotal();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // GSAP animation on open/close
  useEffect(() => {
    if (!drawerRef.current || !backdropRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      if (prefersReducedMotion) {
        gsap.set(backdropRef.current, { opacity: 1, display: "block" });
        gsap.set(drawerRef.current, { x: "0%" });
      } else {
        gsap.set(backdropRef.current, { display: "block" });
        gsap.to(backdropRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.fromTo(
          drawerRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.45, ease: "power3.out" }
        );
      }
    } else {
      document.body.style.overflow = "";
      if (prefersReducedMotion) {
        gsap.set(backdropRef.current, { opacity: 0, display: "none" });
        gsap.set(drawerRef.current, { x: "100%" });
      } else {
        gsap.to(drawerRef.current, {
          x: "100%",
          duration: 0.35,
          ease: "power3.in",
        });
        gsap.to(backdropRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
            if (backdropRef.current) {
              backdropRef.current.style.display = "none";
            }
          },
        });
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <div
      aria-hidden={!isDrawerOpen}
      className={`fixed inset-0 z-50 pointer-events-none ${
        isDrawerOpen ? "pointer-events-auto" : ""
      }`}
    >
      {/* Solid dark backdrop (no blur) */}
      <div
        ref={backdropRef}
        onClick={closeDrawer}
        className="absolute inset-0 bg-obsidian/80 opacity-0 hidden"
      />

      {/* Slide drawer */}
      <aside
        ref={drawerRef}
        style={{ transform: "translateX(100%)" }}
        className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-obsidian border-l border-champagne-brass/25 text-porcelain flex flex-col shadow-none"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-champagne-brass/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-display text-porcelain">Your cart</h2>
            <span className="text-xs text-porcelain/60">
              ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 text-porcelain/70 hover:text-champagne-brass transition-colors"
            aria-label="Close cart"
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

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-champagne-brass/15">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <p className="text-base text-porcelain/60">Your cart is empty.</p>
              <button
                onClick={closeDrawer}
                className="text-sm font-medium text-champagne-brass hover:text-porcelain transition-colors"
              >
                Browse the collection →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                <div className="relative w-20 h-20 bg-obsidian border border-champagne-brass/20 flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeDrawer}
                        className="text-sm font-medium text-porcelain hover:text-champagne-brass transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-porcelain/40 hover:text-deep-wine transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-xs text-porcelain/60 mt-0.5 line-clamp-1">
                      {item.material}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-champagne-brass/30">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-porcelain/80 hover:text-champagne-brass transition-colors text-xs"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs text-porcelain">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-porcelain/80 hover:text-champagne-brass transition-colors text-xs"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-medium text-champagne-brass">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-champagne-brass/20 space-y-4 bg-obsidian">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-porcelain/70">Subtotal</span>
              <span className="text-lg font-medium text-champagne-brass">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-porcelain/50 leading-relaxed">
              Shipping calculated upon WhatsApp order confirmation.
            </p>

            <div className="space-y-2 pt-2">
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="block w-full py-3 text-center bg-champagne-brass text-obsidian text-sm font-medium border border-champagne-brass hover:bg-champagne-brass/90 transition-all duration-200"
              >
                Proceed to checkout
              </Link>
              <button
                onClick={closeDrawer}
                className="block w-full py-2.5 text-center text-xs text-porcelain/70 hover:text-porcelain transition-colors"
              >
                Continue shopping
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
