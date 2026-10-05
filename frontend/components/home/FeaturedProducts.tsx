"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/shared/types/product";
import ProductPlaceholder from "@/frontend/components/ui/ProductPlaceholder";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedProducts({
  products: initialProducts,
}: {
  products?: Product[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts || []);

  useEffect(() => {
    if (!initialProducts || initialProducts.length === 0) {
      fetch("/api/products?featured=true")
        .then((res) => res.json())
        .then((data) => {
          if (data.products) setProducts(data.products);
        })
        .catch((err) => console.error("Error fetching featured products:", err));
    }
  }, [initialProducts]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
        },
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
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [products]);

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
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="product-card group block bg-obsidian border border-champagne-brass/20 hover:border-champagne-brass/60 transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-square relative overflow-hidden bg-obsidian">
                {product.hasPhotography && product.images && product.images.length > 0 ? (
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

              {/* Content */}
              <div className="p-6">
                <span className="text-xs uppercase tracking-widest text-champagne-brass/80 font-sans block mb-2">
                  {product.category}
                </span>
                <h3 className="font-display text-lg text-porcelain group-hover:text-champagne-brass transition-colors duration-200 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-sans text-porcelain/70">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-poragne-brass/60 group-hover:translate-x-1 transition-transform duration-200">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
