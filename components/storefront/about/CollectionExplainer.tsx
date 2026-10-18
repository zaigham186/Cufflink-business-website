import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function CollectionExplainer() {
  return (
    <section className="bg-obsidian text-porcelain py-24 lg:py-32 border-t border-champagne-brass/20">
      <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
        <Reveal direction="up" delay={0.1} className="max-w-3xl mb-16 lg:mb-20">
          <div className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase mb-4">
            THE COLLECTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display leading-[1.05] text-porcelain">
            Classical, Signature, Premium.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Classical Card */}
          <Reveal direction="up" delay={0.15} className="h-full">
            <Link
              href="/shop?category=classical"
              className="group flex flex-col justify-between h-full p-8 bg-obsidian border border-champagne-brass/25 hover:border-champagne-brass transition-all duration-300 relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs tracking-wider">
                  <span className="text-champagne-brass font-medium uppercase">Classical</span>
                  <span className="text-porcelain/60 font-mono">Rs. 700–1,000</span>
                </div>
                <h3 className="text-2xl font-display text-porcelain group-hover:text-champagne-brass transition-colors">
                  Classical
                </h3>
                <div className="text-sm text-porcelain/75 leading-relaxed space-y-2 pt-2">
                  <p>For boardroom, Friday prayer, and daily business formalwear.</p>
                  <p>Solid brass substrate. Mirror-polished or brushed finish.</p>
                  <p>Clean square, round, and rectangular silhouettes.</p>
                  <p className="text-champagne-brass/90">No enamel. No stones. Pure metalwork.</p>
                </div>
              </div>
              <div className="pt-8 mt-6 border-t border-champagne-brass/15 flex items-center justify-between text-xs font-medium text-champagne-brass group-hover:text-champagne-brass-light">
                <span>Explore Classical</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </Link>
          </Reveal>

          {/* Signature Card */}
          <Reveal direction="up" delay={0.25} className="h-full">
            <Link
              href="/shop?category=signature"
              className="group flex flex-col justify-between h-full p-8 bg-obsidian border border-champagne-brass/25 hover:border-champagne-brass transition-all duration-300 relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs tracking-wider">
                  <span className="text-champagne-brass font-medium uppercase">Signature</span>
                  <span className="text-porcelain/60 font-mono">Rs. 1,000–1,500</span>
                </div>
                <h3 className="text-2xl font-display text-porcelain group-hover:text-champagne-brass transition-colors">
                  Signature
                </h3>
                <div className="text-sm text-porcelain/75 leading-relaxed space-y-2 pt-2">
                  <p>For nikah ceremonies, business dinners, and Eid formal dress.</p>
                  <p>Cold-cured vitreous enamel in sapphire, black, and ivory.</p>
                  <p>Leveled flush with beveled brass border.</p>
                  <p className="text-champagne-brass/90">Engraved floral and geometric patterns.</p>
                </div>
              </div>
              <div className="pt-8 mt-6 border-t border-champagne-brass/15 flex items-center justify-between text-xs font-medium text-champagne-brass group-hover:text-champagne-brass-light">
                <span>Explore Signature</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </Link>
          </Reveal>

          {/* Premium Card */}
          <Reveal direction="up" delay={0.35} className="h-full">
            <Link
              href="/shop?category=premium"
              className="group flex flex-col justify-between h-full p-8 bg-obsidian border border-champagne-brass/25 hover:border-champagne-brass transition-all duration-300 relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs tracking-wider">
                  <span className="text-champagne-brass font-medium uppercase">Premium</span>
                  <span className="text-porcelain/60 font-mono">Rs. 1,500–2,500</span>
                </div>
                <h3 className="text-2xl font-display text-porcelain group-hover:text-champagne-brass transition-colors">
                  Premium
                </h3>
                <div className="text-sm text-porcelain/75 leading-relaxed space-y-2 pt-2">
                  <p>For weddings, black-tie galas, and sherwani occasions.</p>
                  <p>Austrian pavé crystals hand-set in rhodium-plated brass.</p>
                  <p>Deep relief engraving. High-mirror finish.</p>
                  <p className="text-champagne-brass/90">The heaviest weight in the range: 18–22g.</p>
                </div>
              </div>
              <div className="pt-8 mt-6 border-t border-champagne-brass/15 flex items-center justify-between text-xs font-medium text-champagne-brass group-hover:text-champagne-brass-light">
                <span>Explore Premium</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
