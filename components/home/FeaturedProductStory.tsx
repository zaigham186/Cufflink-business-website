"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import ProductMedia from "@/components/product/ProductMedia";
import Magnetic from "@/components/motion/Magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedProductStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const detail1Ref = useRef<HTMLDivElement>(null);
  const detail2Ref = useRef<HTMLDivElement>(null);
  const detail3Ref = useRef<HTMLDivElement>(null);
  const detail4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Media entrance
      gsap.from(mediaWrapRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      // Stagger detail reveals
      const details = [
        detail1Ref.current,
        detail2Ref.current,
        detail3Ref.current,
        detail4Ref.current,
      ];
      gsap.from(details, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-obsidian text-porcelain py-section-lg"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Product Media with Ken Burns cinematic sequence */}
          <div ref={mediaWrapRef} className="w-full">
            <ProductMedia
              images={[
                "/products/ivory-pave-gold-1.jpg",
                "/products/ivory-pave-gold-2.jpg",
              ]}
              productName="Ivory Pavé Gold Cufflinks"
              aspectRatio="aspect-square lg:aspect-[4/5]"
            />
          </div>

          {/* Details */}
          <div className="space-y-10 lg:space-y-12">
            <div className="space-y-2 pb-2">
              <span className="text-xs tracking-[0.25em] text-champagne-brass font-medium">
                FEATURED PIECE
              </span>
              <h2 className="text-2xl sm:text-3xl font-display text-porcelain">
                Ivory Pavé Gold Cufflinks
              </h2>
            </div>

            <div ref={detail1Ref} className="space-y-2">
              <div className="text-xs text-champagne-brass tracking-wider">01</div>
              <h3 className="text-2xl sm:text-3xl font-display">Polished metal.</h3>
              <p className="text-sm opacity-70 leading-relaxed max-w-md">
                Gold-tone surfaces filed and polished to catch light precisely across formal suit cuffs.
              </p>
            </div>

            <div ref={detail2Ref} className="space-y-2">
              <div className="text-xs text-champagne-brass tracking-wider">02</div>
              <h3 className="text-2xl sm:text-3xl font-display">Ivory enamel.</h3>
              <p className="text-sm opacity-70 leading-relaxed max-w-md">
                Deep mineral enamel fill, leveled and set flush with perimeter metal edges.
              </p>
            </div>

            <div ref={detail3Ref} className="space-y-2">
              <div className="text-xs text-champagne-brass tracking-wider">03</div>
              <h3 className="text-2xl sm:text-3xl font-display">Crystal pavé.</h3>
              <p className="text-sm opacity-70 leading-relaxed max-w-md">
                Precise pavé border cut to glint under evening light without ostentation.
              </p>
            </div>

            <div ref={detail4Ref} className="space-y-6 pt-2">
              <div className="space-y-2">
                <div className="text-xs text-champagne-brass tracking-wider">04</div>
                <h3 className="text-2xl sm:text-3xl font-display">
                  Finished for formal dressing.
                </h3>
                <p className="text-sm opacity-70 leading-relaxed max-w-md">
                  Filed edges, secure swivel toggle closure, calibrated weight.
                </p>
              </div>

              <Magnetic>
                <Button
                  href="/product/ivory-pave-gold-cufflinks"
                  variant="primary"
                >
                  View this piece
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
