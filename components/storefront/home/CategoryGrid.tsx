"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CollectionTier {
  name: string;
  priceRange: string;
  slug: string;
  description: string;
  image: string;
}

const COLLECTIONS: CollectionTier[] = [
  {
    name: "Classical",
    priceRange: "Rs. 700 – 1,000",
    slug: "classical",
    description: "Solid brass, clean geometry. Built for daily business and Friday prayer attire.",
    image: "/products/classic 2.jpeg",
  },
  {
    name: "Signature",
    priceRange: "Rs. 1,000 – 1,500",
    slug: "signature",
    description: "Hand-applied enamel and engraved detail. For occasions that call for a closer look.",
    image: "/products/signature 1.jpeg",
  },
  {
    name: "Premium",
    priceRange: "Rs. 1,500 – 2,500",
    slug: "premium",
    description: "Hand-set crystals, beveled edges, and rhodium finish. For weddings and black-tie.",
    image: "/products/premium 1.jpeg",
  },
];

export default function CategoryGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const tagRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
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
          headingRef.current,
          { opacity: 0, y: 40, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          linkRef.current,
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          "-=0.5"
        );

      // Card entrance animation - staggered uniform reveal
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
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
      className="bg-obsidian text-porcelain py-20 lg:py-28 overflow-hidden select-none"
      aria-labelledby="collection-grid-heading"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16 gap-6">
          <div>
            {/* Tag */}
            <div
              ref={tagRef}
              className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase mb-3 opacity-0"
            >
              The Collections
            </div>

            {/* Brass accent line */}
            <div
              ref={lineRef}
              className="h-px w-16 bg-champagne-brass mb-4"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />

            <h2
              id="collection-grid-heading"
              ref={headingRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-display text-porcelain opacity-0"
              style={{ willChange: "transform" }}
            >
              Three Collections
            </h2>
            <p
              ref={subRef}
              className="text-sm sm:text-base text-porcelain/70 mt-2 max-w-xl opacity-0"
            >
              Solid brass, cold-cured enamel, and crystal setting across three focused tiers.
            </p>
          </div>

          <Link
            href="/shop"
            ref={linkRef}
            className="inline-flex items-center text-xs tracking-wider uppercase text-champagne-brass hover:text-porcelain transition-colors opacity-0 group self-start sm:self-auto"
          >
            <span>View All Cufflinks</span>
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </Link>
        </div>

        {/* 3 Equal Width & Height Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {COLLECTIONS.map((collection, idx) => (
            <Link
              key={collection.slug}
              href={`/shop?category=${collection.slug}`}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              aria-label={`Explore ${collection.name} Collection, ${collection.priceRange}`}
              className="group flex flex-col bg-obsidian border border-champagne-brass/25 hover:border-champagne-brass transition-all duration-300 overflow-hidden h-full"
            >
              {/* Image Box - Uniform aspect ratio across all 3 cards */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian-deep shrink-0">
                <Image
                  src={collection.image}
                  alt={`${collection.name} Cufflinks`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-80" />
                
                {/* Collection Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-obsidian/90 border border-champagne-brass/40 text-champagne-brass text-[10px] tracking-widest uppercase font-semibold">
                  {collection.name}
                </div>
              </div>

              {/* Card Content - Uniform height & structure */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-obsidian">
                <div>
                  <div className="flex items-center justify-between text-xs tracking-wider text-champagne-brass mb-2">
                    <span className="uppercase tracking-widest font-sans font-medium text-[11px]">
                      Collection
                    </span>
                    <span className="text-porcelain/80 font-mono text-xs">
                      {collection.priceRange}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display text-porcelain group-hover:text-champagne-brass transition-colors mb-3">
                    {collection.name}
                  </h3>

                  <p className="text-sm text-porcelain/75 leading-relaxed">
                    {collection.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-champagne-brass/15 flex items-center justify-between text-xs font-medium text-champagne-brass group-hover:text-champagne-brass-light">
                  <span className="tracking-wider uppercase">Explore {collection.name}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
