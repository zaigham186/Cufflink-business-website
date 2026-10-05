"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MoreAboutCufflinks() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        textRef.current,
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

      // Image reveal via clipPath
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 0.6 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 1.1,
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
      className="bg-deep-petrol text-porcelain py-24 lg:py-32 border-t border-champagne-brass/20"
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative Column (5 cols) */}
          <div ref={textRef} className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="text-xs tracking-[0.2em] text-champagne-brass font-medium">
                ATELIER NOTES
              </div>
              <h2 className="text-h2 font-display leading-[1.05] text-porcelain">
                Considered patterns. Balanced weight.
              </h2>
              <p className="text-body text-porcelain/80 leading-relaxed pt-2">
                A cufflink should anchor a cuff without pulling the fabric. We
                calibrate the weight of each pair between 14 and 22
                grams—substantial enough to feel intentional, balanced enough to
                sit cleanly through an evening.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-champagne-brass/20 text-sm">
              <div>
                <p className="text-2xl font-display text-champagne-brass">
                  14–22g
                </p>
                <p className="text-xs text-porcelain/70 mt-1">
                  Calibrated pair weight for balanced drape
                </p>
              </div>

              <div>
                <p className="text-2xl font-display text-champagne-brass">
                  100%
                </p>
                <p className="text-xs text-porcelain/70 mt-1">
                  Surface-inspected under directional light
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-block text-sm font-medium text-champagne-brass hover:text-porcelain transition-colors"
              >
                Read about the workshop in Peshawar →
              </Link>
            </div>
          </div>

          {/* Workshop Editorial Image (7 cols) */}
          <div
            ref={imageRef}
            className="lg:col-span-7 relative aspect-[4/3] bg-obsidian overflow-hidden border border-champagne-brass/20"
          >
            <Image
              src="/editorial/peshawar-atelier.jpg"
              alt="Peshawar jewelry workbench with cufflinks and finishing tools"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
