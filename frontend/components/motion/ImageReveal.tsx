"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  scale?: boolean;
  className?: string;
  triggerOnce?: boolean;
}

export default function ImageReveal({
  children,
  direction = "up",
  duration = 1.2,
  delay = 0,
  scale = true,
  className = "",
  triggerOnce = true,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(container, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(inner, { scale: 1 });
      return;
    }

    let initialClip = "inset(0% 0% 100% 0%)"; // up
    if (direction === "down") initialClip = "inset(100% 0% 0% 0%)";
    else if (direction === "left") initialClip = "inset(0% 100% 0% 0%)";
    else if (direction === "right") initialClip = "inset(0% 0% 0% 100%)";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: triggerOnce,
        },
      });

      tl.fromTo(
        container,
        { clipPath: initialClip },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration,
          delay,
          ease: "power4.out",
        }
      );

      if (scale) {
        tl.fromTo(
          inner,
          { scale: 1.08 },
          {
            scale: 1,
            duration: duration * 1.1,
            ease: "power3.out",
          },
          "<"
        );
      }
    }, container);

    return () => ctx.revert();
  }, [direction, duration, delay, scale, triggerOnce]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative ${className}`}
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div ref={innerRef} className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
