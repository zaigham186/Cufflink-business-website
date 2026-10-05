"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [newPath, setNewPath] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    setError(null);
    const trimmed = newPath.trim();
    if (!trimmed) return;

    if (!trimmed.startsWith("/") && !trimmed.startsWith("http")) {
      setError("Path should start with '/' (e.g. /products/classic1.jpeg) or be a full URL.");
      return;
    }

    if (images.includes(trimmed)) {
      setError("Image path already in list.");
      return;
    }

    onChange([...images, trimmed]);
    setNewPath("");
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newPath}
          onChange={(e) => setNewPath(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="/products/classic1.jpeg or image URL"
          className="flex-1 px-4 py-2.5 bg-white/5 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2.5 bg-champagne-brass text-obsidian text-xs uppercase tracking-wider font-medium hover:bg-champagne-brass/90 transition-colors whitespace-nowrap"
        >
          + Add Image Path
        </button>
      </div>

      {error && <p className="text-[11px] text-red-300">{error}</p>}

      {/* Image list */}
      {images.length === 0 ? (
        <div className="p-6 border border-dashed border-champagne-brass/20 text-center text-xs text-porcelain/40">
          No images added yet. At least one image is required.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div
              key={`${img}-${idx}`}
              className="bg-white/5 border border-champagne-brass/20 p-3 flex flex-col justify-between space-y-3 relative group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 relative bg-black/40 border border-white/10 shrink-0 overflow-hidden">
                  <Image
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized={img.startsWith("http")}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-champagne-brass/20 text-champagne-brass uppercase">
                      {idx === 0 ? "Primary" : `#${idx + 1}`}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-porcelain/70 truncate mt-1" title={img}>
                    {img}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => handleMove(idx, idx - 1)}
                    disabled={idx === 0}
                    className="px-2 py-1 bg-white/5 hover:bg-white/15 text-porcelain/70 disabled:opacity-20 text-[10px]"
                    title="Move forward"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, idx + 1)}
                    disabled={idx === images.length - 1}
                    className="px-2 py-1 bg-white/5 hover:bg-white/15 text-porcelain/70 disabled:opacity-20 text-[10px]"
                    title="Move backward"
                  >
                    →
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="text-[11px] text-red-400 hover:text-red-300 uppercase tracking-wider transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
