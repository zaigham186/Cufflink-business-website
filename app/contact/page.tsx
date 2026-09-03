import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact CuffKings — Get in touch",
  description:
    "Contact CuffKings for product questions, custom orders, or general inquiries. WhatsApp and email available.",
};

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <div className="bg-obsidian min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="space-y-16">
          <div className="space-y-6">
            <h1 className="text-h1 font-display text-porcelain">Get in touch</h1>
            <p className="text-xl leading-relaxed text-porcelain/80 max-w-2xl">
              Questions about products, custom orders, bulk purchases, or
              international shipping? We're here to help.
            </p>
          </div>

          {/* Contact methods */}
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {/* WhatsApp */}
            <div className="bg-deep-petrol border border-champagne-brass/20 p-8 space-y-6 group hover:border-champagne-brass/60 transition-all duration-300">
              <div className="w-16 h-16 border border-champagne-brass/30 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-champagne-brass"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div className="space-y-3">
                <h2 className="font-display text-xl text-porcelain">WhatsApp</h2>
                <p className="text-sm text-porcelain/70 leading-relaxed">
                  Fastest way to reach us. Product questions, order status, or
                  custom requests.
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium text-champagne-brass hover:text-porcelain transition-colors duration-200 mt-2"
                >
                  Open WhatsApp →
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-deep-petrol border border-champagne-brass/20 p-8 space-y-6 group hover:border-champagne-brass/60 transition-all duration-300">
              <div className="w-16 h-16 border border-champagne-brass/30 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-champagne-brass"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="space-y-3">
                <h2 className="font-display text-xl text-porcelain">Email</h2>
                <p className="text-sm text-porcelain/70 leading-relaxed">
                  For detailed inquiries, bulk orders, or partnership requests.
                </p>
                <a
                  href="mailto:info@cuffkings.pk"
                  className="inline-block text-sm font-medium text-champagne-brass hover:text-porcelain transition-colors duration-200 mt-2"
                >
                  info@cuffkings.pk →
                </a>
              </div>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="bg-porcelain border border-champagne-brass/20 p-8 lg:p-12 space-y-8">
            <h2 className="font-display text-2xl text-warm-charcoal">Location & availability</h2>
            <div className="grid sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-medium text-warm-charcoal mb-2">Based in</p>
                <p className="text-warm-charcoal/70">Peshawar, Khyber Pakhtunkhwa, Pakistan</p>
              </div>
              <div>
                <p className="font-medium text-warm-charcoal mb-2">Response time</p>
                <p className="text-warm-charcoal/70">
                  WhatsApp: Usually within a few hours
                  <br />
                  Email: Within 24 hours on business days
                </p>
              </div>
              <div>
                <p className="font-medium text-warm-charcoal mb-2">
                  Shipping coverage
                </p>
                <p className="text-warm-charcoal/70">
                  We ship across Pakistan. International orders: contact us
                  first to arrange shipping.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-8">
            <h2 className="font-display text-2xl text-porcelain">Common questions</h2>
            <div className="space-y-6">
              <div className="pb-6 border-b border-champagne-brass/20">
                <h3 className="font-medium text-porcelain mb-3">
                  Can I see products in person?
                </h3>
                <p className="text-sm text-porcelain/70 leading-relaxed">
                  Contact us on WhatsApp to arrange a viewing in Peshawar. We
                  can show you available pieces and discuss finishes, materials,
                  and custom options.
                </p>
              </div>
              <div className="pb-6 border-b border-champagne-brass/20">
                <h3 className="font-medium text-porcelain mb-3">Do you do custom orders?</h3>
                <p className="text-sm text-porcelain/70 leading-relaxed">
                  Yes. If you need specific colors, engraving, monograms, or
                  bulk orders for events, reach out with details and we'll work
                  out what's possible.
                </p>
              </div>
              <div className="pb-6 border-b border-champagne-brass/20">
                <h3 className="font-medium text-porcelain mb-3">How long does shipping take?</h3>
                <p className="text-sm text-porcelain/70 leading-relaxed">
                  Within Pakistan: typically 3-5 business days. Timing varies by
                  city and courier availability. We'll confirm delivery estimates
                  when you place your order.
                </p>
              </div>
              <div className="pb-6 border-b border-champagne-brass/20">
                <h3 className="font-medium text-porcelain mb-3">What if a piece is out of stock?</h3>
                <p className="text-sm text-porcelain/70 leading-relaxed">
                  Contact us — we can check restocking timelines or suggest
                  similar pieces with the same finish, material, or pattern.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
