"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Product, CollectionCategory } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import Reveal from "@/components/motion/Reveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeaturedCollectionsShowcaseProps {
  products: Product[];
}

export default function FeaturedCollectionsShowcase({
  products,
}: FeaturedCollectionsShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"All" | CollectionCategory>("All");

  const headerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const tabs: ("All" | CollectionCategory)[] = [
    "All",
    "Classical",
    "Signature",
    "Premium",
  ];

  // Filter products for the showcase
  const displayedProducts = products
    .filter((p) => {
      if (activeTab === "All") return p.featured;
      return p.category === activeTab;
    })
    .slice(0, 6);

  const getCollectionHref = () => {
    if (activeTab === "Classical") return "/shop?category=classical";
    if (activeTab === "Signature") return "/shop?category=signature";
    if (activeTab === "Premium") return "/shop?category=premium";
    return "/shop";
  };

  const getTabSubtitle = () => {
    switch (activeTab) {
      case "Classical":
        return "Essential formal pieces • Rs. 700–800 • 17 pieces available";
      case "Signature":
        return "Elevated enamel & textures • Rs. 1,000–1,400 • 33 pieces available";
      case "Premium":
        return "Artisanal engraving & stones • Rs. 1,500–2,500 • 17 pieces available";
      default:
        return "Curated selection from our three distinct collections";
    }
  };

  // Header entrance
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: "power4.out" },
          "-=0.3"
        )
        .fromTo(
          tabsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.3"
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // CTA entrance
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    if (!ctaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-obsidian text-porcelain py-20 lg:py-28 border-t border-champagne-brass/20 overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with collection tabs */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6"
        >
          <div>
            <div
              ref={tagRef}
              className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase mb-2 opacity-0"
            >
              Curated Selection
            </div>
            <h2
              ref={titleRef}
              className="text-2xl sm:text-3xl lg:text-4xl font-display text-porcelain opacity-0"
              style={{ willChange: "transform" }}
            >
              Featured Pieces
            </h2>
            <p className="text-xs sm:text-sm text-porcelain/60 mt-1">
              {getTabSubtitle()}
            </p>
          </div>

          {/* Collection Filter Tabs */}
          <div ref={tabsRef} className="flex flex-wrap items-center gap-2 sm:gap-3 opacity-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-200 border ${
                  activeTab === tab
                    ? "bg-champagne-brass text-obsidian border-champagne-brass font-semibold"
                    : "bg-transparent text-porcelain/70 border-champagne-brass/25 hover:border-champagne-brass hover:text-porcelain"
                }`}
              >
                {tab} {tab !== "All" && "Collection"}
              </button>
            ))}
          </div>
        </div>

        {/* Divider line */}
        <div
          ref={dividerRef}
          className="h-px bg-champagne-brass/20 mb-12"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />

        {/* 6-Grid of Professional Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedProducts.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.08} direction="up">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        {/* Action Link to Shop Category */}
        <div
          ref={ctaRef}
          className="mt-14 pt-8 border-t border-champagne-brass/15 text-center opacity-0"
        >
          <Link
            href={getCollectionHref()}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-transparent border border-champagne-brass text-champagne-brass hover:bg-champagne-brass hover:text-obsidian text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 group"
          >
            <span>
              {activeTab === "All"
                ? "View All 67 Pieces in Shop"
                : `Explore all ${activeTab} collection pieces`}
            </span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
