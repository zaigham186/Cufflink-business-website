"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

/**
 * Senior Developer Utility: Client-side image pre-compression.
 * Resizes large camera photos down to 1600px max dimension and converts to WebP/JPEG,
 * dramatically speeding up network uploads and saving database storage.
 */
async function optimizeImageForUpload(file: File): Promise<File> {
  // If the file is SVG or small GIF, don't re-encode
  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const MAX_WIDTH = 1600;
        const MAX_HEIGHT = 1600;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return resolve(file); // Fallback to raw file
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Prefer modern WebP format
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file);
            const optimizedFile = new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(optimizedFile);
          },
          "image/webp",
          0.88
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [manualPath, setManualPath] = useState("");
  const [showManualPathInput, setShowManualPathInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Process files from native file picker or drag & drop
  const handleUploadFiles = async (files: FileList | File[]) => {
    setError(null);
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length === 0) {
      setError("Please select valid image files (JPG, PNG, WEBP, or AVIF).");
      return;
    }

    setIsUploading(true);
    setUploadProgress(`Optimizing ${validFiles.length} image(s)...`);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < validFiles.length; i++) {
        const rawFile = validFiles[i];
        setUploadProgress(`Processing ${i + 1} of ${validFiles.length}: ${rawFile.name}`);

        // Client-side optimization
        const optimizedFile = await optimizeImageForUpload(rawFile);

        const formData = new FormData();
        formData.append("file", optimizedFile);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Upload failed for ${rawFile.name}`);
        }

        const data = await res.json();
        if (data.urls && data.urls[0]) {
          uploadedUrls.push(data.urls[0]);
        }
      }

      // Append newly uploaded images to existing list
      onChange([...images, ...uploadedUrls]);
      setUploadProgress(null);
    } catch (err: any) {
      console.error("Manual image upload failed:", err);
      setError(err.message || "Failed to upload images. Please check your connection.");
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUploadFiles(e.target.files);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUploadFiles(e.dataTransfer.files);
    }
  };

  // 2. Organization controls
  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    onChange(updated);
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onChange(updated);
  };

  // 3. Fallback for manual catalog path
  const handleAddManualPath = () => {
    const trimmed = manualPath.trim();
    if (!trimmed) return;
    if (images.includes(trimmed)) {
      setError("This image path is already attached.");
      return;
    }
    onChange([...images, trimmed]);
    setManualPath("");
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Manual Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed p-8 sm:p-12 text-center transition-all cursor-pointer group ${
          isDragging
            ? "border-champagne-brass bg-champagne-brass/10 scale-[1.005]"
            : "border-champagne-brass/30 bg-black/40 hover:border-champagne-brass/70 hover:bg-white/[0.02]"
        } ${isUploading ? "opacity-60 pointer-events-none" : ""}`}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          {/* Luxury Upload Icon */}
          <div className="w-14 h-14 rounded-full bg-champagne-brass/10 border border-champagne-brass/30 flex items-center justify-center text-champagne-brass group-hover:scale-110 transition-transform duration-300">
            {isUploading ? (
              <svg
                className="animate-spin h-6 w-6 text-champagne-brass"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>

          <div>
            <p className="text-sm font-display uppercase tracking-widest text-porcelain">
              {isUploading ? "Uploading to Atelier..." : "Upload Product Photographs"}
            </p>
            <p className="text-xs text-porcelain/60 mt-1 font-sans">
              Drag and drop high-resolution images here, or{" "}
              <span className="text-champagne-brass underline underline-offset-4 font-medium">
                browse your device
              </span>
            </p>
          </div>

          <p className="text-[10px] tracking-wider text-porcelain/40 uppercase font-mono">
            Direct database upload • JPG, PNG, WEBP up to 10MB • Auto-optimized
          </p>

          {uploadProgress && (
            <div className="pt-2 text-xs text-champagne-brass font-mono flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-champagne-brass animate-ping" />
              <span>{uploadProgress}</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-center justify-between">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-200 ml-4 font-mono text-[10px]"
          >
            ✕ Dismiss
          </button>
        </div>
      )}

      {/* Uploaded Gallery Grid */}
      {images.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest text-champagne-brass font-display">
              Selected Imagery ({images.length} {images.length === 1 ? "Photo" : "Photos"})
            </h3>
            <span className="text-[11px] text-porcelain/50">
              The first photo is the primary storefront card thumbnail
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, idx) => {
              const isPrimary = idx === 0;
              return (
                <div
                  key={`${img}-${idx}`}
                  className={`bg-white/5 border p-3 flex flex-col justify-between space-y-3 relative transition-colors ${
                    isPrimary
                      ? "border-champagne-brass bg-champagne-brass/[0.04]"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-20 h-20 relative bg-black/60 border border-white/10 shrink-0 overflow-hidden">
                      <Image
                        src={img}
                        alt={`Product Photo ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized={img.startsWith("http") || img.startsWith("data:")}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 uppercase tracking-wider ${
                            isPrimary
                              ? "bg-champagne-brass text-obsidian font-bold"
                              : "bg-white/10 text-porcelain/70"
                          }`}
                        >
                          {isPrimary ? "★ Primary Cover" : `Angle #${idx + 1}`}
                        </span>
                      </div>

                      <p
                        className="text-[11px] font-mono text-porcelain/80 truncate mt-1.5"
                        title={img}
                      >
                        {img}
                      </p>

                      {!isPrimary && (
                        <button
                          type="button"
                          onClick={() => handleSetPrimary(idx)}
                          className="mt-2 text-[10px] uppercase tracking-wider text-champagne-brass hover:underline inline-block font-mono"
                        >
                          Make Primary Cover
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Actions & Reordering */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={() => handleMove(idx, idx - 1)}
                        disabled={idx === 0}
                        className="px-2 py-1 bg-white/5 hover:bg-white/15 text-porcelain/70 disabled:opacity-20 text-[10px]"
                        title="Move left"
                      >
                        ← Left
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(idx, idx + 1)}
                        disabled={idx === images.length - 1}
                        className="px-2 py-1 bg-white/5 hover:bg-white/15 text-porcelain/70 disabled:opacity-20 text-[10px]"
                        title="Move right"
                      >
                        Right →
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(idx)}
                      className="text-[10px] text-red-400 hover:text-red-300 uppercase tracking-wider font-mono transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-6 border border-white/10 text-center text-xs text-porcelain/40">
          No product images uploaded yet. Drop photos above to attach them to this product.
        </div>
      )}

      {/* Optional: Collapsible Existing Catalog Path Input */}
      <div className="pt-2 border-t border-white/10">
        <button
          type="button"
          onClick={() => setShowManualPathInput(!showManualPathInput)}
          className="text-[11px] text-porcelain/50 hover:text-champagne-brass transition-colors flex items-center space-x-1 uppercase tracking-wider font-mono"
        >
          <span>{showManualPathInput ? "▼" : "▶"}</span>
          <span>Or link an existing bundled image path (e.g. /products/classic1.jpeg)</span>
        </button>

        {showManualPathInput && (
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={manualPath}
              onChange={(e) => setManualPath(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddManualPath();
                }
              }}
              placeholder="/products/classic1.jpeg or https://..."
              className="flex-1 px-4 py-2 bg-black/40 border border-white/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass font-mono"
            />
            <button
              type="button"
              onClick={handleAddManualPath}
              className="px-4 py-2 border border-champagne-brass/40 text-champagne-brass text-xs uppercase tracking-wider hover:bg-champagne-brass/10"
            >
              + Attach Path
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
