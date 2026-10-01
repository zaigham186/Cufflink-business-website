"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      // Check hover targets for custom labels
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      const linkOrButton = target.closest("a, button, [role='button']");
      const productCard = target.closest(".product-card, [data-product-card]");
      const editorialMedia = target.closest("[data-editorial-media]");

      if (cursorTarget) {
        const label = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(label);
        setIsExpanded(true);
      } else if (productCard) {
        setCursorText("View");
        setIsExpanded(true);
      } else if (editorialMedia) {
        setCursorText("Explore");
        setIsExpanded(true);
      } else if (linkOrButton) {
        setCursorText("");
        setIsExpanded(true);
      } else {
        setCursorText("");
        setIsExpanded(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } hidden lg:block`}
      aria-hidden="true"
    >
      {/* Precision center dot */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-champagne-brass rounded-full pointer-events-none"
      />

      {/* Outer Follower Ring / Expanded Label Badge */}
      <div
        ref={cursorRingRef}
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center transition-all duration-200 ${
          isExpanded
            ? cursorText
              ? "w-16 h-16 bg-obsidian/90 border border-champagne-brass text-champagne-brass text-[10px] tracking-wider uppercase font-medium shadow-lg"
              : "w-10 h-10 border border-champagne-brass/60 bg-champagne-brass/10"
            : "w-8 h-8 border border-champagne-brass/40"
        }`}
      >
        {cursorText && (
          <span className="select-none animate-fadeIn">{cursorText}</span>
        )}
      </div>
    </div>
  );
}
