import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";
import ContactInquiryForm from "@/components/contact/ContactInquiryForm";
import ContactChannels from "@/components/contact/ContactChannels";
import ContactFAQ from "@/components/contact/ContactFAQ";

export const metadata: Metadata = {
  title: "Contact — CuffKings",
  description:
    "Direct contact for CuffKings cufflinks via WhatsApp, email, and social. Located in Peshawar, Pakistan.",
};

export default function ContactPage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";

  return (
    <div className="bg-obsidian text-porcelain min-h-screen pt-20">
      {/* 1. Header Block */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-champagne-brass/20">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <Reveal direction="up" delay={0.1} className="max-w-2xl mx-auto space-y-4">
            <div className="text-xs tracking-[0.25em] text-champagne-brass font-medium">
              CUFFKINGS PESHAWAR
            </div>
            <h1 className="text-display font-display leading-[0.95]">
              Contact the atelier
            </h1>
            <p className="text-body text-porcelain/75 leading-relaxed max-w-lg mx-auto pt-2">
              For order confirmations, custom requests, and finish inquiries. We
              respond directly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Editorial Photography Break (Matches About Page Convention) */}
      <section className="relative w-full aspect-[21/9] min-h-[320px] bg-obsidian border-b border-champagne-brass/20 overflow-hidden">
        <ImageReveal direction="up" duration={1.3} className="w-full h-full">
          <div className="relative w-full h-[45vw] min-h-[320px]">
            <Image
              src="/editorial/contact-editorial.jpg"
              alt="CuffKings atelier workshop desk with cufflinks, bespoke tailoring tools and ledger"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-obsidian/35" />
          </div>
        </ImageReveal>
      </section>

      {/* 3. Interactive Section: Inquiry Form & Direct Channels */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (7 cols): WhatsApp Inquiry Form */}
            <div className="lg:col-span-7">
              <Reveal direction="up" delay={0.15}>
                <ContactInquiryForm />
              </Reveal>
            </div>

            {/* Right Column (5 cols): Direct Channels Grid */}
            <div className="lg:col-span-5 space-y-8">
              <Reveal direction="up" delay={0.25}>
                <div className="space-y-3 mb-6">
                  <span className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase">
                    Connect Directly
                  </span>
                  <h2 className="text-2xl font-display text-porcelain">
                    Atelier channels
                  </h2>
                  <p className="text-xs sm:text-sm text-porcelain/70 leading-relaxed">
                    Choose your preferred channel below. WhatsApp offers our fastest direct turnaround for instant assistance.
                  </p>
                </div>

                <ContactChannels whatsappNumber={whatsappNumber} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Client FAQ Section with Accordion */}
      <ContactFAQ />
    </div>
  );
}
