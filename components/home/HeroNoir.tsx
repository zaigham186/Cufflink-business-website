"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/motion/Magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroNoirProps {
  heroVideo?: string;
}

const KEN_BURNS_SLIDES = [
  {
    src: "/products/ivory-pave-gold-1.jpg",
    alt: "Ivory Pavé Gold Cufflinks detail",
  },
  {
    src: "/editorial/hero-cufflinks.jpg",
    alt: "CuffKings formalwear atelier detail",
  },
  {
    src: "/products/sapphire-ornamental-1.jpg",
    alt: "Sapphire Ornamental Cufflinks detail",
  },
  {
    src: "/products/onyx-geometric-1.jpg",
    alt: "Onyx Geometric Cufflinks detail",
  },
  {
    src: "/products/gold-trellis-crystal-1.jpg",
    alt: "Gold Trellis Crystal Cufflinks detail",
  },
];

export default function HeroNoir({ heroVideo }: HeroNoirProps) {
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const brassRuleRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  // Slide refs for Ken Burns sequence
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // 1. Text entrance & scroll-out timeline
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
      // Entrance Sequence
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: -15 },
        { opacity: 0.8, y: 0, duration: 0.8 }
      )
        .fromTo(
          mediaRef.current,
          { clipPath: "inset(0 0 100% 0)", scale: 1.08, opacity: 0 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            opacity: 0.5,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.5"
        )
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
        .fromTo(
          sublineRef.current,
          { opacity: 0, y: 25 },
          { opacity: 0.85, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          brassRuleRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.0, ease: "power3.inOut" },
          "-=0.5"
        );

      // Scroll-out via GSAP ScrollTrigger
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

  // 2. Ken Burns Sequence (slow pan/zoom, crossfading across stills when heroVideo is absent)
  useEffect(() => {
    if (heroVideo) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let current = 0;
    const total = KEN_BURNS_SLIDES.length;
    const duration = 6.5; // seconds per slide

    // Initialize first slide
    const firstSlide = slidesRef.current[0];
    if (firstSlide) {
      gsap.set(firstSlide, { opacity: 1, scale: 1.04, x: 0 });
      gsap.to(firstSlide, {
        scale: 1.14,
        x: -15,
        duration: duration + 1.5,
        ease: "sine.inOut",
      });
    }

    const interval = setInterval(() => {
      const next = (current + 1) % total;
      const prevEl = slidesRef.current[current];
      const nextEl = slidesRef.current[next];

      if (prevEl && nextEl) {
        // Prepare next slide
        const randomX = (next % 2 === 0 ? 1 : -1) * 20;
        gsap.fromTo(
          nextEl,
          { opacity: 0, scale: 1.04, x: randomX },
          {
            opacity: 1,
            scale: 1.14,
            x: -randomX / 2,
            duration: duration + 1.5,
            ease: "sine.inOut",
          }
        );

        // Fade out previous slide
        gsap.to(prevEl, {
          opacity: 0,
          duration: 1.8,
          ease: "power2.inOut",
        });
      }

      current = next;
      setActiveSlide(next);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [heroVideo]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100svh] min-h-[600px] bg-obsidian text-porcelain flex items-center overflow-hidden"
    >
      {/* Background Media: Video if provided, else Ken Burns crossfading product sequence */}
      <div
        ref={mediaRef}
        className="absolute inset-0 z-0 origin-center will-change-transform pointer-events-none overflow-hidden"
        data-cursor="explore"
      >
        {heroVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <div className="relative w-full h-full overflow-hidden">
            {KEN_BURNS_SLIDES.map((slide, index) => (
              <div
                key={slide.src}
                ref={(el) => {
                  slidesRef.current[index] = el;
                }}
                className={`absolute inset-0 transition-none will-change-transform ${
                  index === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* Obsidian dark overlay for high contrast & elegance */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/75" />
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

          {/* Headline: "Cufflinks, finished the way formalwear demands." */}
          <h1 className="text-display font-display leading-[0.95] tracking-tight mb-8">
            <span ref={headlineLine1Ref} className="block">
              Cufflinks, finished the way
            </span>
            <span ref={headlineLine2Ref} className="block text-porcelain/95">
              formalwear demands.
            </span>
          </h1>

          {/* Subline */}
          <p
            ref={sublineRef}
            className="text-body max-w-xl text-porcelain/85 mb-10 leading-relaxed"
          >
            Cufflinks built around polished metal, considered patterns and the
            details of formal dressing.
          </p>

          {/* CTAs */}
          <div
            ref={ctaGroupRef}
            className="flex flex-col sm:flex-row gap-4 mb-12 items-start sm:items-center"
          >
            <Magnetic>
              <Link
                href="/shop"
                className="inline-block px-8 py-3.5 bg-champagne-brass text-obsidian text-sm font-medium border border-champagne-brass hover:bg-champagne-brass/90 transition-all duration-200"
              >
                Shop the collection
              </Link>
            </Magnetic>
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
