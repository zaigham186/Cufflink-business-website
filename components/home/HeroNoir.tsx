"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroNoir() {
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const brassRuleRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (mediaRef.current) gsap.set(mediaRef.current, { opacity: 0.45, scale: 1, clipPath: "inset(0 0 0% 0)" });
      if (wordmarkRef.current) gsap.set(wordmarkRef.current, { opacity: 0.8, y: 0 });
      if (headlineLine1Ref.current) gsap.set(headlineLine1Ref.current, { opacity: 1, y: 0 });
      if (headlineLine2Ref.current) gsap.set(headlineLine2Ref.current, { opacity: 1, y: 0 });
      if (sublineRef.current) gsap.set(sublineRef.current, { opacity: 0.85, y: 0 });
      if (ctaGroupRef.current) gsap.set(ctaGroupRef.current, { opacity: 1, y: 0 });
      if (brassRuleRef.current) gsap.set(brassRuleRef.current, { scaleX: 1, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Entrance Sequence (800–1500ms):
      // bg settles → wordmark reveals → image reveals via clip-path → headline reveals line by line → CTA enters → thin brass rule draws in
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Wordmark
      tl.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: -15 },
        { opacity: 0.8, y: 0, duration: 0.8 }
      )
        // Image / Media reveals via clip-path
        .fromTo(
          mediaRef.current,
          { clipPath: "inset(0 0 100% 0)", scale: 1.08, opacity: 0 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            opacity: 0.45,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.5"
        )
        // Headline line by line
        .fromTo(
          headlineLine1Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          headlineLine2Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        )
        // Subline
        .fromTo(
          sublineRef.current,
          { opacity: 0, y: 25 },
          { opacity: 0.85, y: 0, duration: 0.8 },
          "-=0.5"
        )
        // CTA
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        // Thin brass rule draws in
        .fromTo(
          brassRuleRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.0, ease: "power3.inOut" },
          "-=0.5"
        );

      // 2. Scroll-out via GSAP ScrollTrigger:
      // product scales, headline exits, next section overlaps (transform/opacity/clip-path only)
      if (heroRef.current) {
        gsap.to(mediaRef.current, {
          scale: 1.1,
          opacity: 0.2,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(contentWrapRef.current, {
          y: -80,
          opacity: 0.2,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100svh] min-h-[600px] bg-obsidian text-porcelain flex items-center overflow-hidden"
    >
      {/* Background Media: Video placeholder with fallback editorial image */}
      <div
        ref={mediaRef}
        className="absolute inset-0 z-0 origin-center will-change-transform"
      >
        {/* Placeholder video tag (if video exists, plays automatically; else shows fallback image) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/editorial/hero-cufflinks.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback image */}
          <Image
            src="/editorial/hero-cufflinks.jpg"
            alt="CuffKings cufflinks detail"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </video>
        {/* Obsidian overlay for contrast */}
        <div className="absolute inset-0 bg-obsidian/60" />
      </div>

      {/* Hero Content */}
      <div
        ref={contentWrapRef}
        className="relative z-10 max-w-container mx-auto px-6 sm:px-8 lg:px-12 w-full pt-16 will-change-transform"
      >
        <div className="max-w-4xl">
          {/* Wordmark */}
          <div
            ref={wordmarkRef}
            className="mb-8 text-champagne-brass text-xs sm:text-sm tracking-[0.3em] font-medium"
          >
            CUFFKINGS
          </div>

          {/* Headline - sentence case, line by line */}
          <h1 className="text-display font-display leading-[0.95] tracking-tight mb-8">
            <span ref={headlineLine1Ref} className="block">
              The detail
            </span>
            <span ref={headlineLine2Ref} className="block">
              changes everything.
            </span>
          </h1>

          {/* Subline - exact copy */}
          <p
            ref={sublineRef}
            className="text-body max-w-xl text-porcelain/85 mb-10 leading-relaxed"
          >
            Cufflinks built around polished metal, considered patterns and the
            details of formal dressing.
          </p>

          {/* CTAs - exact copy */}
          <div
            ref={ctaGroupRef}
            className="flex flex-col sm:flex-row gap-4 mb-12 items-start sm:items-center"
          >
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 bg-champagne-brass text-obsidian text-sm font-medium border border-champagne-brass hover:bg-champagne-brass/90 transition-all duration-200"
            >
              Shop the collection
            </Link>
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 bg-transparent text-porcelain text-sm font-medium border border-porcelain/30 hover:border-porcelain hover:text-porcelain transition-all duration-200"
            >
              Explore the pieces
            </Link>
          </div>

          {/* Thin Champagne Brass rule draws in */}
          <div
            ref={brassRuleRef}
            className="h-px w-28 sm:w-36 bg-champagne-brass origin-left"
          />
        </div>
      </div>
    </section>
  );
}
