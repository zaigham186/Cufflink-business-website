"use client";

import { categories } from "@/lib/products";

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: FilterSidebarProps) {
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name", label: "Name: A to Z" },
  ];

  return (
    <aside className="space-y-8">
      {/* Sort */}
      <div className="space-y-4">
        <h3 className="font-display text-lg text-warm-charcoal">Sort by</h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={sortBy === option.value}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-4 h-4 text-champagne-brass border-champagne-brass/30 focus:ring-champagne-brass"
              />
              <span className="ml-3 text-sm text-warm-charcoal/80 group-hover:text-champagne-brass transition-colors duration-200">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-champagne-brass/20" />

      {/* Category Filter */}
      <div className="space-y-4">
        <h3 className="font-display text-lg text-warm-charcoal">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ""}
              onChange={() => onCategoryChange("")}
              className="w-4 h-4 text-champagne-brass border-champagne-brass/30 focus:ring-champagne-brass"
            />
            <span className="ml-3 text-sm text-warm-charcoal/80 group-hover:text-champagne-brass transition-colors duration-200">
              All products
            </span>
          </label>
          {categories.map((category) => (
            <label
              key={category.slug}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                value={category.slug}
                checked={selectedCategory === category.slug}
                onChange={() => onCategoryChange(category.slug)}
                className="w-4 h-4 text-champagne-brass border-champagne-brass/30 focus:ring-champagne-brass"
              />
              <span className="ml-3 text-sm text-warm-charcoal/80 group-hover:text-champagne-brass transition-colors duration-200">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
