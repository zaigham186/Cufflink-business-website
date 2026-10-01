"use client";

import { useState } from "react";
import Magnetic from "@/components/motion/Magnetic";
import { generateInquiryWhatsAppURL } from "@/lib/whatsapp";

const INQUIRY_TYPES = [
  "General inquiry",
  "Custom order",
  "Collection question",
  "Order status",
] as const;

export default function ContactInquiryForm() {
  const [name, setName] = useState("");
  const [inquiryType, setInquiryType] = useState<string>(INQUIRY_TYPES[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please provide your name.");
      return;
    }

    if (!message.trim()) {
      setError("Please enter your message or inquiry details.");
      return;
    }

    setError(null);

    const whatsappUrl = generateInquiryWhatsAppURL({
      name: name.trim(),
      inquiryType,
      message: message.trim(),
    });

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-obsidian/70 border border-champagne-brass/25 p-8 sm:p-10 relative">
      <div className="mb-6 space-y-2">
        <span className="text-xs tracking-[0.25em] text-champagne-brass font-medium uppercase">
          Direct Inquiry
        </span>
        <h2 className="text-2xl font-display text-porcelain">
          Send a message to the atelier
        </h2>
        <p className="text-xs sm:text-sm text-porcelain/70 leading-relaxed">
          Fill out the details below and we will connect with you directly on WhatsApp to assist with your order or custom requirements.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/40 p-3">
            {error}
          </div>
        )}

        {/* Name Field */}
        <div className="space-y-2 text-left">
          <label
            htmlFor="inquiry-name"
            className="block text-xs uppercase tracking-wider text-porcelain/80 font-medium"
          >
            Your Name <span className="text-champagne-brass">*</span>
          </label>
          <input
            id="inquiry-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Zaid Khan"
            className="w-full bg-obsidian border border-champagne-brass/25 px-4 py-3 text-sm text-porcelain placeholder-porcelain/35 focus:outline-none focus:border-champagne-brass transition-colors"
            required
          />
        </div>

        {/* Inquiry Type Dropdown */}
        <div className="space-y-2 text-left">
          <label
            htmlFor="inquiry-type"
            className="block text-xs uppercase tracking-wider text-porcelain/80 font-medium"
          >
            Inquiry Type
          </label>
          <div className="relative">
            <select
              id="inquiry-type"
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              className="w-full bg-obsidian border border-champagne-brass/25 px-4 py-3 text-sm text-porcelain focus:outline-none focus:border-champagne-brass transition-colors appearance-none cursor-pointer pr-10"
            >
              {INQUIRY_TYPES.map((type) => (
                <option key={type} value={type} className="bg-obsidian text-porcelain">
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-champagne-brass">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message Textarea */}
        <div className="space-y-2 text-left">
          <label
            htmlFor="inquiry-message"
            className="block text-xs uppercase tracking-wider text-porcelain/80 font-medium"
          >
            Message <span className="text-champagne-brass">*</span>
          </label>
          <textarea
            id="inquiry-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about the pieces you are interested in, special requests, or questions..."
            className="w-full bg-obsidian border border-champagne-brass/25 px-4 py-3 text-sm text-porcelain placeholder-porcelain/35 focus:outline-none focus:border-champagne-brass transition-colors resize-y min-h-[100px]"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Magnetic>
            <button
              type="submit"
              className="w-full py-3.5 px-8 bg-champagne-brass text-obsidian text-sm font-medium border border-champagne-brass hover:bg-champagne-brass/90 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Send Inquiry via WhatsApp</span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Magnetic>
        </div>
      </form>
    </div>
  );
}
