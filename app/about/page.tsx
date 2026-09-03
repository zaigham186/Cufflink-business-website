import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CuffKings — Premium men's cufflinks from Peshawar",
  description:
    "CuffKings focuses on men's accessories for formal dressing. Based in Peshawar, Pakistan, we work with polished metal, enamel and engraved patterns.",
};

export default function AboutPage() {
  return (
    <div className="bg-obsidian min-h-screen">
      {/* Hero section */}
      <div className="bg-obsidian text-porcelain pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <h1 className="text-h1 font-display mb-8 leading-tight">
            Built around the details of formal dressing
          </h1>
          <p className="text-xl leading-relaxed opacity-90">
            CuffKings focuses on men's accessories for formal dressing. Every
            piece starts with polished metal, enamel work and engraved patterns
            — finished and checked before it's packed.
          </p>
        </div>
      </div>

      {/* Brass divider */}
      <div className="h-px bg-champagne-brass/20 max-w-container mx-auto" />

      {/* Content */}
      <div className="bg-porcelain">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
          {/* What we do */}
          <section className="space-y-6">
            <h2 className="text-3xl font-display text-warm-charcoal">What we do</h2>
            <div className="space-y-4 text-base leading-relaxed text-warm-charcoal/80">
              <p>
                We design and source premium cufflinks for men who pay attention
                to finishing details. Each piece is built around materials that
                show quality up close: gold-tone metal, deep enamel, gunmetal
                finishes, and crystal detailing.
              </p>
              <p>
                Every cufflink is filed, polished, and checked before packaging.
                The work shows in the surface, the weight, and the way light
                catches engraved patterns.
              </p>
            </div>
          </section>

          {/* Materials */}
          <section className="space-y-8">
            <h2 className="text-3xl font-display text-warm-charcoal">Materials and finish</h2>
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-3">
                <h3 className="font-display text-lg text-warm-charcoal">Metal surfaces</h3>
                <p className="text-sm leading-relaxed text-warm-charcoal/70">
                  Gold-tone, silver-tone, and gunmetal finishes. Polished where
                  light should catch it, matte where it shouldn't.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-lg text-warm-charcoal">Enamel work</h3>
                <p className="text-sm leading-relaxed text-warm-charcoal/70">
                  Deep enamel fill in blue, black, and ivory. Applied carefully,
                  leveled, and set to sit flush with metal edges.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-lg text-warm-charcoal">Engraved patterns</h3>
                <p className="text-sm leading-relaxed text-warm-charcoal/70">
                  Fine line work, geometric repeats, and floral motifs. Cut into
                  the metal to give surface texture and visual depth.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-lg text-warm-charcoal">Crystal detailing</h3>
                <p className="text-sm leading-relaxed text-warm-charcoal/70">
                  Pavé-set crystals on select pieces. Small, precise, and set to
                  catch light without looking excessive.
                </p>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="space-y-6">
            <h2 className="text-3xl font-display text-warm-charcoal">Based in Peshawar</h2>
            <div className="space-y-4 text-base leading-relaxed text-warm-charcoal/80">
              <p>
                CuffKings operates from Peshawar, Pakistan. We work with local
                suppliers and craftspeople who understand metal finishing and
                detailed accessory work.
              </p>
              <p>
                Orders ship from Peshawar to addresses across Pakistan. For
                international orders or custom requests, contact us directly.
              </p>
            </div>
            {/* Brass line accent */}
            <div className="pt-4 flex items-center gap-4">
              <div className="h-px w-24 bg-champagne-brass/40" />
              <span className="text-sm text-champagne-brass/70">Peshawar, Pakistan</span>
            </div>
          </section>
        </div>
      </div>

      {/* Quality commitment section - Dark */}
      <div className="bg-deep-petrol">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="space-y-8">
            <h2 className="text-3xl font-display text-porcelain">Quality commitment</h2>
            <ul className="space-y-3 text-base text-porcelain/80">
              <li className="flex items-start gap-3">
                <span className="text-champagne-brass mt-1">•</span>
                <span>Each piece checked for surface finish and closure function</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-champagne-brass mt-1">•</span>
                <span>Polished edges, secure toggle backs, weight-tested</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-champagne-brass mt-1">•</span>
                <span>Enamel inspected for levelness and coverage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-champagne-brass mt-1">•</span>
                <span>Engraving checked for depth and clarity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-champagne-brass mt-1">•</span>
                <span>Packaged in protective boxes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
