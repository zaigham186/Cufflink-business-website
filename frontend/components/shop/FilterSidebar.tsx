"use client";

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedPrice: string;
  onPriceChange: (price: string) => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
  selectedFinish: string;
  onFinishChange: (finish: string) => void;
  selectedMaterial?: string;
  onMaterialChange?: (material: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onResetAll: () => void;
}

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedPrice,
  onPriceChange,
  selectedColor,
  onColorChange,
  selectedFinish,
  onFinishChange,
  selectedMaterial = "",
  onMaterialChange,
  sortBy,
  onSortChange,
  onResetAll,
}: FilterSidebarProps) {
  // Three primary collections per prompt specification
  const collections = [
    { label: "All collections", value: "" },
    { label: "Classical", value: "classical" },
    { label: "Signature", value: "signature" },
    { label: "Premium", value: "premium" },
  ];

  // Secondary attribute filters
  const priceRanges = [
    { label: "All prices", value: "" },
    { label: "Under Rs. 3,000", value: "under-3000" },
    { label: "Rs. 3,000 – Rs. 3,500", value: "3000-3500" },
    { label: "Above Rs. 3,500", value: "above-3500" },
  ];

  const materials = [
    { label: "All materials", value: "" },
    { label: "Gold-tone metal", value: "gold" },
    { label: "Silver-tone metal", value: "silver" },
    { label: "Gunmetal finish", value: "gunmetal" },
    { label: "Enamel", value: "enamel" },
    { label: "Crystal pavé", value: "crystal" },
  ];

  const colors = [
    { label: "All colors", value: "" },
    { label: "Gold", value: "gold" },
    { label: "Silver", value: "silver" },
    { label: "Gunmetal", value: "gunmetal" },
    { label: "Blue", value: "blue" },
    { label: "Ivory", value: "ivory" },
    { label: "Black", value: "black" },
  ];

  const finishes = [
    { label: "All finishes", value: "" },
    { label: "Polished", value: "polished" },
    { label: "Matte", value: "matte" },
    { label: "Engraved", value: "engraved" },
  ];

  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Newest", value: "newest" },
    { label: "Price low → high", value: "price-asc" },
    { label: "Price high → low", value: "price-desc" },
  ];

  const hasActiveFilters =
    Boolean(selectedCategory) ||
    Boolean(selectedPrice) ||
    Boolean(selectedColor) ||
    Boolean(selectedFinish) ||
    Boolean(selectedMaterial);

  return (
    <div className="space-y-8 text-warm-charcoal">
      {/* Sort Section */}
      <div className="space-y-3 pb-6 border-b border-warm-charcoal/15">
        <h3 className="text-xs tracking-wider uppercase font-medium text-warm-charcoal/70">
          Sort by
        </h3>
        <div className="space-y-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className={`block w-full text-left py-1 text-sm transition-colors ${
                sortBy === opt.value
                  ? "font-medium text-warm-charcoal text-champagne-brass font-semibold"
                  : "text-warm-charcoal/60 hover:text-warm-charcoal"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Collection Filter */}
      <div className="space-y-3 pb-6 border-b border-warm-charcoal/15">
        <h3 className="text-xs tracking-wider uppercase font-medium text-warm-charcoal/70">
          Collection
        </h3>
        <div className="space-y-1">
          {collections.map((col) => (
            <button
              key={col.value}
              onClick={() => onCategoryChange(col.value)}
              className={`block w-full text-left py-1 text-sm transition-colors ${
                selectedCategory.toLowerCase() === col.value.toLowerCase()
                  ? "font-medium text-warm-charcoal text-champagne-brass font-semibold"
                  : "text-warm-charcoal/60 hover:text-warm-charcoal"
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Attribute Filter: Material */}
      {onMaterialChange && (
        <div className="space-y-3 pb-6 border-b border-warm-charcoal/15">
          <h3 className="text-xs tracking-wider uppercase font-medium text-warm-charcoal/70">
            Material
          </h3>
          <div className="space-y-1">
            {materials.map((m) => (
              <button
                key={m.value}
                onClick={() => onMaterialChange(m.value)}
                className={`block w-full text-left py-1 text-sm transition-colors ${
                  selectedMaterial.toLowerCase() === m.value.toLowerCase()
                    ? "font-medium text-warm-charcoal text-champagne-brass font-semibold"
                    : "text-warm-charcoal/60 hover:text-warm-charcoal"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Secondary Attribute Filter: Finish */}
      <div className="space-y-3 pb-6 border-b border-warm-charcoal/15">
        <h3 className="text-xs tracking-wider uppercase font-medium text-warm-charcoal/70">
          Finish
        </h3>
        <div className="space-y-1">
          {finishes.map((f) => (
            <button
              key={f.value}
              onClick={() => onFinishChange(f.value)}
              className={`block w-full text-left py-1 text-sm transition-colors ${
                selectedFinish.toLowerCase() === f.value.toLowerCase()
                  ? "font-medium text-warm-charcoal text-champagne-brass font-semibold"
                  : "text-warm-charcoal/60 hover:text-warm-charcoal"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Attribute Filter: Color */}
      <div className="space-y-3 pb-6 border-b border-warm-charcoal/15">
        <h3 className="text-xs tracking-wider uppercase font-medium text-warm-charcoal/70">
          Color
        </h3>
        <div className="space-y-1">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => onColorChange(c.value)}
              className={`block w-full text-left py-1 text-sm transition-colors ${
                selectedColor.toLowerCase() === c.value.toLowerCase()
                  ? "font-medium text-warm-charcoal text-champagne-brass font-semibold"
                  : "text-warm-charcoal/60 hover:text-warm-charcoal"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Attribute Filter: Price */}
      <div className="space-y-3 pb-6 border-b border-warm-charcoal/15">
        <h3 className="text-xs tracking-wider uppercase font-medium text-warm-charcoal/70">
          Price
        </h3>
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => onPriceChange(range.value)}
              className={`block w-full text-left py-1 text-sm transition-colors ${
                selectedPrice === range.value
                  ? "font-medium text-warm-charcoal text-champagne-brass font-semibold"
                  : "text-warm-charcoal/60 hover:text-warm-charcoal"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset filters */}
      {hasActiveFilters && (
        <div>
          <button
            onClick={onResetAll}
            className="text-xs text-warm-charcoal/60 hover:text-warm-charcoal underline underline-offset-4"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
