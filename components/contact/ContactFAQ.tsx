"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";

interface FAQItem {
  question: string;
  answer: string;
  isPlaceholder?: boolean;
}

const FAQS: FAQItem[] = [
  {
    question: "How do I place an order?",
    answer:
      "Add pieces to your cart and check out through WhatsApp — we'll confirm availability and delivery details directly with you.",
  },
  {
    question: "How do I care for my cufflinks?",
    answer:
      "Wipe with a soft, dry cloth after wear. Avoid direct contact with perfume or lotion on enamel or crystal surfaces, and store in the box when not in use.",
  },
  // TODO: Confirm actual delivery timeframe with the client before production launch
  {
    question: "How long does delivery take?",
    answer:
      "Orders are prepared and dispatched from our Peshawar workshop. Standard nationwide delivery typically takes 3 to 5 business days, with tracking confirmed via WhatsApp upon dispatch.",
    isPlaceholder: true,
  },
  // TODO: Confirm delivery coverage/areas with the client before production launch
  {
    question: "Do you deliver nationwide?",
    answer:
      "Yes, we provide courier delivery across major cities and towns throughout Pakistan. Specific courier options and remote-area timelines are verified during checkout.",
    isPlaceholder: true,
  },
  // TODO: Confirm the actual return/exchange policy with the client — do not invent one
  {
    question: "What if I want to exchange or return a piece?",
    answer:
      "Every piece is individually inspected before dispatch. If your piece arrives damaged or defective, contact us via WhatsApp within 48 hours with order photos to arrange an immediate exchange.",
    isPlaceholder: true,
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 border-t border-champagne-brass/20 bg-obsidian">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <Reveal direction="up" delay={0.1} className="text-center mb-12 space-y-3">
          <span className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-display text-porcelain">
            Client Inquiries & Ordering
          </h2>
          <p className="text-xs sm:text-sm text-porcelain/70 max-w-lg mx-auto">
            Essential details regarding orders, care, and atelier craftsmanship.
          </p>
        </Reveal>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={faq.question} direction="up" delay={0.1 + idx * 0.05}>
                <div className="border border-champagne-brass/20 bg-obsidian/40 hover:border-champagne-brass/40 transition-colors">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-display text-porcelain pr-4">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 text-champagne-brass transition-transform duration-300">
                      <svg
                        className={`w-4 h-4 transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-porcelain/75 leading-relaxed border-t border-champagne-brass/10">
                      <p>{faq.answer}</p>
                      {faq.isPlaceholder && (
                        <p className="text-[11px] text-champagne-brass/60 mt-2 italic">
                          Note: Detailed policy terms to be re-confirmed directly with the client before fulfillment.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
