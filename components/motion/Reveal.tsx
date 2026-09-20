"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 0.9,
  className = "",
  triggerOnce = true,
}: RevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
      return;
    }

    let initialX = 0;
    let initialY = 0;

    if (direction === "up") initialY = distance;
    else if (direction === "down") initialY = -distance;
    else if (direction === "left") initialX = distance;
    else if (direction === "right") initialX = -distance;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x: initialX,
          y: initialY,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: triggerOnce,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, direction, distance, duration, triggerOnce]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
