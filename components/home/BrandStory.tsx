"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax background tint on scroll
      gsap.to(bgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Main content timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      tl
        // Tag fades in
        .fromTo(
          tagRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        )
        // Brass line draws in
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.3"
        )
        // Title rises with slight skew
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 55, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: "power4.out" },
          "-=0.5"
        )
        // Body text
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 0.9, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.7"
        );

      // Pull quote appears
      gsap.fromTo(
        quoteRef.current,
        {
          opacity: 0,
          x: -30,
          clipPath: "inset(0% 100% 0% 0%)",
        },
        {
          opacity: 1,
          x: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Accent rule
      gsap.fromTo(
        accentRef.current,
        { scaleX: 0, opacity: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: accentRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-deep-petrol text-porcelain py-section-lg overflow-hidden relative"
    >
      {/* Subtle parallax bg texture */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-5 pointer-events-none will-change-transform"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-12">
          <div className="space-y-8">
            {/* Tag */}
            <div
              ref={tagRef}
              className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase opacity-0"
            >
              The Atelier
            </div>

            {/* Brass line */}
            <div
              ref={lineRef}
              className="h-px w-16 bg-champagne-brass"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />

            <h2
              ref={titleRef}
              className="text-h2 font-display opacity-0"
              style={{ willChange: "transform" }}
            >
              Built around the details of formal dressing
            </h2>

            <div className="space-y-6 text-lg opacity-90 leading-relaxed">
              <p ref={textRef} className="opacity-0">
                CuffKings makes cufflinks for men who dress with intention —
                three collections, Classical, Signature and Premium, each built
                around a different level of detail and finish. Based in Peshawar,
                Pakistan, we work with metal, enamel and stone across every tier,
                from a clean Classical finish to Premium pieces set with fine
                engraving.
              </p>
            </div>
          </div>

          {/* Pull quote */}
          <blockquote
            ref={quoteRef}
            className="border-l-2 border-champagne-brass pl-6 py-2 opacity-0"
          >
            <p className="text-xl italic text-porcelain/85 leading-relaxed">
              &ldquo;The cufflink is the single point where craftsmanship,
              weight, and metal finish meet.&rdquo;
            </p>
          </blockquote>

          {/* Decorative accent */}
          <div
            ref={accentRef}
            className="flex items-center space-x-4 pt-8 origin-left opacity-0"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          >
            <div className="h-px w-24 bg-champagne-brass/40" />
            <span className="text-sm font-medium text-champagne-brass/60">
              Peshawar, Pakistan
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
