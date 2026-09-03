"use client";

import { useState } from "react";
import Image from "next/image";
import ProductPlaceholder from "@/components/ui/ProductPlaceholder";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  hasPhotography: boolean;
}

export default function ImageGallery({
  images,
  productName,
  hasPhotography,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square bg-white border border-antique-brass/30 overflow-hidden">
        {hasPhotography ? (
          <Image
            src={images[selectedImage]}
            alt={`${productName} - View ${selectedImage + 1}`}
            width={800}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
        ) : (
          <ProductPlaceholder />
        )}
      </div>

      {/* Thumbnails */}
      {hasPhotography && images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square border overflow-hidden transition-all ${
                selectedImage === index
                  ? "border-ink-green"
                  : "border-antique-brass/30 hover:border-antique-brass"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
