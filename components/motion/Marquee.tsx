"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MarqueeProps {
  items: string[];
  speed?: number; // pixels per second
  className?: string;
  separator?: string;
}

/**
 * Marquee — an infinitely scrolling horizontal text ticker powered by GSAP.
 */
export default function Marquee({
  items,
  speed = 80,
  className = "",
  separator = "·",
}: MarqueeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!wrapper || !track1 || !track2) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Position track2 immediately after track1
    gsap.set(track2, { x: track1.offsetWidth });

    const duration = track1.offsetWidth / speed;

    const tl1 = gsap.to(track1, {
      x: -track1.offsetWidth,
      duration,
      ease: "none",
      repeat: -1,
    });

    const tl2 = gsap.to(track2, {
      x: 0,
      duration,
      ease: "none",
      repeat: -1,
    });

    // Pause on hover for accessibility
    const pause = () => { tl1.pause(); tl2.pause(); };
    const resume = () => { tl1.resume(); tl2.resume(); };

    wrapper.addEventListener("mouseenter", pause);
    wrapper.addEventListener("mouseleave", resume);

    return () => {
      tl1.kill();
      tl2.kill();
      wrapper.removeEventListener("mouseenter", pause);
      wrapper.removeEventListener("mouseleave", resume);
    };
  }, [speed]);

  const content = items
    .map((item) => `${item}  ${separator}  `)
    .join("");

  return (
    <div
      ref={wrapperRef}
      className={`overflow-hidden whitespace-nowrap select-none relative ${className}`}
      aria-hidden="true"
    >
      <div className="inline-flex">
        <div ref={track1Ref} className="inline-block">
          {content}
        </div>
        <div ref={track2Ref} className="inline-block absolute top-0 left-0">
          {content}
        </div>
      </div>
    </div>
  );
}
