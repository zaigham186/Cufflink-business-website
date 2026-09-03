"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  {
    name: "Gold Cufflinks",
    slug: "gold-cufflinks",
    description: "Gold-tone metal with polished finishes",
    size: "large",
  },
  {
    name: "Silver Cufflinks",
    slug: "silver-cufflinks",
    description: "Silver-tone with enamel detailing",
    size: "small",
  },
  {
    name: "Gunmetal Cufflinks",
    slug: "gunmetal-cufflinks",
    description: "Matte gunmetal with black enamel",
    size: "small",
  },
  {
    name: "Statement Cufflinks",
    slug: "statement-cufflinks",
    description: "Bold designs and unique patterns",
    size: "wide",
  },
  {
    name: "Enamel Cufflinks",
    slug: "enamel-cufflinks",
    description: "Deep enamel with engraved patterns",
    size: "medium",
  },
  {
    name: "Gift Sets",
    slug: "gift-sets",
    description: "Curated sets in presentation boxes",
    size: "medium",
  },
];

export default function CategoryGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !title) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(title, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
        },
      });

      // Cards stagger animation
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-deep-petrol py-section">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <h2
          ref={titleRef}
          className="text-h2 font-display text-porcelain mb-12 lg:mb-16"
        >
          Shop by collection
        </h2>

        {/* Asymmetric grid - desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-4 auto-rows-[280px]">
          <div
            ref={(el) => {
              if (el) cardsRef.current[0] = el;
            }}
            className="col-span-2 row-span-2"
          >
            <CategoryCard category={categories[0]} />
          </div>

          <div
            ref={(el) => {
              if (el) cardsRef.current[1] = el;
            }}
            className="col-span-1"
          >
            <CategoryCard category={categories[1]} />
          </div>

          <div
            ref={(el) => {
              if (el) cardsRef.current[2] = el;
            }}
            className="col-span-1"
          >
            <CategoryCard category={categories[2]} />
          </div>

          <div
            ref={(el) => {
              if (el) cardsRef.current[3] = el;
            }}
            className="col-span-1"
          >
            <CategoryCard category={categories[4]} />
          </div>

          <div
            ref={(el) => {
              if (el) cardsRef.current[4] = el;
            }}
            className="col-span-1"
          >
            <CategoryCard category={categories[5]} />
          </div>

          <div
            ref={(el) => {
              if (el) cardsRef.current[5] = el;
            }}
            className="col-span-4"
          >
            <CategoryCard category={categories[3]} />
          </div>
        </div>

        {/* Mobile stack */}
        <div className="lg:hidden space-y-4">
          {categories.map((category, index) => (
            <div
              key={category.slug}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
}: {
  category: { name: string; slug: string; description: string };
}) {
  return (
    <Link
      href={`/shop/${category.slug}`}
      className="group block h-full bg-obsidian border border-champagne-brass/20 hover:border-champagne-brass transition-all duration-300 overflow-hidden"
    >
      <div className="h-full flex flex-col justify-between p-8">
        <div className="space-y-2">
          <h3 className="text-xl font-display text-porcelain group-hover:text-champagne-brass transition-colors duration-300">
            {category.name}
          </h3>
          <p className="text-sm text-porcelain/60">{category.description}</p>
        </div>

        <div className="flex items-center text-sm font-medium text-champagne-brass">
          <span>View collection</span>
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
