"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.categorySlug === selectedCategory
      );
    }

    // Sort
    let sorted = [...filtered];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    return sorted;
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex items-center justify-between mb-12 pb-8 border-b border-champagne-brass/20">
        <div>
          <h2 className="text-2xl font-display text-warm-charcoal mb-2">
            {selectedCategory
              ? products.find((p) => p.categorySlug === selectedCategory)
                  ?.category || "Shop"
              : "All cufflinks"}
          </h2>
          <p className="text-sm text-warm-charcoal/60">
            {filteredAndSortedProducts.length}{" "}
            {filteredAndSortedProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="lg:hidden px-4 py-2 border border-champagne-brass/30 text-sm font-medium text-warm-charcoal hover:bg-obsidian hover:text-porcelain transition-all duration-200"
        >
          Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Mobile Filters */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 bg-obsidian/80 backdrop-blur-sm z-50">
            <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-porcelain p-6 overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-warm-charcoal">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-warm-charcoal hover:text-champagne-brass transition-colors"
                  aria-label="Close filters"
                >
                  <svg
                    className="w-6 h-6"
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
              <FilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={(cat) => {
                  setSelectedCategory(cat);
                  setMobileFiltersOpen(false);
                }}
                sortBy={sortBy}
                onSortChange={(sort) => {
                  setSortBy(sort);
                  setMobileFiltersOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-warm-charcoal/70">No products found</p>
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSortBy("featured");
                }}
                className="mt-4 text-sm text-champagne-brass hover:text-obsidian transition-colors duration-200"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
