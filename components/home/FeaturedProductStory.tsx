"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedProductStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const detail1Ref = useRef<HTMLDivElement>(null);
  const detail2Ref = useRef<HTMLDivElement>(null);
  const detail3Ref = useRef<HTMLDivElement>(null);
  const detail4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.from(imageRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });

      // Stagger detail reveals
      const details = [detail1Ref.current, detail2Ref.current, detail3Ref.current, detail4Ref.current];
      gsap.from(details, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        }
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
          {/* Image */}
          <div ref={imageRef} className="relative aspect-square lg:aspect-[4/5]">
            <Image
              src="/products/ivory-pave-gold-1.jpg"
              alt="Ivory Pavé Gold Cufflinks"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Details */}
          <div className="space-y-12">
            <div ref={detail1Ref} className="space-y-3">
              <div className="text-sm text-champagne-brass tracking-wider">01</div>
              <h3 className="text-3xl font-display">Polished metal.</h3>
              <p className="text-base opacity-70 leading-relaxed">
                Gold-tone surfaces filed and polished to catch light precisely.
              </p>
            </div>

            <div ref={detail2Ref} className="space-y-3">
              <div className="text-sm text-champagne-brass tracking-wider">02</div>
              <h3 className="text-3xl font-display">Ivory enamel.</h3>
              <p className="text-base opacity-70 leading-relaxed">
                Deep enamel fill, leveled and set flush with metal edges.
              </p>
            </div>

            <div ref={detail3Ref} className="space-y-3">
              <div className="text-sm text-champagne-brass tracking-wider">03</div>
              <h3 className="text-3xl font-display">Crystal pavé.</h3>
              <p className="text-base opacity-70 leading-relaxed">
                Small, precise crystal setting designed to catch light without excess.
              </p>
            </div>

            <div ref={detail4Ref} className="space-y-6">
              <div className="space-y-3">
                <div className="text-sm text-champagne-brass tracking-wider">04</div>
                <h3 className="text-3xl font-display">Finished for formal dressing.</h3>
                <p className="text-base opacity-70 leading-relaxed">
                  Filed edges, secure toggle closure, weight-tested.
                </p>
              </div>
              <Button href="/product/ivory-pave-gold-cufflinks" variant="secondary">
                View this piece
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
