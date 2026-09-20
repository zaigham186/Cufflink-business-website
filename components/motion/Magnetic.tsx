"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number; // 0.1 to 0.4 recommended
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: MagneticProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReducedMotion) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Restrict max pull to 10px
      const clampedX = Math.max(-10, Math.min(10, deltaX));
      const clampedY = Math.max(-10, Math.min(10, deltaY));

      xTo(clampedX);
      yTo(clampedY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <div ref={elRef} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}
