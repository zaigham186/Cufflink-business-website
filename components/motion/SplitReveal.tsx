"use client";

import { useEffect, useRef, ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitBy?: "words" | "chars";
  triggerStart?: string;
}

/**
 * SplitReveal — splits text into spans and reveals them with a GSAP stagger.
 * Works entirely with vanilla GSAP (no paid SplitText plugin needed).
 */
export default function SplitReveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.04,
  splitBy = "words",
  triggerStart = "top 82%",
}: SplitRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    // Split into spans
    const text = el.textContent || "";
    let parts: string[] = [];

    if (splitBy === "chars") {
      parts = text.split("");
    } else {
      // words — split by space but preserve spaces
      parts = text.split(/(\s+)/);
    }

    // Build inner HTML
    const html = parts
      .map((part) => {
        if (/^\s+$/.test(part)) return part; // preserve whitespace
        return `<span class="split-unit" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="split-inner" style="display:inline-block">${part}</span></span>`;
      })
      .join("");

    el.innerHTML = html;

    const inners = el.querySelectorAll<HTMLElement>(".split-inner");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inners,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: triggerStart,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [children, delay, duration, stagger, splitBy, triggerStart]);

  const Tag2 = Tag as ElementType;
  return (
    <Tag2 ref={containerRef} className={className}>
      {children}
    </Tag2>
  );
}
