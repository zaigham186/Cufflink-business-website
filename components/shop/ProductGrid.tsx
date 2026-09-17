"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedFinish, setSelectedFinish] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync category with URL query param if changed
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleResetAll = () => {
    setSelectedCategory("");
    setSelectedPrice("");
    setSelectedColor("");
    setSelectedFinish("");
    setSortBy("featured");
  };

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (selectedCategory) {
      result = result.filter(
        (product) => product.categorySlug === selectedCategory
      );
    }

    // 2. Price Filter
    if (selectedPrice) {
      if (selectedPrice === "under-3000") {
        result = result.filter((p) => p.price < 3000);
      } else if (selectedPrice === "3000-3500") {
        result = result.filter((p) => p.price >= 3000 && p.price <= 3500);
      } else if (selectedPrice === "above-3500") {
        result = result.filter((p) => p.price > 3500);
      }
    }

    // 3. Color Filter
    if (selectedColor) {
      const targetColor = selectedColor.toLowerCase();
      result = result.filter((p) =>
        p.color.toLowerCase().includes(targetColor)
      );
    }

    // 4. Finish Filter
    if (selectedFinish) {
      const targetFinish = selectedFinish.toLowerCase();
      result = result.filter((p) =>
        p.finish.toLowerCase().includes(targetFinish)
      );
    }

    // 5. Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "featured":
      default:
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    return result;
  }, [
    products,
    selectedCategory,
    selectedPrice,
    selectedColor,
    selectedFinish,
    sortBy,
  ]);

  // Helper function to assign asymmetric grid spans on desktop
  const getCardSpan = (index: number) => {
    const cycle = index % 5;
    if (cycle === 0) return "lg:col-span-7";
    if (cycle === 1) return "lg:col-span-5";
    if (cycle === 2) return "lg:col-span-4";
    if (cycle === 3) return "lg:col-span-4";
    if (cycle === 4) return "lg:col-span-4";
    return "lg:col-span-6";
  };

  return (
    <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
      {/* Top Bar */}
      <div className="flex items-baseline justify-between mb-10 pb-6 border-b border-warm-charcoal/15">
        <div>
          <h2 className="text-xl sm:text-2xl font-display text-warm-charcoal">
            {selectedCategory
              ? products.find((p) => p.categorySlug === selectedCategory)
                  ?.category || "Selected pieces"
              : "All cufflinks"}
          </h2>
          <p className="text-xs sm:text-sm text-warm-charcoal/60 mt-1">
            {filteredAndSortedProducts.length}{" "}
            {filteredAndSortedProducts.length === 1 ? "piece" : "pieces"}{" "}
            available
          </p>
        </div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden px-4 py-2 border border-warm-charcoal/30 text-xs font-medium text-warm-charcoal hover:bg-obsidian hover:text-porcelain transition-colors"
        >
          Filters & Sort
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Desktop Filter Sidebar (260px) */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedPrice={selectedPrice}
            onPriceChange={setSelectedPrice}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            selectedFinish={selectedFinish}
            onFinishChange={setSelectedFinish}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetAll={handleResetAll}
          />
        </div>

        {/* Mobile Filter Overlay (solid porcelain, no glassmorphism) */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-obsidian/70"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="absolute top-0 right-0 bottom-0 w-80 max-w-full bg-porcelain p-6 overflow-y-auto border-l border-warm-charcoal/15">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-warm-charcoal/15">
                <span className="font-display text-lg text-warm-charcoal">
                  Filters
                </span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-warm-charcoal/70 hover:text-warm-charcoal"
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>

              <FilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={(c) => {
                  setSelectedCategory(c);
                  setMobileFiltersOpen(false);
                }}
                selectedPrice={selectedPrice}
                onPriceChange={(p) => {
                  setSelectedPrice(p);
                  setMobileFiltersOpen(false);
                }}
                selectedColor={selectedColor}
                onColorChange={(col) => {
                  setSelectedColor(col);
                  setMobileFiltersOpen(false);
                }}
                selectedFinish={selectedFinish}
                onFinishChange={(f) => {
                  setSelectedFinish(f);
                  setMobileFiltersOpen(false);
                }}
                sortBy={sortBy}
                onSortChange={(s) => {
                  setSortBy(s);
                  setMobileFiltersOpen(false);
                }}
                onResetAll={() => {
                  handleResetAll();
                  setMobileFiltersOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Product Grid Area */}
        <div className="flex-1">
          {filteredAndSortedProducts.length > 0 ? (
            /* 12-column Asymmetric Desktop Grid, 1-2 columns on mobile */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
              {filteredAndSortedProducts.map((product, index) => (
                <div key={product.id} className={getCardSpan(index)}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-warm-charcoal/10 bg-porcelain space-y-4">
              <p className="text-base text-warm-charcoal/70">
                No cufflinks match the selected filters.
              </p>
              <button
                onClick={handleResetAll}
                className="text-sm font-medium text-warm-charcoal underline underline-offset-4 hover:text-champagne-brass transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
