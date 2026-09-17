import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

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
          <div className="max-w-3xl space-y-6">
            <div className="text-xs tracking-[0.25em] text-champagne-brass font-medium">
              CUFFKINGS ATELIER
            </div>
            <h1 className="text-display font-display leading-[0.95]">
              The detail changes everything.
            </h1>
            <p className="text-body text-porcelain/80 leading-relaxed max-w-2xl pt-2">
              CuffKings focuses on men's accessories for formal dressing. Every
              pair starts with solid metal, filed surfaces and hand-set
              enamel—finished and inspected in Peshawar before it is packed.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Large Editorial Photography Break */}
      <section className="relative w-full aspect-[21/9] min-h-[350px] bg-obsidian border-b border-champagne-brass/20 overflow-hidden">
        <Image
          src="/editorial/craftsmanship-detail.jpg"
          alt="Cufflink hand finishing and filing in Peshawar workshop"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/30" />
      </section>

      {/* 3. Narrative & Materials on Porcelain */}
      <section className="bg-porcelain text-warm-charcoal py-24 lg:py-32">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Peshawar & Craft */}
            <div className="lg:col-span-6 space-y-8">
              <h2 className="text-h2 font-display leading-[1.05] text-warm-charcoal">
                Based in Peshawar. Focused on formal dressing.
              </h2>
              <div className="space-y-5 text-body text-warm-charcoal/80 leading-relaxed">
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
              </div>

              <div className="pt-4 border-t border-warm-charcoal/15 flex items-center space-x-4">
                <div className="h-px w-16 bg-champagne-brass" />
                <span className="text-xs text-warm-charcoal/60 uppercase tracking-wider">
                  Khyber Pakhtunkhwa, Pakistan
                </span>
              </div>
            </div>

            {/* Right Column: Materials Breakdown */}
            <div className="lg:col-span-6 space-y-10">
              <div className="space-y-3 pb-6 border-b border-warm-charcoal/15">
                <h3 className="text-xl font-display text-warm-charcoal">
                  Solid metal surfaces
                </h3>
                <p className="text-xs sm:text-sm text-warm-charcoal/75 leading-relaxed">
                  Gold-tone, silver-tone, and matte gunmetal. Each surface is
                  filed and mirror-polished or wire-brushed so light reflects
                  cleanly across edges.
                </p>
              </div>

              <div className="space-y-3 pb-6 border-b border-warm-charcoal/15">
                <h3 className="text-xl font-display text-warm-charcoal">
                  Deep mineral enamel
                </h3>
                <p className="text-xs sm:text-sm text-warm-charcoal/75 leading-relaxed">
                  Sapphire blue, black, and ivory fills. Set flush with the
                  cufflink perimeter to eliminate ridges that catch on fabric.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-display text-warm-charcoal">
                  Engraving and crystal pavé
                </h3>
                <p className="text-xs sm:text-sm text-warm-charcoal/75 leading-relaxed">
                  Geometric repeats, trellis lattice, and floral engraving cut
                  deep enough to provide tactile texture without ostentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Secondary Editorial Visual */}
      <section className="bg-deep-petrol text-porcelain py-20 lg:py-28 border-t border-champagne-brass/20">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] bg-obsidian overflow-hidden border border-champagne-brass/20">
              <Image
                src="/editorial/peshawar-atelier.jpg"
                alt="Peshawar workshop workbench"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-display text-porcelain">
                Finished for the occasion.
              </h3>
              <p className="text-sm text-porcelain/80 leading-relaxed">
                Whether selected for a wedding, evening formalwear, or black-tie
                dress, our pieces are built to remain understated and sharp.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-block px-8 py-3 bg-champagne-brass text-obsidian text-sm font-medium border border-champagne-brass hover:bg-champagne-brass/90 transition-all duration-200"
                >
                  Explore the pieces
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
