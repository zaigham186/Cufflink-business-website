import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";
import MoreAboutCufflinks from "@/components/home/MoreAboutCufflinks";
import Magnetic from "@/components/motion/Magnetic";

export const metadata: Metadata = {
  title: "About — CuffKings",
  description:
    "Cufflinks built around polished metal, considered patterns and the details of formal dressing. Handcrafted in Peshawar, Pakistan.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-obsidian text-porcelain pt-20">
      {/* 1. Header Block */}
      <section className="py-20 lg:py-28 border-b border-champagne-brass/20">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
          <Reveal direction="up" delay={0.1} className="max-w-3xl space-y-6">
            <div className="text-xs tracking-[0.25em] text-champagne-brass font-medium">
              CUFFKINGS ATELIER
            </div>
            <h1 className="text-display font-display leading-[0.95]">
              The detail changes everything.
            </h1>
            <p className="text-body text-porcelain/80 leading-relaxed max-w-2xl pt-2">
              CuffKings focuses on men&apos;s accessories for formal dressing.
              Crafted across three collections — Classical, Signature, and Premium —
              every pair starts with solid metal, filed surfaces and hand-set
              enamel, finished and inspected in Peshawar before it is packed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Large Editorial Photography Break with ImageReveal */}
      <section className="relative w-full aspect-[21/9] min-h-[350px] bg-obsidian border-b border-champagne-brass/20 overflow-hidden">
        <ImageReveal direction="up" duration={1.3} className="w-full h-full">
          <div className="relative w-full h-[45vw] min-h-[350px]">
            <Image
              src="/editorial/craftsmanship-detail.jpg"
              alt="Cufflink hand finishing and filing in Peshawar workshop"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-obsidian/30" />
          </div>
        </ImageReveal>
      </section>

      {/* 3. Narrative & Materials on Porcelain */}
      <section className="bg-porcelain text-warm-charcoal py-24 lg:py-32">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Peshawar & Craft */}
            <div className="lg:col-span-6 space-y-8">
              <Reveal direction="up" delay={0.1}>
                <h2 className="text-h2 font-display leading-[1.05] text-warm-charcoal">
                  Based in Peshawar. Focused on formal dressing.
                </h2>
              </Reveal>
              <Reveal direction="up" delay={0.2} className="space-y-5 text-body text-warm-charcoal/80 leading-relaxed">
                <p>
                  Formal dressing leaves little room for excess. When a suit fits
                  and a shirt cuff sits right at the wrist, the cufflink is the
                  single point where craftsmanship, weight, and metal finish meet.
                </p>
                <p>
                  Operating from Peshawar, Pakistan, we work closely with
                  metalworkers and enamel craftspeople. We focus on finishing:
                  filing sharp burrs, balancing weight so the cuff hangs cleanly,
                  and testing toggle backings for reliable tension.
                </p>
              </Reveal>

              <div className="pt-4 border-t border-warm-charcoal/15 flex items-center space-x-4">
                <div className="h-px w-16 bg-champagne-brass" />
                <span className="text-xs text-warm-charcoal/60 uppercase tracking-wider">
                  Khyber Pakhtunkhwa, Pakistan
                </span>
              </div>
            </div>

            {/* Right Column: Materials Breakdown */}
            <div className="lg:col-span-6 space-y-10">
              <Reveal direction="up" delay={0.1} className="space-y-3 pb-6 border-b border-warm-charcoal/15">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-display text-warm-charcoal">
                    Solid metal surfaces
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-warm-charcoal/60 font-medium">
                    (Classical and above)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-warm-charcoal/75 leading-relaxed">
                  Gold-tone, silver-tone, and matte gunmetal. Each surface is
                  filed and mirror-polished or wire-brushed so light reflects
                  cleanly across edges.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.2} className="space-y-3 pb-6 border-b border-warm-charcoal/15">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-display text-warm-charcoal">
                    Deep mineral enamel
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-warm-charcoal/60 font-medium">
                    (Signature and above)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-warm-charcoal/75 leading-relaxed">
                  Sapphire blue, black, and ivory fills. Set flush with the
                  cufflink perimeter to eliminate ridges that catch on fabric.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.3} className="space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-display text-warm-charcoal">
                    Engraving and crystal pavé
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-warm-charcoal/60 font-medium">
                    (Premium)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-warm-charcoal/75 leading-relaxed">
                  Geometric repeats, trellis lattice, and floral engraving cut
                  deep enough to provide tactile texture without ostentation.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3b. Three Collections, One Standard of Finish */}
      <section className="bg-obsidian text-porcelain py-24 lg:py-32 border-t border-champagne-brass/20">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
          <Reveal direction="up" delay={0.1} className="max-w-3xl mb-16 lg:mb-20">
            <div className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase mb-4">
              THE THREE TIERS
            </div>
            <h2 className="text-h2 font-display leading-[1.05] text-porcelain">
              Three collections, one standard of finish.
            </h2>
            <p className="text-body text-porcelain/75 leading-relaxed mt-4 max-w-2xl">
              From clean daily essentials to ornate ceremonial statements, each tier is defined by its materials and finish complexity—never by compromises in construction.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Classical */}
            <Reveal direction="up" delay={0.15} className="h-full">
              <Link
                href="/shop?category=classical"
                className="group flex flex-col justify-between h-full p-8 bg-obsidian/60 border border-champagne-brass/20 hover:border-champagne-brass transition-all duration-300 relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs tracking-wider">
                    <span className="text-champagne-brass font-medium uppercase">Classical</span>
                    <span className="text-porcelain/60">Rs. 700–800</span>
                  </div>
                  <h3 className="text-2xl font-display text-porcelain group-hover:text-champagne-brass transition-colors">
                    Classical Collection
                  </h3>
                  <p className="text-sm text-porcelain/75 leading-relaxed">
                    A clean, single-finish surface — polished or brushed metal, precise edges, nothing extra. Built for daily formal wear.
                  </p>
                </div>
                <div className="pt-8 mt-6 border-t border-champagne-brass/15 flex items-center justify-between text-xs font-medium text-champagne-brass">
                  <span>Explore Classical</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </Link>
            </Reveal>

            {/* Signature */}
            <Reveal direction="up" delay={0.25} className="h-full">
              <Link
                href="/shop?category=signature"
                className="group flex flex-col justify-between h-full p-8 bg-obsidian/60 border border-champagne-brass/20 hover:border-champagne-brass transition-all duration-300 relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs tracking-wider">
                    <span className="text-champagne-brass font-medium uppercase">Signature</span>
                    <span className="text-porcelain/60">Rs. 1,000–1,400</span>
                  </div>
                  <h3 className="text-2xl font-display text-porcelain group-hover:text-champagne-brass transition-colors">
                    Signature Collection
                  </h3>
                  <p className="text-sm text-porcelain/75 leading-relaxed">
                    Metal paired with enamel or engraved detail — a level of finish worth a second look up close.
                  </p>
                </div>
                <div className="pt-8 mt-6 border-t border-champagne-brass/15 flex items-center justify-between text-xs font-medium text-champagne-brass">
                  <span>Explore Signature</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </Link>
            </Reveal>

            {/* Premium */}
            <Reveal direction="up" delay={0.35} className="h-full">
              <Link
                href="/shop?category=premium"
                className="group flex flex-col justify-between h-full p-8 bg-obsidian/60 border border-champagne-brass/20 hover:border-champagne-brass transition-all duration-300 relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs tracking-wider">
                    <span className="text-champagne-brass font-medium uppercase">Premium</span>
                    <span className="text-porcelain/60">Rs. 1,500–2,500</span>
                  </div>
                  <h3 className="text-2xl font-display text-porcelain group-hover:text-champagne-brass transition-colors">
                    Premium Collection
                  </h3>
                  <p className="text-sm text-porcelain/75 leading-relaxed">
                    Crystal pavé, fine engraving, and the most demanding finishing work we do — reserved for occasions that call for it.
                  </p>
                </div>
                <div className="pt-8 mt-6 border-t border-champagne-brass/15 flex items-center justify-between text-xs font-medium text-champagne-brass">
                  <span>Explore Premium</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>


      {/* 4. Atelier Weight & Sartorial Anatomy (Moved from Home for Pacing) */}
      <MoreAboutCufflinks />

      {/* 5. Concluding Atelier CTA */}
      <section className="bg-obsidian text-porcelain py-20 lg:py-28 border-t border-champagne-brass/20 text-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
          <Reveal direction="up">
            <h3 className="text-2xl sm:text-3xl font-display text-porcelain">
              Finished for the occasion.
            </h3>
            <p className="text-sm text-porcelain/80 leading-relaxed max-w-xl mx-auto pt-2">
              Whether selected for a wedding, evening formalwear, or black-tie
              dress, our pieces are built to remain understated and sharp.
            </p>
            <div className="pt-6">
              <Magnetic>
                <Link
                  href="/shop"
                  className="inline-block px-8 py-3.5 bg-champagne-brass text-obsidian text-sm font-medium border border-champagne-brass hover:bg-champagne-brass/90 transition-all duration-200"
                >
                  Explore the pieces
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
