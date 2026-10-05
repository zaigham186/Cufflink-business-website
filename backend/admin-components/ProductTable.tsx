"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product, Collection } from "@/shared/types/product";

interface ProductTableProps {
  initialProducts: (Product & { _id: string })[];
}

export default function ProductTable({ initialProducts }: ProductTableProps) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deleteTarget, setDeleteTarget] = useState<(Product & { _id: string }) | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      p.category.toLowerCase() === selectedCategory.toLowerCase() ||
      p.categorySlug === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setActionError(null);

    try {
      const res = await fetch(`/api/products/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        setActionError(data.error || "Failed to delete product");
        setDeleting(false);
        return;
      }

      setProducts((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch {
      setActionError("A network error occurred while deleting the product.");
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleFeatured = async (product: Product & { _id: string }) => {
    try {
      const newFeatured = !product.featured;
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: newFeatured, isFeatured: newFeatured }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === product._id ? { ...p, featured: newFeatured, isFeatured: newFeatured } : p
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle featured status:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white/5 border border-champagne-brass/20 p-4">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, material, or SKU..."
            className="w-full px-4 py-2 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass placeholder-porcelain/40"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-obsidian border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
          >
            <option value="all">All Collections</option>
            <option value="classical">Classical</option>
            <option value="signature">Signature</option>
            <option value="premium">Premium</option>
          </select>

          <span className="text-xs text-porcelain/60 whitespace-nowrap font-mono">
            {filteredProducts.length} items
          </span>
        </div>
      </div>

      {actionError && (
        <div className="p-3 bg-red-950/60 border border-deep-wine/60 text-red-300 text-xs">
          {actionError}
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white/5 border border-champagne-brass/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-champagne-brass/20 text-champagne-brass uppercase tracking-widest font-sans bg-black/40">
              <th className="py-3.5 px-4 font-medium">Piece</th>
              <th className="py-3.5 px-4 font-medium">Collection</th>
              <th className="py-3.5 px-4 font-medium">SKU</th>
              <th className="py-3.5 px-4 font-medium">Price</th>
              <th className="py-3.5 px-4 font-medium">Stock Status</th>
              <th className="py-3.5 px-4 font-medium text-center">Featured</th>
              <th className="py-3.5 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-porcelain/80">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-porcelain/40">
                  No products matched the active criteria.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => {
                const stockColor =
                  p.stockCount === 0 || p.stockStatus === "out-of-stock"
                    ? "bg-red-950/50 text-red-300 border-red-500/40"
                    : (p.stockCount ?? 10) <= 5 || p.stockStatus === "low-stock"
                    ? "bg-amber-950/40 text-amber-200 border-amber-500/40"
                    : "bg-emerald-950/30 text-emerald-300 border-emerald-500/30";

                return (
                  <tr key={p._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 relative bg-black border border-white/10 shrink-0 overflow-hidden">
                          {p.images && p.images[0] ? (
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[9px] text-porcelain/30">
                              N/A
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-porcelain truncate max-w-[220px]">
                            {p.name}
                          </p>
                          <p className="text-[10px] text-porcelain/40 font-mono">
                            /{p.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 border border-champagne-brass/30 text-champagne-brass text-[10px] uppercase font-sans">
                        {p.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-porcelain/70">
                      {p.sku}
                    </td>

                    <td className="py-3 px-4 font-mono">
                      Rs. {p.price.toLocaleString()}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 border text-[10px] font-mono ${stockColor}`}
                      >
                        {p.stockCount ?? 10} units
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(p)}
                        className={`w-7 h-4 rounded-full transition-colors relative inline-block ${
                          p.featured ? "bg-champagne-brass" : "bg-white/20"
                        }`}
                        title={p.featured ? "Featured on homepage" : "Not featured"}
                      >
                        <span
                          className={`w-3 h-3 rounded-full bg-obsidian absolute top-0.5 transition-transform ${
                            p.featured ? "left-3.5" : "left-0.5"
                          }`}
                        />
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center space-x-3">
                        <Link
                          href={`/admin/products/${p._id}/edit`}
                          className="text-champagne-brass hover:underline uppercase text-[11px] tracking-wider"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(p)}
                          className="text-red-400 hover:text-red-300 uppercase text-[11px] tracking-wider transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-obsidian border border-deep-wine/60 p-6 max-w-md w-full space-y-5 shadow-2xl">
            <h3 className="text-lg font-display text-porcelain">Confirm Deletion</h3>
            <p className="text-xs text-porcelain/70 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-porcelain">{deleteTarget.name}</strong> (SKU:{" "}
              {deleteTarget.sku})? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 border border-white/20 text-porcelain text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-medium transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
