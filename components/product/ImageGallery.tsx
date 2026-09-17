"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const displayImages = images.length > 0 ? images : ["/products/ivory-pave-gold-1.jpg"];

  return (
    <div className="space-y-4">
      {/* Primary Image View */}
      <div className="relative aspect-square w-full bg-obsidian border border-champagne-brass/25 overflow-hidden">
        <Image
          src={displayImages[selectedIndex]}
          alt={`${productName} view ${selectedIndex + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />

        {/* Mobile Swipe / Arrow Controls if multiple images */}
        {displayImages.length > 1 && (
          <div className="lg:hidden absolute bottom-3 right-3 flex space-x-2 z-10">
            <button
              type="button"
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === 0 ? displayImages.length - 1 : prev - 1
                )
              }
              className="w-9 h-9 bg-obsidian/90 text-porcelain border border-champagne-brass/30 flex items-center justify-center text-xs"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === displayImages.length - 1 ? 0 : prev + 1
                )
              }
              className="w-9 h-9 bg-obsidian/90 text-porcelain border border-champagne-brass/30 flex items-center justify-center text-xs"
              aria-label="Next image"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail Nav */}
      {displayImages.length > 1 && (
        <div className="flex gap-3">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 bg-obsidian overflow-hidden border transition-all ${
                selectedIndex === idx
                  ? "border-champagne-brass ring-1 ring-champagne-brass"
                  : "border-warm-charcoal/20 opacity-70 hover:opacity-100"
              }`}
              aria-label={`Select image ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
