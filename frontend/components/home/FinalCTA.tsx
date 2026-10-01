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
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const ruleTopRef = useRef<HTMLDivElement>(null);
  const ruleBotRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Ambient glow pulse (loop)
      gsap.to(bgGlowRef.current, {
        opacity: 0.12,
        scale: 1.15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Main timeline on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      tl
        // Top rule draws from center
        .fromTo(
          ruleTopRef.current,
          { scaleX: 0, transformOrigin: "center" },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" }
        )
        // Tag
        .fromTo(
          tagRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        )
        // Title rises with skew
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 60, skewY: 2 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.3"
        )
        // Body text
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 0.8, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.7"
        )
        // Buttons scale in
        .fromTo(
          btnsRef.current,
          { opacity: 0, y: 25, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.4)" },
          "-=0.5"
        )
        // Bottom rule draws from center
        .fromTo(
          ruleBotRef.current,
          { scaleX: 0, transformOrigin: "center" },
          { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-obsidian text-porcelain py-section-lg relative overflow-hidden"
    >
      {/* Ambient radial glow */}
      <div
        ref={bgGlowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-0 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top decorative rule */}
        <div
          ref={ruleTopRef}
          className="h-px w-32 bg-champagne-brass/40 mx-auto mb-12"
          style={{ transform: "scaleX(0)", transformOrigin: "center" }}
        />

        <div className="space-y-8">
          {/* Tag */}
          <div
            ref={tagRef}
            className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase opacity-0"
          >
            The Standard
          </div>

          <h2
            ref={titleRef}
            className="text-h2 font-display opacity-0"
            style={{ willChange: "transform" }}
          >
            Three collections, one standard.
          </h2>

          <p
            ref={textRef}
            className="text-xl max-w-2xl mx-auto leading-relaxed opacity-0"
          >
            Classical, Signature and Premium — each finished to the same level
            of care, priced for where you want to start.
          </p>

          <div
            ref={btnsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4 opacity-0"
          >
            <Button href="/shop" variant="primary">
              Shop all cufflinks
            </Button>
            <Button href="/contact" variant="secondary">
              Get in touch
            </Button>
          </div>
        </div>

        {/* Bottom decorative rule */}
        <div
          ref={ruleBotRef}
          className="h-px w-32 bg-champagne-brass/40 mx-auto mt-12"
          style={{ transform: "scaleX(0)", transformOrigin: "center" }}
        />
      </div>
    </section>
  );
}
