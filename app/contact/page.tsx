import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

export const metadata: Metadata = {
  title: "Contact — CuffKings",
  description:
    "Direct contact for CuffKings cufflinks via WhatsApp, email, and social. Located in Peshawar, Pakistan.",
};

export default function ContactPage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";

  return (
    <div className="bg-obsidian text-porcelain min-h-screen pt-24 pb-24 flex items-center">
      <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-2xl mx-auto space-y-12 text-center">
          {/* Header */}
          <Reveal direction="up" delay={0.1} className="space-y-4">
            <div className="text-xs tracking-[0.25em] text-champagne-brass font-medium">
              CUFFKINGS PESHAWAR
            </div>
            <h1 className="text-h1 font-display leading-[1.05]">
              Contact the atelier
            </h1>
            <p className="text-body text-porcelain/75 leading-relaxed max-w-lg mx-auto">
              For order confirmations, custom requests, and finish inquiries. We
              respond directly.
            </p>
          </Reveal>

          {/* Primary Action: Contact via WhatsApp */}
          <Reveal direction="up" delay={0.2}>
            <Magnetic>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  "Hello CuffKings, I am inquiring about your cufflinks."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto px-10 py-4 bg-champagne-brass text-obsidian text-sm font-medium border border-champagne-brass hover:bg-champagne-brass/90 transition-all duration-200"
              >
                Contact via WhatsApp
              </a>
            </Magnetic>
          </Reveal>

          {/* Hairline rule */}
          <div className="h-px w-24 bg-champagne-brass/30 mx-auto" />

          {/* Direct channels */}
          <Reveal direction="up" delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4 text-xs sm:text-sm">
              {/* Email */}
              <div className="space-y-1">
                <p className="text-porcelain/50">Email</p>
                <a
                  href="mailto:info@cuffkings.pk"
                  className="text-porcelain hover:text-champagne-brass transition-colors font-medium"
                >
                  info@cuffkings.pk
                </a>
              </div>

              {/* Social */}
              <div className="space-y-1">
                <p className="text-porcelain/50">Social</p>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-porcelain hover:text-champagne-brass transition-colors font-medium"
                >
                  Instagram →
                </a>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <p className="text-porcelain/50">Location</p>
                <p className="text-porcelain font-medium">Peshawar, Pakistan</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
