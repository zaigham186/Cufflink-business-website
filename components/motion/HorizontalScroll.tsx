"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export default function HorizontalScroll({
  children,
  className = "",
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;
    const track = trackRef.current;
    if (!container || !pinWrapper || !track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 1024;

    // Do not pin on mobile or reduced motion
    if (prefersReducedMotion || isMobile) return;

    const ctx = gsap.context(() => {
      const scrollDistance = track.scrollWidth - window.innerWidth;

      if (scrollDistance > 0) {
        gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: pinWrapper, // Pin inner wrapper, NOT the root container!
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            anticipatePin: 1,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <div ref={pinWrapperRef} className="w-full">
        {/* 
          Desktop: flex row transformed by GSAP
          Mobile: native horizontal scrollable container with snap
        */}
        <div
          ref={trackRef}
          className="flex w-max lg:h-screen items-center overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scrollbar-none"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
