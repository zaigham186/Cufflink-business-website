"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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

type TabType = "All" | CollectionCategory;

export default function FeaturedCollectionsShowcase({
  products,
}: FeaturedCollectionsShowcaseProps) {
  const [activeTab, setActiveTab] = useState<TabType>("All");

  const headerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const tabs: TabType[] = ["All", "Classical", "Signature", "Premium"];

  // Category counts calculated from live catalog
  const counts = useMemo(() => {
    return {
      All: products.length || 67,
      Classical: products.filter((p) => p.category === "Classical").length || 17,
      Signature: products.filter((p) => p.category === "Signature").length || 33,
      Premium: products.filter((p) => p.category === "Premium").length || 17,
    };
  }, [products]);

  // Filter products for the showcase
  const displayedProducts = useMemo(() => {
    if (activeTab === "All") {
      // Prioritize featured products, fallback to first 6
      const featured = products.filter((p) => p.featured);
      return (featured.length >= 6 ? featured : products).slice(0, 6);
    }
    return products.filter((p) => p.category === activeTab).slice(0, 6);
  }, [products, activeTab]);

  const getCollectionHref = () => {
    if (activeTab === "Classical") return "/shop?category=classical";
    if (activeTab === "Signature") return "/shop?category=signature";
    if (activeTab === "Premium") return "/shop?category=premium";
    return "/shop";
  };

  const getTabSubtitle = () => {
    switch (activeTab) {
      case "Classical":
        return `Turned brass essentials • Rs. 700–800 • ${counts.Classical} pieces calibrated for boardroom tailoring`;
      case "Signature":
        return `Vitreous enamel & guilloché • Rs. 1,000–1,400 • ${counts.Signature} pieces with tactile surface relief`;
      case "Premium":
        return `Austrian crystals & relief engraving • Rs. 1,500–2,500 • ${counts.Premium} ceremonial evening pieces`;
      default:
        return `Archive highlights • Rs. 700–2,500 • 67 distinct pieces across three handcrafted tiers`;
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
    <section
      aria-labelledby="featured-showcase-title"
      className="bg-obsidian text-porcelain py-20 lg:py-28 border-t border-champagne-brass/20 overflow-hidden"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with collection tabs */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6"
        >
          <div>
            <div
              ref={tagRef}
              className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase mb-2 opacity-0"
            >
              The Atelier Showcase
            </div>
            <h2
              id="featured-showcase-title"
              ref={titleRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-display text-porcelain opacity-0"
              style={{ willChange: "transform" }}
            >
              Distinguished Pieces
            </h2>
            <p className="text-xs sm:text-sm text-porcelain/70 mt-2 max-w-xl font-sans">
              {getTabSubtitle()}
            </p>
          </div>

          {/* Collection Filter Tabs */}
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Filter showcase by collection"
            className="flex flex-wrap items-center gap-2 sm:gap-3 opacity-0"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              const count = counts[tab];
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-200 border flex items-center gap-1.5 ${
                    isActive
                      ? "bg-champagne-brass text-obsidian border-champagne-brass font-semibold shadow-sm"
                      : "bg-transparent text-porcelain/75 border-champagne-brass/25 hover:border-champagne-brass hover:text-porcelain"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-sharp ${
                      isActive
                        ? "bg-obsidian/20 text-obsidian"
                        : "text-porcelain/50"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hairline Divider */}
        <div
          ref={dividerRef}
          className="h-px bg-champagne-brass/20 mb-12"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />

        {/* 6-Grid of Professional Product Cards with dynamic key transition */}
        <div
          key={activeTab}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {displayedProducts.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.06} direction="up">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        {/* Action Link & Brand Assurances */}
        <div
          ref={ctaRef}
          className="mt-14 pt-10 border-t border-champagne-brass/15 opacity-0 flex flex-col items-center gap-6"
        >
          <Link
            href={getCollectionHref()}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-transparent border border-champagne-brass text-champagne-brass hover:bg-champagne-brass hover:text-obsidian text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 group"
          >
            <span>
              {activeTab === "All"
                ? `Explore Entire ${counts.All}-Piece Archive`
                : `View All ${counts[activeTab]} ${activeTab} Pieces`}
            </span>
            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </span>
          </Link>

          {/* Luxury Assurance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] sm:text-xs text-porcelain/60 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="text-champagne-brass">✓</span> Nationwide Cash on Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-champagne-brass">✓</span> Hand-Inspected in Peshawar
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-champagne-brass">✓</span> Presentation Box Included
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-champagne-brass">✓</span> WhatsApp Concierge Ordering
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

