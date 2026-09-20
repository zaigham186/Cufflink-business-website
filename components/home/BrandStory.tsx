"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      gsap.from(contentRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });

      gsap.from(accentRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: accentRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-deep-petrol text-porcelain py-section-lg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-8">
            <h2 ref={titleRef} className="text-h2 font-display">
              Built around the details of formal dressing
            </h2>
            <div ref={contentRef} className="space-y-6 text-lg opacity-90 leading-relaxed">
              <p>
                CuffKings makes cufflinks for men who dress with intention —
                three collections, Classical, Signature and Premium, each built
                around a different level of detail and finish. Based in Peshawar,
                Pakistan, we work with metal, enamel and stone across every tier,
                from a clean Classical finish to Premium pieces set with fine
                engraving.
              </p>
            </div>
          </div>

          {/* Decorative accent */}
          <div ref={accentRef} className="flex items-center space-x-4 pt-8 origin-left">
            <div className="h-px w-24 bg-champagne-brass/40" />
            <span className="text-sm font-medium text-champagne-brass/60">
              Peshawar, Pakistan
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
