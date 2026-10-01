"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ShopHeader() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } });

      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.7, ease: "power3.inOut" }
      )
        .fromTo(
          tagRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 55, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.0, ease: "power4.out" },
          "-=0.3"
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 25 },
          { opacity: 0.8, y: 0, duration: 0.8 },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-obsidian text-porcelain py-16 lg:py-24 border-b border-champagne-brass/20 overflow-hidden">
      <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl space-y-5">
          {/* Brass line */}
          <div
            ref={lineRef}
            className="h-px w-16 bg-champagne-brass"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          />

          {/* Tag */}
          <div
            ref={tagRef}
            className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase opacity-0"
          >
            Complete Collection
          </div>

          <h1
            ref={titleRef}
            className="text-h1 font-display leading-[1.05] opacity-0"
            style={{ willChange: "transform" }}
          >
            Every detail counts.
          </h1>
          <p
            ref={textRef}
            className="text-body text-porcelain/80 leading-relaxed max-w-2xl opacity-0"
          >
            Browse our complete collection of cufflinks. Polished metal, deep
            enamel, and precise engraving.
          </p>
        </div>
      </div>
    </div>
  );
}
