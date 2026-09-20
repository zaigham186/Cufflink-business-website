"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import Reveal from "@/components/motion/Reveal";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialColor = searchParams.get("color") || "";
  const initialFinish = searchParams.get("finish") || "";
  const initialMaterial = searchParams.get("material") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedFinish, setSelectedFinish] = useState(initialFinish);
  const [selectedMaterial, setSelectedMaterial] = useState(initialMaterial);
  const [searchFilter, setSearchFilter] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state with URL query params when they change
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
    setSearchFilter(searchParams.get("search") || "");
    setSelectedColor(searchParams.get("color") || "");
    setSelectedFinish(searchParams.get("finish") || "");
    setSelectedMaterial(searchParams.get("material") || "");
  }, [searchParams]);

  const handleResetAll = () => {
    setSelectedCategory("");
    setSelectedPrice("");
    setSelectedColor("");
    setSelectedFinish("");
    setSelectedMaterial("");
    setSearchFilter("");
    setSortBy("featured");
    router.replace("/shop", { scroll: false });
  };

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 0. Search Query Filter
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.finish.toLowerCase().includes(q) ||
          p.pattern.toLowerCase().includes(q)
      );
    }

    // 1. Primary Collection Filter (Classical / Signature / Premium)
    if (selectedCategory) {
      const targetSlug = selectedCategory.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.categorySlug.toLowerCase() === targetSlug ||
          product.category.toLowerCase() === targetSlug
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

    // 5. Material Filter
    if (selectedMaterial) {
      const targetMaterial = selectedMaterial.toLowerCase();
      result = result.filter((p) =>
        p.material.toLowerCase().includes(targetMaterial)
      );
    }

    // 6. Sorting
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
    searchFilter,
    selectedCategory,
    selectedPrice,
    selectedColor,
    selectedFinish,
    selectedMaterial,
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

  const hasAnyFilter =
    Boolean(selectedCategory) ||
    Boolean(selectedPrice) ||
    Boolean(selectedColor) ||
    Boolean(selectedFinish) ||
    Boolean(selectedMaterial) ||
    Boolean(searchFilter);

  // Derive collection display name
  const collectionDisplayName = useMemo(() => {
    if (searchFilter) return `Search: "${searchFilter}"`;
    if (!selectedCategory) return "All cufflinks";
    const matched = products.find(
      (p) =>
        p.categorySlug.toLowerCase() === selectedCategory.toLowerCase() ||
        p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    if (matched) return `${matched.category} collection`;
    return `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} collection`;
  }, [searchFilter, selectedCategory, products]);

  return (
    <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 pb-6 border-b border-warm-charcoal/15">
        <div>
          <h2 className="text-xl sm:text-2xl font-display text-warm-charcoal">
            {collectionDisplayName}
          </h2>
          <p className="text-xs sm:text-sm text-warm-charcoal/60 mt-1">
            {filteredAndSortedProducts.length}{" "}
            {filteredAndSortedProducts.length === 1 ? "piece" : "pieces"}{" "}
            available
          </p>
        </div>

        {/* Action group: Active filters count / Mobile filter button */}
        <div className="flex items-center gap-3">
          {hasAnyFilter && (
            <button
              onClick={handleResetAll}
              className="text-xs text-warm-charcoal/60 hover:text-warm-charcoal underline underline-offset-4"
            >
              Clear all filters
            </button>
          )}

          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden px-4 py-2 border border-warm-charcoal/30 text-xs font-medium text-warm-charcoal hover:bg-obsidian hover:text-porcelain transition-colors"
          >
            Filters &amp; Sort
          </button>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasAnyFilter && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-warm-charcoal/50 mr-1">Active:</span>

          {searchFilter && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-warm-charcoal/5 border border-warm-charcoal/15 text-warm-charcoal">
              Search: {searchFilter}
              <button
                onClick={() => setSearchFilter("")}
                className="hover:text-champagne-brass"
                aria-label="Remove search filter"
              >
                ✕
              </button>
            </span>
          )}

          {selectedCategory && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-warm-charcoal/5 border border-warm-charcoal/15 text-warm-charcoal">
              Collection: {selectedCategory}
              <button
                onClick={() => setSelectedCategory("")}
                className="hover:text-champagne-brass"
                aria-label="Remove collection filter"
              >
                ✕
              </button>
            </span>
          )}

          {selectedMaterial && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-warm-charcoal/5 border border-warm-charcoal/15 text-warm-charcoal">
              Material: {selectedMaterial}
              <button
                onClick={() => setSelectedMaterial("")}
                className="hover:text-champagne-brass"
                aria-label="Remove material filter"
              >
                ✕
              </button>
            </span>
          )}

          {selectedFinish && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-warm-charcoal/5 border border-warm-charcoal/15 text-warm-charcoal">
              Finish: {selectedFinish}
              <button
                onClick={() => setSelectedFinish("")}
                className="hover:text-champagne-brass"
                aria-label="Remove finish filter"
              >
                ✕
              </button>
            </span>
          )}

          {selectedColor && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-warm-charcoal/5 border border-warm-charcoal/15 text-warm-charcoal">
              Color: {selectedColor}
              <button
                onClick={() => setSelectedColor("")}
                className="hover:text-champagne-brass"
                aria-label="Remove color filter"
              >
                ✕
              </button>
            </span>
          )}

          {selectedPrice && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-warm-charcoal/5 border border-warm-charcoal/15 text-warm-charcoal">
              Price: {selectedPrice}
              <button
                onClick={() => setSelectedPrice("")}
                className="hover:text-champagne-brass"
                aria-label="Remove price filter"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}

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
            selectedMaterial={selectedMaterial}
            onMaterialChange={setSelectedMaterial}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetAll={handleResetAll}
          />
        </div>

        {/* Mobile Filter Overlay (solid porcelain) */}
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
                selectedMaterial={selectedMaterial}
                onMaterialChange={(m) => {
                  setSelectedMaterial(m);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 transition-opacity duration-300">
              {filteredAndSortedProducts.map((product, index) => (
                <div key={product.id} className={getCardSpan(index)}>
                  <Reveal delay={(index % 6) * 0.08} direction="up" className="h-full">
                    <ProductCard product={product} />
                  </Reveal>
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
