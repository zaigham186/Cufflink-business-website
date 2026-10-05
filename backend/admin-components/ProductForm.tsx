"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import type { Product, Collection } from "@/shared/types/product";

interface ProductFormProps {
  product?: Partial<Product> & { _id?: string };
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(product?._id || product?.id);
  const productId = product?._id || product?.id;

  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    category: (product?.category as Collection) || "Classical",
    categorySlug: product?.categorySlug || "classical",
    description: product?.description || "",
    longDescription: product?.longDescription || "",
    price: product?.price ? Number(product.price) : 750,
    salePrice: product?.salePrice ? Number(product.salePrice) : undefined,
    compareAtPrice: product?.compareAtPrice ? Number(product.compareAtPrice) : undefined,
    images: product?.images || [],
    material: product?.material || "Gold-tone metal",
    finish: product?.finish || "Polished",
    color: product?.color || "Gold",
    shape: product?.shape || "Square",
    pattern: product?.pattern || "",
    isSet: Boolean(product?.isSet),
    pairsCount: product?.pairsCount || 1,
    stock: (product?.stockStatus as any) || "in-stock",
    stockCount: typeof product?.stockCount === "number" ? product.stockCount : 10,
    sku: product?.sku || "",
    featured: Boolean(product?.featured),
    isNew: Boolean(product?.isNew),
    isLimited: Boolean(product?.isLimited),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (!isEditing || !formData.slug) {
      setFormData((prev) => ({
        ...prev,
        name: newName,
        slug: generateSlug(newName),
        sku: prev.sku || `CK-${newName.substring(0, 3).toUpperCase()}-001`,
      }));
    } else {
      setFormData((prev) => ({ ...prev, name: newName }));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value as Collection;
    setFormData((prev) => ({
      ...prev,
      category: cat,
      categorySlug: cat.toLowerCase(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage(null);
    setLoading(true);

    try {
      const url = isEditing ? `/api/products/${productId}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const payload = {
        ...formData,
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
        stockCount: Number(formData.stockCount),
        pairsCount: Number(formData.pairsCount),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error && typeof data.error === "object" && data.error.fieldErrors) {
          const formattedErrors: Record<string, string> = {};
          for (const [key, msgs] of Object.entries(data.error.fieldErrors)) {
            formattedErrors[key] = (msgs as string[])[0];
          }
          setErrors(formattedErrors);
        } else {
          setErrors({ general: data.error || "Failed to save product" });
        }
        setLoading(false);
        return;
      }

      setSuccessMessage(
        isEditing ? "Product successfully updated!" : "New product created successfully!"
      );

      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 1200);
    } catch {
      setErrors({ general: "A network error occurred. Please try again." });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl text-porcelain">
      {/* Toast Notification */}
      {successMessage && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between">
          <span>✓ {successMessage}</span>
          <span className="text-[10px] text-emerald-300/80">Redirecting to catalog...</span>
        </div>
      )}

      {errors.general && (
        <div className="p-4 bg-red-950/60 border border-deep-wine/60 text-red-300 text-xs">
          ✕ {errors.general}
        </div>
      )}

      {/* 01. Basic Info */}
      <div className="bg-white/5 border border-champagne-brass/20 p-6 space-y-6">
        <h2 className="text-sm font-display text-champagne-brass uppercase tracking-widest border-b border-white/10 pb-3">
          Product Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={handleNameChange}
              placeholder="e.g. Classical Minimalist Gold Cufflinks"
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
            />
            {errors.name && <p className="text-[10px] text-red-300 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Slug (URL Identifier) *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
              placeholder="e.g. classical-minimalist-gold-cufflinks"
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass font-mono"
            />
            {errors.slug && <p className="text-[10px] text-red-300 mt-1">{errors.slug}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Collection Tier *
            </label>
            <select
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2.5 bg-obsidian border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
            >
              <option value="Classical">Classical (Rs. 700–800)</option>
              <option value="Signature">Signature (Rs. 1,000–1,400)</option>
              <option value="Premium">Premium (Rs. 1,500–2,500)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              SKU Identifier *
            </label>
            <input
              type="text"
              required
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
              placeholder="CK-CLS-001"
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass font-mono uppercase"
            />
            {errors.sku && <p className="text-[10px] text-red-300 mt-1">{errors.sku}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
            Short Description *
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Solid brass base with polished gold-tone finish and clean beveled edges for daily formalwear."
            className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
          />
          {errors.description && (
            <p className="text-[10px] text-red-300 mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
            Long Description (Optional)
          </label>
          <textarea
            rows={4}
            value={formData.longDescription}
            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
            placeholder="Detailed styling notes, occasion recommendations, and design narrative..."
            className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
          />
        </div>
      </div>

      {/* 02. Pricing and Inventory */}
      <div className="bg-white/5 border border-champagne-brass/20 p-6 space-y-6">
        <h2 className="text-sm font-display text-champagne-brass uppercase tracking-widest border-b border-white/10 pb-3">
          Pricing & Inventory
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Price (PKR) *
            </label>
            <input
              type="number"
              required
              min={0}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass font-mono"
            />
            {errors.price && <p className="text-[10px] text-red-300 mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Sale Price (PKR)
            </label>
            <input
              type="number"
              min={0}
              value={formData.salePrice ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salePrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Optional discount price"
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass font-mono"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Compare At Price (PKR)
            </label>
            <input
              type="number"
              min={0}
              value={formData.compareAtPrice ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  compareAtPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Original price for strikethrough"
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Stock Count *
            </label>
            <input
              type="number"
              required
              min={0}
              value={formData.stockCount}
              onChange={(e) => {
                const count = Number(e.target.value);
                const status = count === 0 ? "out-of-stock" : count <= 5 ? "low-stock" : "in-stock";
                setFormData({ ...formData, stockCount: count, stock: status });
              }}
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass font-mono"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Stock Status *
            </label>
            <select
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value as any })}
              className="w-full px-4 py-2.5 bg-obsidian border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
            >
              <option value="in-stock">In Stock (&gt; 5 units)</option>
              <option value="low-stock">Low Stock (&le; 5 units)</option>
              <option value="out-of-stock">Out of Stock (0 units)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 03. Specifications */}
      <div className="bg-white/5 border border-champagne-brass/20 p-6 space-y-6">
        <h2 className="text-sm font-display text-champagne-brass uppercase tracking-widest border-b border-white/10 pb-3">
          Material & Craft Specifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Material *
            </label>
            <input
              type="text"
              required
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              placeholder="e.g. Gold-tone metal"
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Finish *
            </label>
            <input
              type="text"
              required
              value={formData.finish}
              onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
              placeholder="e.g. Polished, Brushed, Matte"
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Color *
            </label>
            <input
              type="text"
              required
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              placeholder="e.g. Gold, Silver, Onyx"
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Shape
            </label>
            <input
              type="text"
              value={formData.shape}
              onChange={(e) => setFormData({ ...formData, shape: e.target.value })}
              placeholder="e.g. Square, Round, Octagonal"
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Pattern / Texture
            </label>
            <input
              type="text"
              value={formData.pattern}
              onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
              placeholder="e.g. Minimalist bevel, Pavé"
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
            />
          </div>
        </div>

        {/* Set & Pairs */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6">
          <label className="flex items-center space-x-2 text-xs uppercase tracking-wider cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isSet}
              onChange={(e) => setFormData({ ...formData, isSet: e.target.checked })}
              className="w-4 h-4 rounded border-champagne-brass/30 bg-black/40 text-champagne-brass focus:ring-0"
            />
            <span>Multipack / Set</span>
          </label>

          {formData.isSet && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-porcelain/70">Pairs Count:</span>
              <input
                type="number"
                min={1}
                value={formData.pairsCount}
                onChange={(e) => setFormData({ ...formData, pairsCount: Number(e.target.value) })}
                className="w-20 px-2 py-1 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs font-mono"
              />
            </div>
          )}
        </div>
      </div>

      {/* 04. Imagery */}
      <div className="bg-white/5 border border-champagne-brass/20 p-6 space-y-6">
        <div>
          <h2 className="text-sm font-display text-champagne-brass uppercase tracking-widest">
            Photography & Media
          </h2>
          <p className="text-xs text-porcelain/50 mt-1">
            Specify public paths (e.g. /products/classic1.jpeg). The first image will be used as the primary card visual.
          </p>
        </div>

        <ImageUploader
          images={formData.images}
          onChange={(newImages) => setFormData({ ...formData, images: newImages })}
        />
        {errors.images && <p className="text-[10px] text-red-300 mt-1">{errors.images}</p>}
      </div>

      {/* 05. Flags and Badges */}
      <div className="bg-white/5 border border-champagne-brass/20 p-6 space-y-4">
        <h2 className="text-sm font-display text-champagne-brass uppercase tracking-widest border-b border-white/10 pb-3">
          Display Badges & Highlights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex items-center space-x-3 p-3 bg-black/30 border border-white/5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded text-champagne-brass"
            />
            <div>
              <span className="block text-xs font-medium text-porcelain">Featured Piece</span>
              <span className="text-[10px] text-porcelain/50">Showcased on homepage</span>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-3 bg-black/30 border border-white/5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isNew}
              onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
              className="w-4 h-4 rounded text-champagne-brass"
            />
            <div>
              <span className="block text-xs font-medium text-porcelain">New Arrival</span>
              <span className="text-[10px] text-porcelain/50">Highlights latest release</span>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-3 bg-black/30 border border-white/5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isLimited}
              onChange={(e) => setFormData({ ...formData, isLimited: e.target.checked })}
              className="w-4 h-4 rounded text-champagne-brass"
            />
            <div>
              <span className="block text-xs font-medium text-porcelain">Limited Edition</span>
              <span className="text-[10px] text-porcelain/50">Displays rarity badge</span>
            </div>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-white/20 text-porcelain/80 text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-champagne-brass text-obsidian text-xs uppercase tracking-widest font-medium hover:bg-champagne-brass/90 transition-all duration-200 shadow-xl disabled:opacity-50"
        >
          {loading ? "Saving to Catalog..." : isEditing ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
