"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const finishes = [
  {
    title: "Gold finish",
    subtitle: "Warm, polished, formal",
    description:
      "Gold-tone metal paired with ivory enamel and crystal pavé detailing. Mirror-polished surfaces built for evening occasions.",
    image: "/products/ivory-pave-gold-1.jpg",
    category: "gold-cufflinks",
    tag: "01 / GOLD",
  },
  {
    title: "Deep enamel",
    subtitle: "Rich mineral color",
    description:
      "Sapphire blue and midnight tones leveled flush with the perimeter to eliminate snagging on shirts.",
    image: "/products/sapphire-ornamental-1.jpg",
    category: "enamel-cufflinks",
    tag: "02 / BLUE",
  },
  {
    title: "Silver tone",
    subtitle: "Clean, architectural",
    description:
      "Reflective silver plating filed by hand and wire-brushed for light-catching edges that contrast against dark suiting.",
    image: "/products/royal-blue-floral-1.jpg",
    category: "silver-cufflinks",
    tag: "03 / SILVER",
  },
  {
    title: "Matte gunmetal",
    subtitle: "Dark, modern restraint",
    description:
      "Understated charcoal finish paired with geometric onyx patterns. Weight-tested for modern formalwear.",
    image: "/products/onyx-geometric-1.jpg",
    category: "gunmetal-cufflinks",
    tag: "04 / GUNMETAL",
  },
];

export default function HorizontalCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const track = trackRef.current;
    if (!section || !pinWrapper || !track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 1024;

    // Do not pin on mobile or reduced motion
    if (prefersReducedMotion || isMobile) return;

    const ctx = gsap.context(() => {
      const scrollDistance = track.scrollWidth - window.innerWidth;

      if (scrollDistance > 0) {
        gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: pinWrapper, // Pin the inner wrapper so <section> remains stable in React DOM
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            anticipatePin: 1,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-obsidian text-porcelain overflow-hidden"
    >
      {/* 
        Inner Pin Wrapper: GSAP wraps this element in .pin-spacer INSIDE <section>,
        keeping <section> completely untouched as a direct child of React's DOM.
      */}
      <div ref={pinWrapperRef} className="w-full">
        {/* 
          Track:
          Desktop: Fixed height viewport, horizontal scroll
          Mobile: Natural touch swipe carousel
        */}
        <div
          ref={trackRef}
          className="flex w-max lg:h-screen items-center overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scrollbar-none py-16 lg:py-0"
        >
          {/* Intro Panel */}
          <div className="w-[85vw] sm:w-[70vw] lg:w-[45vw] flex-shrink-0 px-6 sm:px-12 lg:px-16 flex flex-col justify-center snap-start">
            <div className="space-y-6 max-w-lg">
              <div className="text-xs tracking-[0.25em] text-champagne-brass font-medium">
                CURATED SELECTION
              </div>
              <h2 className="text-h2 font-display leading-[1.05]">
                Choose your finish.
              </h2>
              <p className="text-body text-porcelain/70 leading-relaxed">
                Gold → Blue → Silver → Gunmetal. Each piece starts with solid
                metal, precision-filed surfaces and calibrated weight for formal
                dressing.
              </p>
              <div className="pt-4 flex items-center space-x-3 text-xs text-champagne-brass font-medium tracking-wider">
                <span>SCROLL TO EXPLORE</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* 4 Finish Panels */}
          {finishes.map((item) => (
            <div
              key={item.tag}
              className="w-[85vw] sm:w-[75vw] lg:w-[60vw] flex-shrink-0 px-4 sm:px-8 lg:px-12 flex items-center justify-center snap-start"
            >
              <div className="w-full bg-deep-petrol/40 border border-champagne-brass/25 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                {/* Product Media Column */}
                <div className="w-full lg:w-1/2 relative aspect-square bg-obsidian border border-champagne-brass/20 overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 80vw, 35vw"
                  />
                </div>

                {/* Information Column */}
                <div className="w-full lg:w-1/2 space-y-6 flex flex-col justify-center">
                  <div className="space-y-2">
                    <span className="text-xs tracking-[0.2em] text-champagne-brass font-medium">
                      {item.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display text-porcelain">
                      {item.title}
                    </h3>
                    <p className="text-xs text-porcelain/60 uppercase tracking-wider">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-porcelain/80 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/shop?category=${item.category}`}
                      className="inline-block text-xs font-medium text-champagne-brass hover:text-porcelain transition-colors border-b border-champagne-brass/40 hover:border-porcelain pb-1 tracking-wider uppercase"
                    >
                      Explore {item.title.toLowerCase()} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
