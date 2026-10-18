"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

export default function NotFound() {
  return (
    <div className="bg-obsidian text-porcelain min-h-screen flex items-center justify-center pt-20 pb-20">
      <Reveal direction="up" delay={0.1} className="max-w-md mx-auto px-6 text-center space-y-8">
        <div className="space-y-4 flex flex-col items-center">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-obsidian-deep border border-champagne-brass/40 p-1 mb-2 shadow-[0_0_25px_rgba(198,161,91,0.15)]">
            <Image
              src="/logo.png"
              alt="CuffKings Royal Monogram"
              fill
              sizes="64px"
              className="object-contain"
            />
          </div>
          <div className="inline-block border border-champagne-brass/30 px-6 py-2">
            <span className="text-3xl font-display text-champagne-brass">
              404
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display text-porcelain">
            Page not found
          </h1>
          <p className="text-sm text-porcelain/70 leading-relaxed">
            The piece or page you requested cannot be located.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Magnetic>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-champagne-brass text-obsidian text-sm font-medium border border-champagne-brass hover:bg-champagne-brass/90 transition-all duration-200"
            >
              Return home
            </Link>
          </Magnetic>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-transparent text-porcelain text-sm font-medium border border-champagne-brass/30 hover:border-champagne-brass hover:text-champagne-brass transition-all duration-200"
          >
            Explore collection
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
