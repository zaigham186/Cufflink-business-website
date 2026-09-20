"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Skip on initial page mount so page load isn't blocked or flash
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const overlay = overlayRef.current;
    const line = lineRef.current;
    if (!overlay || !line) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
    });

    // Make visible and non-blocking
    tl.set(overlay, { display: "block", pointerEvents: "all" })
      .set(line, { scaleX: 0, opacity: 0 })
      // Obsidian curtain wipes in from top
      .fromTo(
        overlay,
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 0.35 }
      )
      // Champagne Brass hairline draws across
      .to(line, { scaleX: 1, opacity: 1, duration: 0.25, ease: "power2.out" })
      // Obsidian curtain wipes out to bottom
      .to(overlay, {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.35,
        delay: 0.1,
      })
      .set(overlay, { display: "none", pointerEvents: "none" });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9990] bg-obsidian pointer-events-none hidden"
      aria-hidden="true"
      style={{ transform: "scaleY(0)" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={lineRef}
          className="w-full max-w-md h-[1px] bg-champagne-brass"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
