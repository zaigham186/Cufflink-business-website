"use client";

import Marquee from "@/components/motion/Marquee";

const tickerItems = [
  "SOLID BRASS CONSTRUCTION",
  "NATIONWIDE CASH ON DELIVERY",
  "CLASSICAL, SIGNATURE & PREMIUM",
  "PESHAWAR, PAKISTAN",
  "FREE DELIVERY OVER RS. 3,000",
  "HAND-INSPECTED BEFORE DISPATCH",
];

export default function BrandTicker() {
  return (
    <div className="bg-champagne-brass text-obsidian py-3 border-y border-champagne-brass/20 overflow-hidden">
      <Marquee
        items={tickerItems}
        speed={65}
        separator="•"
        className="text-xs font-medium tracking-[0.2em] uppercase font-sans"
      />
    </div>
  );
}
