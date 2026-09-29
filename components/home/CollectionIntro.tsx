"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "67", label: "Unique Pieces", suffix: "+" },
  { value: "3", label: "Collections", suffix: "" },
  { value: "100", label: "Handcrafted", suffix: "%" },
];

export default function CollectionIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Thin brass line draws in first
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.7, ease: "power3.inOut" }
      )
        // Tag label fades up
        .fromTo(
          tagRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        )
        // Title word by word
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50, skewY: 2 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.2"
        )
        // Body text
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );

      // Stats: separator line, then counters staggered
      gsap.fromTo(
        statLineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: statLineRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      statsRef.current.forEach((stat, i) => {
        if (!stat) return;
        const num = stat.querySelector(".stat-num");
        const lbl = stat.querySelector(".stat-lbl");

        gsap.fromTo(
          num,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              once: true,
            },
          }
        );
        gsap.fromTo(
          lbl,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.12 + 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-porcelain text-warm-charcoal py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Brass accent line */}
          <div
            ref={lineRef}
            className="h-px w-20 bg-champagne-brass mb-6"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />

          {/* Tag */}
          <div
            ref={tagRef}
            className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase mb-4 opacity-0"
          >
            The Collection
          </div>

          {/* Main heading */}
          <h2
            ref={titleRef}
            className="text-h2 font-display mb-8 opacity-0"
            style={{ willChange: "transform" }}
          >
            Designed for the details.
          </h2>

          {/* Body */}
          <p
            ref={textRef}
            className="text-xl opacity-0 leading-relaxed max-w-2xl text-warm-charcoal/80"
          >
            Every cufflink begins as a flat blank of raw metal — cut, shaped,
            then finished by hand across three collections: Classical, Signature,
            and Premium.
          </p>

          {/* Stats row */}
          <div
            ref={statLineRef}
            className="h-px w-full bg-warm-charcoal/10 mt-16 mb-12"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          />

          <div className="grid grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <div
                key={s.label}
                ref={(el) => {
                  statsRef.current[i] = el;
                }}
                className="text-center sm:text-left"
              >
                <div className="stat-num text-4xl sm:text-5xl font-display text-warm-charcoal opacity-0">
                  {s.value}
                  <span className="text-champagne-brass">{s.suffix}</span>
                </div>
                <div className="stat-lbl text-xs sm:text-sm text-warm-charcoal/60 mt-2 uppercase tracking-wider opacity-0">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
