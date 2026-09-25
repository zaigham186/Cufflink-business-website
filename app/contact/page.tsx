import type { Metadata } from "next";
import ContactInquiryForm from "@/components/contact/ContactInquiryForm";
import ContactChannels from "@/components/contact/ContactChannels";
import ContactFAQ from "@/components/contact/ContactFAQ";
import BrassLine from "@/components/ui/BrassLine";

export const metadata: Metadata = {
  title: "Contact — CuffKings",
  description: "Get in touch with CuffKings for product inquiries, custom orders, and customer support. Based in Peshawar, Pakistan.",
};

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";

  return (
    <div className="min-h-screen">
      {/* Hero Section - Professional and Clean */}
      <section className="bg-obsidian pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <span className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase">
                CuffKings Peshawar
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display text-porcelain leading-tight">
              Get in touch
            </h1>
            <p className="text-lg text-porcelain/75 leading-relaxed max-w-2xl mx-auto">
              For order confirmations, custom requests, and product inquiries. We respond directly via WhatsApp and email.
            </p>
          </div>
        </div>
      </section>

      <BrassLine className="max-w-container mx-auto" />

      {/* Main Contact Section - Form & Channels */}
      <section className="bg-porcelain py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="space-y-4 mb-8">
                <span className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase">
                  Send Inquiry
                </span>
                <h2 className="text-2xl sm:text-3xl font-display text-warm-charcoal">
                  Contact form
                </h2>
                <p className="text-sm text-warm-charcoal/70 leading-relaxed">
                  Fill in your details below and we'll respond via WhatsApp within a few hours during business hours.
                </p>
              </div>

              <ContactInquiryForm />
            </div>

            {/* Right Column: Direct Channels */}
            <div className="lg:col-span-5">
              <div className="space-y-4 mb-8">
                <span className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase">
                  Connect Directly
                </span>
                <h2 className="text-2xl sm:text-3xl font-display text-warm-charcoal">
                  Contact channels
                </h2>
                <p className="text-sm text-warm-charcoal/70 leading-relaxed">
                  Prefer instant contact? Choose your preferred channel below. WhatsApp offers the fastest response.
                </p>
              </div>

              <ContactChannels whatsappNumber={whatsappNumber} />

              {/* Business Information Card */}
              <div className="mt-8 bg-white border border-champagne-brass/20 p-6">
                <h3 className="font-display text-lg text-warm-charcoal mb-4">
                  Business information
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-warm-charcoal/50 mb-1 uppercase tracking-wide text-xs">Location</p>
                    <p className="text-warm-charcoal font-medium">Peshawar, Khyber Pakhtunkhwa</p>
                    <p className="text-warm-charcoal/60">Pakistan</p>
                  </div>
                  
                  <div>
                    <p className="text-warm-charcoal/50 mb-1 uppercase tracking-wide text-xs">Shipping</p>
                    <p className="text-warm-charcoal/70">Nationwide delivery across Pakistan</p>
                    <p className="text-warm-charcoal/60 text-xs mt-1">International: Contact for arrangements</p>
                  </div>

                  <div>
                    <p className="text-warm-charcoal/50 mb-1 uppercase tracking-wide text-xs">Hours</p>
                    <p className="text-warm-charcoal/70">Monday - Saturday</p>
                    <p className="text-warm-charcoal/60 text-xs">10:00 AM - 7:00 PM PKT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrassLine className="max-w-container mx-auto" />

      {/* FAQ Section */}
      <section className="bg-porcelain pb-20 lg:pb-28">
        <ContactFAQ />
      </section>
    </div>
  );
}
