"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductTableProps {
  initialProducts: (Product & { _id: string })[];
}

export default function ProductTable({ initialProducts }: ProductTableProps) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVisibility, setSelectedVisibility] = useState<string>("all");
  const [deleteTarget, setDeleteTarget] = useState<(Product & { _id: string }) | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.material.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      p.category.toLowerCase() === selectedCategory.toLowerCase() ||
      p.categorySlug === selectedCategory.toLowerCase();

    const isPub = p.isPublished !== false;
    const matchesVisibility =
      selectedVisibility === "all" ||
      (selectedVisibility === "published" && isPub) ||
      (selectedVisibility === "draft" && !isPub);

    return matchesSearch && matchesCategory && matchesVisibility;
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
        const data = await res.json().catch(() => ({}));
        setActionError(data.error || "Failed to delete product");
        setDeleting(false);
        return;
      }

      setProducts((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      setDeleteTarget(null);
      showToast("Product deleted successfully.");
    } catch {
      setActionError("A network error occurred while deleting the product.");
    } finally {
      setDeleting(false);
    }
  };

  const handleTogglePublished = async (product: Product & { _id: string }) => {
    try {
      setActionError(null);
      const newPublished = product.isPublished === false ? true : false;
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: newPublished }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === product._id ? { ...p, isPublished: newPublished } : p
          )
        );
        showToast(
          newPublished
            ? `"${product.name}" published to storefront.`
            : `"${product.name}" moved to draft (hidden).`
        );
      } else {
        const data = await res.json().catch(() => ({}));
        setActionError(data.error || "Unable to update publication status.");
      }
    } catch {
      setActionError("Network error updating publication status.");
    }
  };

  const handleToggleFeatured = async (product: Product & { _id: string }) => {
    try {
      setActionError(null);
      const newFeatured = !product.featured;
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: newFeatured }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === product._id ? { ...p, featured: newFeatured } : p
          )
        );
        showToast(
          newFeatured
            ? `"${product.name}" marked as featured.`
            : `"${product.name}" standard listing.`
        );
      } else {
        const data = await res.json().catch(() => ({}));
        setActionError(data.error || "Failed to toggle featured status.");
      }
    } catch {
      setActionError("Network error updating product.");
    }
  };

  const getStockBadgeClass = (stockCount?: number, stockStatus?: string) => {
    const count = stockCount ?? 0;
    if (count === 0 || stockStatus === "out-of-stock") {
      return "bg-rose-950/60 text-rose-300 border-rose-800/60";
    }
    if (count <= 5 || stockStatus === "low-stock") {
      return "bg-amber-950/50 text-amber-300 border-amber-800/50";
    }
    return "bg-emerald-950/40 text-emerald-300 border-emerald-800/40";
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between shadow-lg">
          <span className="font-medium">✓ {toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-400 hover:text-emerald-200 text-sm ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {actionError && (
        <div className="p-3 bg-rose-950/70 border border-rose-600/60 text-rose-200 text-xs flex items-center justify-between shadow-lg">
          <span>✕ {actionError}</span>
          <button
            onClick={() => setActionError(null)}
            className="text-rose-400 hover:text-rose-200 text-sm ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center bg-[#101217] border border-white/10 p-3 sm:p-4">
        <div className="flex-1 w-full sm:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by piece name, SKU, or material..."
            className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 text-porcelain text-xs focus:outline-none focus:border-champagne-brass placeholder-porcelain/40"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto">
          {/* Collection Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-obsidian border border-white/10 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
          >
            <option value="all">All Tiers</option>
            <option value="classical">Classical</option>
            <option value="signature">Signature</option>
            <option value="premium">Premium</option>
          </select>

          {/* Visibility Filter */}
          <select
            value={selectedVisibility}
            onChange={(e) => setSelectedVisibility(e.target.value)}
            className="px-3 py-2 bg-obsidian border border-white/10 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
          >
            <option value="all">All Visibility</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>

          <span className="text-xs text-porcelain/50 font-mono pl-1">
            {filteredProducts.length} pieces
          </span>
        </div>
      </div>

      {/* MOBILE CARDS VIEW (< 640px) */}
      <div className="block sm:hidden space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-porcelain/40 bg-[#101217] border border-white/10 text-xs">
            No products match the selected criteria.
          </div>
        ) : (
          filteredProducts.map((p) => {
            const isPub = p.isPublished !== false;
            return (
              <div
                key={p._id}
                className="bg-[#101217] border border-white/10 p-3.5 space-y-3"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-14 h-14 relative bg-black border border-white/10 shrink-0 overflow-hidden">
                    {p.images && p.images[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                        unoptimized={p.images[0].startsWith("http") || p.images[0].startsWith("data:")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-porcelain/30">
                        N/A
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-1.5 py-0.5 border border-champagne-brass/30 text-champagne-brass text-[9px] uppercase font-sans">
                        {p.category}
                      </span>
                      <span className="text-xs font-mono font-medium text-champagne-brass">
                        Rs. {p.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="font-medium text-porcelain text-xs truncate mt-1">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-porcelain/40 font-mono mt-0.5">
                      SKU: {p.sku}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-block px-2 py-0.5 border text-[10px] font-mono ${getStockBadgeClass(
                        p.stockCount,
                        p.stockStatus
                      )}`}
                    >
                      {p.stockCount ?? 0} units
                    </span>

                    <button
                      type="button"
                      onClick={() => handleTogglePublished(p)}
                      className={`text-[9px] uppercase font-mono px-2 py-0.5 border transition-colors ${
                        isPub
                          ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/40"
                          : "bg-amber-950/40 text-amber-300 border-amber-500/40"
                      }`}
                    >
                      {isPub ? "● Live" : "○ Draft"}
                    </button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/admin/products/${p._id}/edit`}
                      className="text-champagne-brass text-xs uppercase tracking-wider font-medium hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(p)}
                      className="text-rose-400 text-xs uppercase tracking-wider hover:text-rose-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DESKTOP/TABLET TABLE (>= 640px) */}
      <div className="hidden sm:block bg-[#101217] border border-white/10 overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[740px]">
          <thead>
            <tr className="border-b border-white/10 text-champagne-brass uppercase tracking-widest font-sans bg-black/40">
              <th className="py-3.5 px-4 font-medium">Piece Name & SKU</th>
              <th className="py-3.5 px-4 font-medium">Collection</th>
              <th className="py-3.5 px-4 font-medium">Price</th>
              <th className="py-3.5 px-4 font-medium">Stock</th>
              <th className="py-3.5 px-4 font-medium text-center">Visibility</th>
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
                const stockBadge = getStockBadgeClass(p.stockCount, p.stockStatus);
                const isPub = p.isPublished !== false;

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
                              unoptimized={p.images[0].startsWith("http") || p.images[0].startsWith("data:")}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[9px] text-porcelain/30">
                              N/A
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-porcelain truncate max-w-[200px] lg:max-w-[260px]">
                            {p.name}
                          </p>
                          <p className="text-[10px] text-porcelain/40 font-mono">
                            SKU: {p.sku} • /{p.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 border border-champagne-brass/30 text-champagne-brass text-[10px] uppercase font-sans">
                        {p.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-medium text-porcelain">
                      Rs. {p.price.toLocaleString()}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 border text-[10px] font-mono ${stockBadge}`}>
                        {p.stockCount ?? 0} units
                      </span>
                    </td>

                    {/* Visibility Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleTogglePublished(p)}
                        className={`inline-flex items-center px-2 py-0.5 border text-[10px] font-mono uppercase tracking-wider transition-colors ${
                          isPub
                            ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60"
                            : "bg-amber-950/40 text-amber-300 border-amber-500/40 hover:bg-amber-900/60"
                        }`}
                        title={isPub ? "Click to set as draft (hidden)" : "Click to publish to storefront"}
                      >
                        {isPub ? "● Published" : "○ Draft"}
                      </button>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(p)}
                        className={`w-7 h-4 rounded-full transition-colors relative inline-block ${
                          p.featured ? "bg-champagne-brass" : "bg-white/20"
                        }`}
                        title={p.featured ? "Featured on homepage (click to unset)" : "Standard listing (click to feature)"}
                      >
                        <span
                          className={`w-3 h-3 rounded-full bg-obsidian absolute top-0.5 transition-transform ${
                            p.featured ? "left-3.5" : "left-0.5"
                          }`}
                        />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center space-x-3">
                        <Link
                          href={`/admin/products/${p._id}/edit`}
                          className="text-champagne-brass hover:underline uppercase text-[11px] tracking-wider font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(p)}
                          className="text-rose-400 hover:text-rose-300 uppercase text-[11px] tracking-wider transition-colors"
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

      {/* Confirmation Dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121318] border border-rose-800/60 p-5 sm:p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-display text-porcelain">Confirm Product Deletion</h3>
            <p className="text-xs text-porcelain/70 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-porcelain">{deleteTarget.name}</strong> (SKU:{" "}
              {deleteTarget.sku})? This record will be removed from the catalog. Historical customer orders will preserve their item snapshot details.
            </p>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-2.5 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 border border-white/20 text-porcelain text-xs uppercase tracking-wider hover:bg-white/5 transition-colors text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs uppercase tracking-wider font-medium transition-colors disabled:opacity-50 text-center"
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
