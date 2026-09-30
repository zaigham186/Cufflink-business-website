"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CRAFTSMANSHIP_PILLARS = [
  {
    num: "01",
    title: "Solid Jeweler's Brass",
    description:
      "Every piece begins with a solid brass substrate, weighted between 14g and 18g. Never hollow stampings or lightweight zinc alloys.",
  },
  {
    num: "02",
    title: "Cold-Cured Enamel",
    description:
      "Mineral enamel fills are poured by hand, cured, and leveled flush against beveled metal borders to prevent chipping or dulling.",
  },
  {
    num: "03",
    title: "Tested Swivel Bar",
    description:
      "Tension springs undergo positive-lock cycle checks to guarantee sleeves stay neatly anchored throughout long formal gatherings.",
  },
  {
    num: "04",
    title: "Peshawar Inspection",
    description:
      "Each pair is hand-cleaned, micro-wax sealed against oxidation, and nestled into a protective presentation box prior to dispatch.",
  },
];

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

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

      // Main header timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.3"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: "power4.out" },
          "-=0.5"
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.7"
        );

      // Pull quote reveal
      gsap.fromTo(
        quoteRef.current,
        {
          opacity: 0,
          x: -25,
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

      // Craftsmanship pillars reveal
      if (pillarsRef.current) {
        const items = pillarsRef.current.children;
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // Accent footer rule
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
            start: "top 90%",
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
      aria-labelledby="brand-story-title"
      className="bg-deep-petrol text-porcelain py-20 lg:py-28 overflow-hidden relative border-t border-champagne-brass/20"
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
          <div className="space-y-6">
            {/* Tag */}
            <div
              ref={tagRef}
              className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase opacity-0"
            >
              The Atelier & Heritage
            </div>

            {/* Brass line */}
            <div
              ref={lineRef}
              className="h-px w-16 bg-champagne-brass"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />

            <h2
              id="brand-story-title"
              ref={titleRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-display leading-[1.15] text-porcelain opacity-0"
              style={{ willChange: "transform" }}
            >
              The single point where weight, metal, and tailoring meet.
            </h2>

            <div ref={textRef} className="space-y-5 text-base sm:text-lg text-porcelain/85 leading-relaxed opacity-0">
              <p>
                Founded in Peshawar, CuffKings was established around a singular observation: formal dressing is quietly defined at the wrist. A jacket sleeve cut to reveal a quarter-inch of crisp French cuff demands a fastener with substance. Lightweight castings and loose toggle joints compromise the posture of even the finest bespoke suit or ceremonial sherwani.
              </p>
              <p>
                We produce exclusively three focused collections—Classical, Signature, and Premium—each calibrated for specific occasions rather than fast-fashion calendars. From hand-turned brass bevels to champlevé-style enamel and hand-set Austrian crystals, our pieces are weighted between 14 and 18 grams so your cuffs hang with natural, balanced drape.
              </p>
            </div>
          </div>

          {/* Pull quote */}
          <blockquote
            ref={quoteRef}
            className="border-l-2 border-champagne-brass pl-6 py-3 my-8 opacity-0 bg-obsidian/30 pr-4"
          >
            <p className="text-lg sm:text-xl font-display italic text-porcelain/90 leading-relaxed">
              &ldquo;A cufflink should never shout across a room. It should invite a quiet second look only when your hands rest upon the table.&rdquo;
            </p>
            <cite className="block text-xs uppercase tracking-widest text-champagne-brass/80 mt-3 not-italic">
              — CuffKings Workshop Principle • Peshawar
            </cite>
          </blockquote>

          {/* 4 Craftsmanship Pillars */}
          <div
            ref={pillarsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-champagne-brass/20"
          >
            {CRAFTSMANSHIP_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="p-5 bg-obsidian/40 border border-champagne-brass/20 hover:border-champagne-brass/50 transition-colors duration-300"
              >
                <div className="text-xs font-mono tracking-wider text-champagne-brass mb-2">
                  {pillar.num}
                </div>
                <h3 className="text-lg font-display text-porcelain mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-porcelain/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Decorative accent and direct action */}
          <div
            ref={accentRef}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-champagne-brass/20 opacity-0"
          >
            <div className="flex items-center space-x-4">
              <div className="h-px w-16 bg-champagne-brass/60" />
              <span className="text-xs tracking-wider uppercase text-champagne-brass/80">
                Peshawar, Khyber Pakhtunkhwa • Nationwide COD
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/about"
                className="text-xs tracking-wider uppercase text-porcelain hover:text-champagne-brass transition-colors underline underline-offset-4"
              >
                Read atelier story →
              </Link>
              <Link
                href="/shop"
                className="px-5 py-2.5 bg-champagne-brass text-obsidian text-xs font-semibold tracking-wider uppercase hover:bg-porcelain transition-colors"
              >
                Browse Archive
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

