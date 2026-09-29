"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });

      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "center" },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" }
      )
        .fromTo(
          tagRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 60, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: "power4.out" },
          "-=0.3"
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-obsidian pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Brass line */}
          <div
            ref={lineRef}
            className="h-px w-20 bg-champagne-brass mx-auto"
            style={{ transform: "scaleX(0)", transformOrigin: "center" }}
          />

          <div className="inline-block">
            <span
              ref={tagRef}
              className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase opacity-0"
            >
              CuffKings Peshawar
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-display text-porcelain leading-tight opacity-0"
            style={{ willChange: "transform" }}
          >
            Get in touch
          </h1>
          <p
            ref={textRef}
            className="text-lg text-porcelain/75 leading-relaxed max-w-2xl mx-auto opacity-0"
          >
            For order confirmations, custom requests, and product inquiries. We
            respond directly via WhatsApp and email.
          </p>
        </div>
      </div>
    </section>
  );
}
