"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-obsidian text-porcelain py-section-lg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={contentRef} className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-h2 font-display">
              Find the right finish
            </h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
              Gold-tone, silver, gunmetal, or enamel. Each piece filed,
              polished and checked.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button href="/shop" variant="primary">
              Shop all cufflinks
            </Button>
            <Button href="/contact" variant="secondary">
              Get in touch
            </Button>
          </div>

          {/* Decorative brass line */}
          <div className="pt-8">
            <div className="h-px w-32 bg-champagne-brass/40 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
