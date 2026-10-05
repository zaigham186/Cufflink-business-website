import type { Metadata } from "next";
import { connectToDatabase } from "@/backend/lib/db";
import SiteContentModel from "@/backend/models/SiteContent";
import ContactInquiryForm from "@/frontend/components/contact/ContactInquiryForm";
import ContactChannels from "@/frontend/components/contact/ContactChannels";
import ContactFAQ from "@/frontend/components/contact/ContactFAQ";
import BrassLine from "@/frontend/components/ui/BrassLine";
import ContactHero from "@/frontend/components/contact/ContactHero";

export const metadata: Metadata = {
  title: "Contact — CuffKings",
  description:
    "Get in touch with CuffKings for product inquiries, custom orders, and customer support. Based in Peshawar, Pakistan.",
};

export const revalidate = 60;

export default async function ContactPage() {
  await connectToDatabase();
  const content = await SiteContentModel.findOne().lean();

  const whatsappNumber =
    content?.whatsappNumber ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "923719145871";

  const customFaqs = {
    deliveryTime: content?.faqDeliveryTime,
    deliveryCoverage: content?.faqDeliveryCoverage,
    returnPolicy: content?.faqReturnPolicy,
  };

  return (
    <div className="min-h-screen">
      {/* Animated Hero */}
      <ContactHero />

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
                  Fill in your details below and we&apos;ll respond via WhatsApp within a few hours during business hours.
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

      {/* Dynamic FAQ Section from Database */}
      <section className="bg-porcelain pb-20 lg:pb-28">
        <ContactFAQ customFaqs={customFaqs} />
      </section>
    </div>
  );
}
