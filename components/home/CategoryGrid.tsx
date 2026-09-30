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
  tier: string;
  priceRange: string;
  pieceCount: string;
  slug: string;
  specs: string[];
  description: string;
  image: string;
  featured: boolean;
}

const COLLECTIONS: CollectionTier[] = [
  {
    name: "Premium Collection",
    tier: "Pavé Crystal & Hand Relief",
    priceRange: "Rs. 1,500–2,500",
    pieceCount: "17 pieces",
    slug: "premium",
    specs: ["Austrian Pavé Crystals", "Relief Engraving", "Black-Tie Calibration"],
    description:
      "Statement pieces calibrated for black-tie galas, wedding celebrations, and formal evening attire. Solid jeweler's brass substrates with hand-set crystals and high-polish rhodium finishing.",
    image: "/products/premium 1.jpeg",
    featured: true,
  },
  {
    name: "Signature Collection",
    tier: "Vitreous Enamel & Guilloché",
    priceRange: "Rs. 1,000–1,400",
    pieceCount: "33 pieces",
    slug: "signature",
    specs: ["Cold-Cured Enamel", "Engine-Turned Guilloché", "Two-Tone Facets"],
    description:
      "Hand-poured vitreous enamel leveled flush with beveled metallic borders. Adds rich mineral color and tactile depth beneath pressed cuffs.",
    image: "/products/signature 1.jpeg",
    featured: false,
  },
  {
    name: "Classical Collection",
    tier: "Turned Brass Essentials",
    priceRange: "Rs. 700–800",
    pieceCount: "17 pieces",
    slug: "classical",
    specs: ["Solid Brass Substrate", "Dual Beveled Finishes", "Boardroom Everyday"],
    description:
      "Understated geometric silhouettes designed for boardroom precision and Friday prayer attire. Clean, balanced metalwork with dependable swivel-bar locks.",
    image: "/products/classic 2.jpeg",
    featured: false,
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
          { opacity: 0, y: 45, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out" },
          "-=0.5"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 0.7, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          linkRef.current,
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );

      // Cards clip-path reveal + image scale
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const img = card.querySelector(".card-img-wrap");
        const content = card.querySelector(".card-content");

        gsap.fromTo(
          card,
          {
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
            delay: index * 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              once: true,
            },
          }
        );

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.12 },
            {
              scale: 1,
              duration: 1.2,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: index * 0.15 + 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredCollection = COLLECTIONS[0];
  const secondaryCollections = COLLECTIONS.slice(1);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="collection-grid-heading"
      className="bg-obsidian text-porcelain py-20 lg:py-28 border-t border-champagne-brass/20 overflow-hidden"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 lg:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            {/* Tag */}
            <div
              ref={tagRef}
              className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase mb-3 opacity-0"
            >
              Sartorial Collections
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
              Three Tiers of Finish
            </h2>
            <p
              ref={subRef}
              className="text-sm sm:text-base text-porcelain/70 mt-2 max-w-xl opacity-0"
            >
              Curated across 67 distinct designs in solid jeweler&apos;s brass, cold-poured vitreous enamel, and hand-set crystals.
            </p>
          </div>

          <Link
            href="/shop"
            ref={linkRef}
            className="inline-flex items-center text-xs tracking-wider uppercase text-champagne-brass hover:text-porcelain transition-colors opacity-0 group self-start sm:self-auto"
          >
            <span>View All 67 Pieces</span>
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </Link>
        </div>

        {/* 12-Column Asymmetric Grid: 1 Featured Large (7 cols), 2 Stacked (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured Large Block (7 Columns) */}
          <Link
            href={`/shop?category=${featuredCollection.slug}`}
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            aria-label={`Explore ${featuredCollection.name} starting at ${featuredCollection.priceRange}`}
            className="lg:col-span-7 group block bg-obsidian border border-champagne-brass/25 hover:border-champagne-brass transition-all duration-300 overflow-hidden"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-obsidian">
              <div className="card-img-wrap absolute inset-0 will-change-transform">
                <Image
                  src={featuredCollection.image}
                  alt={featuredCollection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-transparent opacity-85" />
              
              {/* Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1 bg-obsidian/90 border border-champagne-brass/60 text-champagne-brass text-[10px] tracking-widest uppercase font-semibold">
                Ceremonial & Evening
              </div>
            </div>

            <div className="card-content p-6 sm:p-8 flex flex-col justify-between opacity-0 bg-obsidian">
              <div>
                <div className="flex items-center justify-between text-xs tracking-wider text-champagne-brass mb-2">
                  <span className="uppercase">{featuredCollection.tier}</span>
                  <span className="text-porcelain/60 font-mono">{featuredCollection.priceRange}</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl sm:text-3xl font-display text-porcelain group-hover:text-champagne-brass transition-colors">
                    {featuredCollection.name}
                  </h3>
                  <span className="text-xs text-champagne-brass/80 shrink-0">
                    {featuredCollection.pieceCount}
                  </span>
                </div>
                <p className="text-sm text-porcelain/75 mt-3 max-w-xl leading-relaxed">
                  {featuredCollection.description}
                </p>

                {/* Specs pill row */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-champagne-brass/15">
                  {featuredCollection.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 text-[11px] bg-deep-petrol/40 text-porcelain/80 border border-champagne-brass/20"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-champagne-brass/15 flex items-center justify-between text-xs sm:text-sm font-medium text-champagne-brass">
                <span className="tracking-wider uppercase">Explore {featuredCollection.name}</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
          </Link>

          {/* Two Smaller Blocks (5 Columns, stacked) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {secondaryCollections.map((collection, idx) => (
              <Link
                key={collection.slug}
                href={`/shop?category=${collection.slug}`}
                ref={(el) => {
                  cardsRef.current[idx + 1] = el;
                }}
                aria-label={`Explore ${collection.name} starting at ${collection.priceRange}`}
                className="group flex-1 flex flex-col justify-between bg-obsidian border border-champagne-brass/25 hover:border-champagne-brass transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[16/8] w-full overflow-hidden bg-obsidian">
                  <div className="card-img-wrap absolute inset-0 will-change-transform">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/35 to-transparent opacity-75" />
                  
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-0.5 bg-obsidian/85 border border-champagne-brass/40 text-champagne-brass text-[9px] tracking-widest uppercase font-medium">
                    {collection.pieceCount}
                  </div>
                </div>

                <div className="card-content p-5 sm:p-6 flex flex-col justify-between opacity-0 bg-obsidian">
                  <div>
                    <div className="flex items-center justify-between text-xs tracking-wider text-champagne-brass/90 mb-1">
                      <span className="uppercase text-[11px]">{collection.tier}</span>
                      <span className="text-porcelain/60 font-mono text-xs">{collection.priceRange}</span>
                    </div>
                    <h3 className="text-xl font-display text-porcelain group-hover:text-champagne-brass transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-porcelain/70 mt-2 leading-relaxed line-clamp-2">
                      {collection.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {collection.specs.slice(0, 2).map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-0.5 text-[10px] bg-deep-petrol/30 text-porcelain/75 border border-champagne-brass/20"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-champagne-brass/15 flex items-center justify-between text-xs font-medium text-champagne-brass">
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
      </div>
    </section>
  );
}

