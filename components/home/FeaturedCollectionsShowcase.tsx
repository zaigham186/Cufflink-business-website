"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, CollectionCategory } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import Reveal from "@/components/motion/Reveal";

interface FeaturedCollectionsShowcaseProps {
  products: Product[];
}

export default function FeaturedCollectionsShowcase({
  products,
}: FeaturedCollectionsShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"All" | CollectionCategory>("All");

  const tabs: ("All" | CollectionCategory)[] = [
    "All",
    "Classical",
    "Signature",
    "Premium",
  ];

  // Filter products for the showcase
  const displayedProducts = products.filter((p) => {
    if (activeTab === "All") return p.featured;
    return p.category === activeTab;
  }).slice(0, 6);

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

  return (
    <section className="bg-obsidian text-porcelain py-20 lg:py-28 border-t border-champagne-brass/20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with collection tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-champagne-brass/20">
          <div>
            <div className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase mb-2">
              Curated Selection
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-porcelain">
              Featured Pieces
            </h2>
            <p className="text-xs sm:text-sm text-porcelain/60 mt-1">
              {getTabSubtitle()}
            </p>
          </div>

          {/* Collection Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
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

        {/* 6-Grid of Professional Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedProducts.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.08} direction="up">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        {/* Action Link to Shop Category */}
        <div className="mt-14 pt-8 border-t border-champagne-brass/15 text-center">
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
