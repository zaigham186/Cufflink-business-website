"use client";

import Marquee from "@/components/motion/Marquee";

const tickerItems = [
  "Classical Collection",
  "Signature Collection",
  "Premium Collection",
  "Crafted in Pakistan",
  "Polished Metal",
  "Deep Mineral Enamel",
  "Crystal Pavé",
  "Fine Engraving",
  "Toggle Backings",
  "Black-Tie Ready",
];

export default function BrandTicker() {
  return (
    <div className="bg-champagne-brass text-obsidian py-3 border-y border-champagne-brass/20 overflow-hidden">
      <Marquee
        items={tickerItems}
        speed={70}
        separator="✦"
        className="text-xs font-medium tracking-[0.2em] uppercase"
      />
    </div>
  );
}
