"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  decimals?: number;
  className?: string;
}

/**
 * CountUp — animates a number from 0 to target when scrolled into view.
 */
export default function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  delay = 0,
  decimals = 0,
  className = "",
}: CountUpProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      return;
    }

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            triggered.current = true;
          },
        },
      });
    }, el);

    return () => ctx.revert();
  }, [target, suffix, prefix, duration, delay, decimals]);

  return (
    <span ref={elRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
