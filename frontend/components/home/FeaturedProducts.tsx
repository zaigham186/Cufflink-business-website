"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/lib/products";
import ProductPlaceholder from "@/components/ui/ProductPlaceholder";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const products = getFeaturedProducts();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // Product cards stagger
      gsap.from(".product-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-porcelain py-section">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 lg:mb-16">
          <h2 ref={titleRef} className="text-h2 font-display text-warm-charcoal">
            Featured pieces
          </h2>
          <Link
            href="/shop"
            className="hidden sm:block text-sm font-medium text-warm-charcoal/60 hover:text-champagne-brass transition-colors duration-200"
          >
            View all
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="product-card group block bg-obsidian border border-champagne-brass/20 hover:border-champagne-brass/60 transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-square relative overflow-hidden bg-obsidian">
                {product.hasPhotography ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <ProductPlaceholder />
                )}
              </div>

              {/* Info */}
              <div className="p-6 space-y-3 bg-obsidian">
                <div>
                  <h3 className="text-lg font-display text-porcelain group-hover:text-champagne-brass transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-sm text-porcelain/60 mt-2 line-clamp-1">
                    {product.material}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-medium text-champagne-brass">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-porcelain/40 line-through">
                      Rs. {product.compareAtPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Hover line */}
                <div className="h-px w-0 bg-champagne-brass group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/shop"
            className="text-sm font-medium text-warm-charcoal/60 hover:text-champagne-brass transition-colors duration-200"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
