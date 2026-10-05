"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Reveal image via clip-path
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 0.5 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Reveal text
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-porcelain text-warm-charcoal py-24 lg:py-32"
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Photography (7 cols) */}
          <div
            ref={imageRef}
            className="lg:col-span-7 relative aspect-[4/3] bg-obsidian overflow-hidden border border-warm-charcoal/10"
          >
            <Image
              src="/editorial/craftsmanship-detail.jpg"
              alt="Artisan hand filing beveled cufflink edge"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>

          {/* Editorial Narrative (5 cols) */}
          <div ref={contentRef} className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-h2 font-display leading-[1.05] text-warm-charcoal">
                Polished metal. Deep enamel. A clean finish.
              </h2>
              <p className="text-body text-warm-charcoal/80 leading-relaxed pt-2">
                Every cufflink starts with solid metal, filed by hand and checked
                for weight and balance. The toggle mechanism is tested to hold
                French cuffs flat without slipping.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-warm-charcoal/15">
              <div className="space-y-1">
                <p className="text-sm font-medium text-warm-charcoal">
                  Filed edges
                </p>
                <p className="text-xs sm:text-sm text-warm-charcoal/70 leading-relaxed">
                  Beveled borders polished to reflect light deliberately,
                  without harsh glares.
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-warm-charcoal">
                  Level enamel
                </p>
                <p className="text-xs sm:text-sm text-warm-charcoal/70 leading-relaxed">
                  Deep mineral fills cured flush with metal borders to resist
                  chips and daily wear.
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-warm-charcoal">
                  Secure closure
                </p>
                <p className="text-xs sm:text-sm text-warm-charcoal/70 leading-relaxed">
                  Heavyweight toggle backs engineered for single or double formal
                  shirt cuffs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
