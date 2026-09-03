"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function HeroNoir() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show everything immediately
      if (imageRef.current) gsap.set(imageRef.current, { opacity: 1, scale: 1 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 1, y: 0 });
      if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, y: 0 });
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Hero entrance sequence
      tl.from(imageRef.current, {
        clipPath: "inset(0 0 100% 0)",
        scale: 1.1,
        duration: 1.2,
        ease: "power4.out"
      })
      .from(imageRef.current, {
        scale: 1.1,
        duration: 1.5,
        ease: "power3.out"
      }, "<")
      .from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
      }, "-=0.6")
      .from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
      }, "-=0.5")
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.4")
      .from(lineRef.current, {
        scaleX: 0,
        duration: 1,
        ease: "power3.inOut"
      }, "-=0.6");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-obsidian text-porcelain flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/95 to-obsidian z-10" />
      
      {/* Hero Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 opacity-40"
      >
        <Image
          src="/products/ivory-pave-gold-1.jpg"
          alt="CuffKings premium cufflinks"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl">
          {/* Brand mark */}
          <div className="mb-12 text-champagne-brass text-sm tracking-[0.3em] font-medium opacity-80">
            CUFFKINGS
          </div>

          {/* Main headline */}
          <h1
            ref={titleRef}
            className="text-h1 mb-8 leading-none"
          >
            The detail
            <br />
            changes everything.
          </h1>

          {/* Supporting copy */}
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl mb-12 max-w-2xl opacity-90 leading-relaxed"
          >
            Cufflinks built around polished metal, considered patterns and the details of formal dressing.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button href="/shop" variant="primary">
              Shop the collection
            </Button>
            <Button href="/shop" variant="secondary">
              Explore the pieces
            </Button>
          </div>

          {/* Brass line accent */}
          <div
            ref={lineRef}
            className="h-px w-32 bg-champagne-brass origin-left"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-px h-16 bg-gradient-to-b from-champagne-brass to-transparent" />
      </div>
    </section>
  );
}
