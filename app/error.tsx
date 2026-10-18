"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Magnetic from "@/components/motion/Magnetic";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Storefront runtime error:", error);
  }, [error]);

  return (
    <div className="bg-obsidian text-porcelain min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="max-w-md mx-auto px-6 text-center space-y-8">
        <div className="space-y-4 flex flex-col items-center">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-obsidian-deep border border-champagne-brass/40 p-1 mb-2 shadow-[0_0_20px_rgba(198,161,91,0.12)]">
            <Image
              src="/logo.png"
              alt="CuffKings Royal Monogram"
              fill
              sizes="56px"
              className="object-contain"
            />
          </div>
          <div className="inline-block border border-champagne-brass/30 px-6 py-2">
            <span className="text-sm font-mono uppercase tracking-widest text-champagne-brass">
              Atelier Notice
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display text-porcelain">
            Something unexpected occurred
          </h1>
          <p className="text-sm text-porcelain/70 leading-relaxed">
            We were unable to load this page right now. Please attempt to refresh the connection or return to our catalog.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Magnetic>
            <button
              onClick={() => reset()}
              className="inline-block px-8 py-3 bg-champagne-brass text-obsidian text-sm font-medium border border-champagne-brass hover:bg-champagne-brass/90 transition-all duration-200"
            >
              Try again
            </button>
          </Magnetic>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-transparent text-porcelain text-sm font-medium border border-champagne-brass/30 hover:border-champagne-brass hover:text-champagne-brass transition-all duration-200"
          >
            Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
