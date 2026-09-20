"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const collections = [
  {
    name: "Premium Collection",
    tier: "Artisanal finishing & stones",
    priceRange: "Rs. 1,500–2,500",
    slug: "premium",
    description:
      "Fine hand-engraving, crystal pavé borders, and intricate stone settings calibrated for black-tie occasions.",
    images: ["/products/premium 1.jpeg"],
    featured: true,
  },
  {
    name: "Signature Collection",
    tier: "Rich enamel & texture",
    priceRange: "Rs. 1,000–1,400",
    slug: "signature",
    description:
      "Deep mineral enamel and tactile surface textures built for men who dress with elevated intention.",
    images: ["/products/signature 1.jpeg"],
    featured: false,
  },
  {
    name: "Classical Collection",
    tier: "Timeless essentials",
    priceRange: "Rs. 700–800",
    slug: "classical",
    description:
      "Essential cufflinks finished with clean beveled edges and balanced proportions for everyday formalwear.",
    images: ["/products/classic 2.jpeg"],
    featured: false,
  },
];

export default function CategoryGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Cards staggered entrance
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredCollection = collections[0];
  const secondaryCollections = collections.slice(1);

  return (
    <section
      ref={sectionRef}
      className="bg-obsidian text-porcelain py-24 lg:py-32 border-t border-champagne-brass/20"
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-12 lg:mb-16 flex justify-between items-end">
          <div>
            <h2
              ref={headingRef}
              className="text-h2 font-display text-porcelain"
            >
              Shop by collection
            </h2>
            <p className="text-body text-porcelain/60 mt-2">
              Three curated tiers designed for formal and black-tie dressing.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden sm:inline-block text-sm text-champagne-brass hover:text-porcelain transition-colors"
          >
            All pieces →
          </Link>
        </div>

        {/* 12-Column Asymmetric Grid: 1 Featured Large, 2 Smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured Large Block (7 Columns) */}
          <Link
            href={`/shop?category=${featuredCollection.slug}`}
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            className="lg:col-span-7 group block bg-obsidian border border-champagne-brass/25 hover:border-champagne-brass transition-all duration-300 overflow-hidden"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-obsidian">
              <Image
                src={featuredCollection.images[0]}
                alt={featuredCollection.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent opacity-80" />
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs tracking-wider text-champagne-brass mb-2">
                  <span>Featured collection</span>
                  <span className="text-porcelain/60">{featuredCollection.priceRange}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display text-porcelain group-hover:text-champagne-brass transition-colors">
                  {featuredCollection.name}
                </h3>
                <p className="text-sm text-porcelain/70 mt-2 max-w-lg leading-relaxed">
                  {featuredCollection.description}
                </p>
              </div>

              <div className="mt-6 flex items-center text-sm font-medium text-champagne-brass">
                <span>Explore collection</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
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
                className="group flex-1 flex flex-col justify-between bg-obsidian border border-champagne-brass/25 hover:border-champagne-brass transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[16/8] w-full overflow-hidden bg-obsidian">
                  <Image
                    src={collection.images[0]}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-70" />
                </div>

                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs tracking-wider text-champagne-brass/80 mb-1">
                      <span>{collection.tier}</span>
                      <span className="text-porcelain/60">{collection.priceRange}</span>
                    </div>
                    <h3 className="text-xl font-display text-porcelain group-hover:text-champagne-brass transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-porcelain/70 mt-1 leading-relaxed line-clamp-2">
                      {collection.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center text-xs sm:text-sm font-medium text-champagne-brass">
                    <span>Explore collection</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
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
