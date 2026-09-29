"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // 0.1 = slow, 0.5 = medium, 1 = fast
  direction?: "up" | "down";
  className?: string;
}

/**
 * Parallax — applies a scroll-linked vertical translate to its children.
 */
export default function Parallax({
  children,
  speed = 0.3,
  direction = "up",
  className = "",
}: ParallaxProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const yPercent = direction === "up" ? -speed * 100 : speed * 100;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <div ref={elRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
