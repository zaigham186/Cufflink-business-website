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
  headline?: string;
  subtext?: string;
}

const KEN_BURNS_SLIDES = [
  {
    src: "/products/premium 1.jpeg",
    alt: "Premium Pavé Crystal Cufflinks",
  },
  {
    src: "/products/signature 1.jpeg",
    alt: "Signature Sapphire Floral Cufflinks",
  },
  {
    src: "/products/classic 2.jpeg",
    alt: "Classical Silver Brushed Cufflinks",
  },
  {
    src: "/products/premium 5.jpeg",
    alt: "Premium Faceted Gunmetal Cufflinks",
  },
  {
    src: "/products/signature 8.jpeg",
    alt: "Signature Cobalt Starburst Cufflinks",
  },
  {
    src: "/products/classic1.jpeg",
    alt: "Classical Minimalist Gold Cufflinks",
  },
];

export default function HeroNoir({ heroVideo, headline, subtext }: HeroNoirProps) {
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const brassRuleRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  // Configurable video background from environment variable or prop
  const videoSrc = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || heroVideo || "/videos/hero-bg.mp4";
  const [videoAvailable, setVideoAvailable] = useState(false);

  // Slide refs for Ken Burns sequence fallback
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // 1. Text entrance & scroll-out timeline
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (mediaRef.current) gsap.set(mediaRef.current, { opacity: 0.5, scale: 1 });
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
        mediaRef.current,
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 0.45,
          duration: 1.2,
          ease: "power4.out",
        }
      )
        .fromTo(
          [headlineLine1Ref.current, headlineLine2Ref.current],
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.7"
        )
        .fromTo(
          sublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 0.85, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          brassRuleRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.1, ease: "power3.inOut" },
          "-=0.5"
        );

      // Scroll-Out Parallax / Fade
      if (heroRef.current && contentWrapRef.current) {
        gsap.to(contentWrapRef.current, {
          y: -70,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 2. Ken Burns Sequence (cycles through slides if video is not playing)
  useEffect(() => {
    if (videoAvailable) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % KEN_BURNS_SLIDES.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [videoAvailable]);

  // Handle slide transitions with GSAP
  useEffect(() => {
    if (videoAvailable) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const currentSlideEl = slidesRef.current[activeSlide];
    if (!currentSlideEl) return;

    // Reset transform on incoming slide
    gsap.set(currentSlideEl, { scale: 1, x: 0, y: 0 });

    // Fade in and slow zoom (Ken Burns)
    gsap.to(currentSlideEl, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut",
    });

    gsap.to(currentSlideEl, {
      scale: 1.12,
      x: activeSlide % 2 === 0 ? 15 : -15,
      y: activeSlide % 3 === 0 ? -10 : 10,
      duration: 6,
      ease: "none",
    });

    // Fade out others
    slidesRef.current.forEach((el, index) => {
      if (index !== activeSlide && el) {
        gsap.to(el, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
        });
      }
    });
  }, [activeSlide, videoAvailable]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] h-[100svh] w-full flex items-center overflow-hidden bg-obsidian text-porcelain select-none"
      aria-label="CuffKings Hero"
    >
      {/* Background Media Container */}
      <div
        ref={mediaRef}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-transform pointer-events-none"
      >
        {/* Video Element */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/products/premium 1.jpeg"
          onLoadedData={() => setVideoAvailable(true)}
          onError={() => setVideoAvailable(false)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoAvailable ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Fallback Ken Burns image slideshow */}
        {/* TODO: Replace with hero-bg.mp4 when video is ready */}
        <div
          className={`relative w-full h-full overflow-hidden transition-opacity duration-1000 ${
            videoAvailable ? "opacity-0" : "opacity-100"
          }`}
        >
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

        {/* Obsidian dark overlay for high contrast & elegance */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/85 via-obsidian/60 to-obsidian" />
      </div>

      {/* Hero Content */}
      <div
        ref={contentWrapRef}
        className="relative z-10 max-w-container mx-auto px-6 sm:px-8 lg:px-12 w-full pt-16 will-change-transform"
      >
        <div className="max-w-4xl">
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display leading-[1.15] tracking-tight mb-6 max-w-2xl">
            {headline ? (
              <span ref={headlineLine1Ref} className="block">
                {headline}
              </span>
            ) : (
              <>
                <span ref={headlineLine1Ref} className="block">
                  Premium men&apos;s cufflinks.
                </span>
                <span ref={headlineLine2Ref} className="block text-porcelain/95">
                  Built to last a decade.
                </span>
              </>
            )}
          </h1>

          {/* Subheading */}
          <p
            ref={sublineRef}
            className="text-body max-w-xl text-porcelain/85 mb-10 leading-relaxed text-sm sm:text-base"
          >
            {subtext || (
              <>
                Three collections — Classical, Signature, and Premium.
                <br className="hidden sm:inline" /> Solid brass, cold-cured enamel, and hand-set crystals.
                <br className="hidden sm:inline" /> Shipped nationwide with cash on delivery.
              </>
            )}
          </p>

          {/* Action Buttons */}
          <div
            ref={ctaGroupRef}
            className="flex flex-col sm:flex-row gap-4 mb-12 items-start sm:items-center"
          >
            <Magnetic>
              <Link
                href="/shop"
                className="inline-block px-8 py-3.5 bg-champagne-brass text-obsidian text-sm font-medium border border-champagne-brass hover:bg-champagne-brass/90 transition-all duration-200"
              >
                Shop the Collection
              </Link>
            </Magnetic>
            <Link
              href="/about"
              className="inline-block px-8 py-3.5 bg-transparent text-porcelain text-sm font-medium border border-porcelain/30 hover:border-porcelain hover:text-porcelain transition-all duration-200"
            >
              Our Story
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
