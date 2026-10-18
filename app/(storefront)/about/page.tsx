import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import CollectionExplainer from "@/components/storefront/about/CollectionExplainer";

export const metadata: Metadata = {
  title: "Our Story — CuffKings",
  description:
    "Cufflinks built around solid brass, enamel work, and crystal setting. Handcrafted and inspected in Peshawar, Pakistan with nationwide cash on delivery.",
};

const SPECIFICATIONS = [
  {
    num: "01",
    title: "Solid Jeweler's Brass",
    description:
      "Every piece begins with a solid brass substrate, weighted between 14g and 18g. Never hollow stampings or lightweight zinc alloys.",
  },
  {
    num: "02",
    title: "Cold-Cured Enamel",
    description:
      "Mineral enamel fills are poured by hand, cured, and leveled flush against beveled metal borders to prevent chipping or dulling.",
  },
  {
    num: "03",
    title: "Tested Swivel Bar",
    description:
      "Tension springs undergo positive-lock cycle checks to guarantee sleeves stay neatly anchored throughout long formal gatherings.",
  },
  {
    num: "04",
    title: "Peshawar Inspection",
    description:
      "Each pair is hand-cleaned, micro-wax sealed against oxidation, and nestled into a protective presentation box prior to dispatch.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-obsidian text-porcelain pt-20">
      {/* 1. Hero Block (Dark Obsidian) */}
      <section className="py-24 lg:py-32 border-b border-champagne-brass/20 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
          <Reveal direction="up" delay={0.1}>
            <div className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase mb-6">
              CUFFKINGS — PESHAWAR, PAKISTAN
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.2] text-porcelain max-w-3xl mx-auto italic">
              &ldquo;A cufflink should anchor a cuff<br className="hidden sm:inline" /> without pulling the fabric.&rdquo;
            </h1>

            <p className="text-sm sm:text-base text-porcelain/75 pt-6 tracking-wide font-sans">
              Three collections. Solid brass. Nationwide delivery.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. What We Make (Porcelain Background, Two Columns, No Images) */}
      <section className="bg-porcelain text-warm-charcoal py-24 lg:py-32">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Headline */}
            <div className="lg:col-span-5 space-y-4">
              <Reveal direction="up" delay={0.1}>
                <div className="h-px w-16 bg-champagne-brass mb-6" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display leading-[1.1] text-warm-charcoal">
                  Based in Peshawar.<br />
                  Focused on formal dressing.
                </h2>
              </Reveal>
            </div>

            {/* Right Body Text (3 Paragraphs) */}
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-warm-charcoal/80 leading-relaxed">
              <Reveal direction="up" delay={0.2}>
                <p>
                  CuffKings makes cufflinks for men who dress with intention. Every pair is built on a solid brass substrate — not lightweight zinc stampings — and finished across three collections: Classical, Signature, and Premium.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.25}>
                <p>
                  Classical pieces use clean geometric silhouettes in mirror-polished or brushed brass. Signature pieces add hand-applied mineral enamel — sapphire blue, jet black, ivory — leveled flush with the metal border. Premium pieces carry hand-set Austrian crystals and deep relief engraving, calibrated for weddings and formal evening wear.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <p>
                  We ship nationally across Pakistan with cash on delivery. Every pair is hand-inspected and packed in a presentation box before dispatch from Peshawar.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Three-Item Horizontal Fact Row */}
          <div className="mt-20 pt-12 border-t border-warm-charcoal/15 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Reveal direction="up" delay={0.35}>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-display text-warm-charcoal font-medium">
                  14–22g
                </div>
                <div className="text-xs sm:text-sm text-warm-charcoal/60 mt-1 uppercase tracking-wider">
                  Calibrated pair weight
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-display text-warm-charcoal font-medium">
                  3
                </div>
                <div className="text-xs sm:text-sm text-warm-charcoal/60 mt-1 uppercase tracking-wider">
                  Focused collections
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.45}>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-display text-warm-charcoal font-medium">
                  COD
                </div>
                <div className="text-xs sm:text-sm text-warm-charcoal/60 mt-1 uppercase tracking-wider">
                  Nationwide cash on delivery
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. The Three Collections (Dark Obsidian Background) */}
      <CollectionExplainer />

      {/* 4. Why Brass, Enamel, and Crystal (Porcelain Background, 2x2 Grid) */}
      <section className="bg-porcelain text-warm-charcoal py-24 lg:py-32">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
          <Reveal direction="up" delay={0.1} className="max-w-3xl mb-16">
            <div className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase mb-4">
              CONSTRUCTION & SPECIFICATIONS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display leading-[1.1] text-warm-charcoal">
              Solid brass, cold-cured enamel, and tested mechanics.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {SPECIFICATIONS.map((spec, i) => (
              <Reveal key={spec.num} direction="up" delay={0.15 + i * 0.1}>
                <div className="p-8 bg-white border border-warm-charcoal/15 hover:border-champagne-brass transition-colors duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-champagne-brass mb-3">
                      {spec.num}
                    </div>
                    <h3 className="text-xl font-display text-warm-charcoal mb-3">
                      {spec.title}
                    </h3>
                    <p className="text-sm text-warm-charcoal/75 leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Contact Strip (Dark Obsidian Background) */}
      <section className="bg-obsidian text-porcelain py-24 lg:py-32 border-t border-champagne-brass/20 text-center">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
          <Reveal direction="up" delay={0.1}>
            <div className="h-px w-20 bg-champagne-brass mx-auto mb-8" />

            <h2 className="text-3xl sm:text-4xl font-display text-porcelain">
              Order by WhatsApp or on the site.
            </h2>

            <p className="text-sm sm:text-base text-porcelain/80 leading-relaxed max-w-xl mx-auto pt-2">
              Browse the collection online or message us directly at +92 371 9145871.
              <br />
              Cash on delivery available across all major cities in Pakistan.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Magnetic>
                <Link
                  href="/shop"
                  className="inline-block px-8 py-3.5 bg-champagne-brass text-obsidian text-sm font-medium border border-champagne-brass hover:bg-champagne-brass/90 transition-all duration-200"
                >
                  Browse the collection
                </Link>
              </Magnetic>
              <a
                href="https://wa.me/923719145871"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3.5 bg-transparent text-porcelain text-sm font-medium border border-porcelain/30 hover:border-champagne-brass hover:text-champagne-brass transition-all duration-200"
              >
                Message on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
