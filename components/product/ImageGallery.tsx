"use client";

import { useState } from "react";
import Image from "next/image";
import ProductMedia from "@/components/product/ProductMedia";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  video?: string;
}

export default function ImageGallery({
  images,
  productName,
  video,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const displayImages =
    images && images.length > 0 ? images : ["/products/ivory-pave-gold-1.jpg"];

  return (
    <div className="space-y-4">
      {/* Primary View: Video or Ken Burns Crossfade */}
      <ProductMedia
        images={displayImages}
        productName={productName}
        video={video}
        aspectRatio="aspect-square"
        activeImageIndex={selectedIndex}
        onAngleChange={(newIdx) => setSelectedIndex(newIdx)}
        priority
      />

      {/* Mobile Swipe / Arrow Controls if multiple images */}
      {displayImages.length > 1 && (
        <div className="flex lg:hidden justify-between items-center text-xs text-warm-charcoal/60 px-1">
          <span>Angle {selectedIndex + 1} of {displayImages.length}</span>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === 0 ? displayImages.length - 1 : prev - 1
                )
              }
              className="w-8 h-8 bg-obsidian text-porcelain border border-champagne-brass/30 flex items-center justify-center text-xs"
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
              className="w-8 h-8 bg-obsidian text-porcelain border border-champagne-brass/30 flex items-center justify-center text-xs"
              aria-label="Next image"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Thumbnail Nav */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 pt-2">
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
              aria-label={`Select angle ${idx + 1}`}
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
