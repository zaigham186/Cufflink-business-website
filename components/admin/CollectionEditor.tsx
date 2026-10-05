"use client";

import { useState } from "react";

interface CollectionItem {
  tier: "Classical" | "Signature" | "Premium";
  priceRangeLabel: string;
  description: string;
}

interface CollectionEditorProps {
  initialCollections: CollectionItem[];
}

export default function CollectionEditor({ initialCollections }: CollectionEditorProps) {
  const [collections, setCollections] = useState<CollectionItem[]>(initialCollections);
  const [savingTier, setSavingTier] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ tier: string; message: string; isError?: boolean } | null>(null);

  const handleChange = (tier: string, field: "priceRangeLabel" | "description", value: string) => {
    setCollections((prev) =>
      prev.map((c) => (c.tier === tier ? { ...c, [field]: value } : c))
    );
  };

  const handleSave = async (item: CollectionItem) => {
    setSavingTier(item.tier);
    setFeedback(null);

    try {
      const res = await fetch("/api/collections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) {
        const data = await res.json();
        setFeedback({ tier: item.tier, message: data.error || "Save failed", isError: true });
        setSavingTier(null);
        return;
      }

      setFeedback({ tier: item.tier, message: "Settings saved successfully!" });
    } catch {
      setFeedback({ tier: item.tier, message: "Network error occurred", isError: true });
    } finally {
      setSavingTier(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {collections.map((item) => {
        const isSaving = savingTier === item.tier;
        const currentFeedback = feedback?.tier === item.tier ? feedback : null;

        return (
          <div
            key={item.tier}
            className="bg-white/5 border border-champagne-brass/25 p-4 sm:p-6 flex flex-col justify-between space-y-4 sm:space-y-6"
          >
            <div className="space-y-4">
              <div className="border-b border-champagne-brass/20 pb-3 flex items-center justify-between">
                <h2 className="font-display text-lg text-porcelain tracking-wide">
                  {item.tier} Tier
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-champagne-brass/80 font-sans">
                  Tier Configuration
                </span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
                  Price Range Label
                </label>
                <input
                  type="text"
                  value={item.priceRangeLabel}
                  onChange={(e) => handleChange(item.tier, "priceRangeLabel", e.target.value)}
                  placeholder="e.g. Rs. 700–800"
                  className="w-full px-3 py-2 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
                  Collection Editorial Description
                </label>
                <textarea
                  rows={4}
                  value={item.description}
                  onChange={(e) => handleChange(item.tier, "description", e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass leading-relaxed"
                />
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10">
              {currentFeedback && (
                <p
                  className={`text-[11px] ${
                    currentFeedback.isError ? "text-red-300" : "text-emerald-300"
                  }`}
                >
                  {currentFeedback.isError ? "✕" : "✓"} {currentFeedback.message}
                </p>
              )}

              <button
                type="button"
                onClick={() => handleSave(item)}
                disabled={isSaving}
                className="w-full py-2.5 bg-champagne-brass text-obsidian text-xs uppercase tracking-widest font-medium hover:bg-champagne-brass/90 transition-all duration-200 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : `Save ${item.tier}`}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
