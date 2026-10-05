import Link from "next/link";
import Reveal from "@/frontend/components/motion/Reveal";

export default function CollectionExplainer() {
  return (
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
  );
}
