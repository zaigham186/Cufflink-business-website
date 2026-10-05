"use client";

import { useState } from "react";

interface SiteContentData {
  heroHeadline: string;
  heroSubtext: string;
  whatsappNumber: string;
  deliveryFeePkr: number;
  faqDeliveryTime: string;
  faqDeliveryCoverage: string;
  faqReturnPolicy: string;
}

interface SiteContentFormProps {
  initialContent: SiteContentData;
}

export default function SiteContentForm({ initialContent }: SiteContentFormProps) {
  const [formData, setFormData] = useState<SiteContentData>(initialContent);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isError?: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          deliveryFeePkr: Number(formData.deliveryFeePkr),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setFeedback({ message: data.error || "Failed to save settings", isError: true });
        setSaving(false);
        return;
      }

      setFeedback({ message: "Storefront content updated successfully!" });
    } catch {
      setFeedback({ message: "Network error occurred", isError: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl text-porcelain">
      {feedback && (
        <div
          className={`p-4 text-xs border ${
            feedback.isError
              ? "bg-red-950/60 border-deep-wine/60 text-red-300"
              : "bg-emerald-950/60 border-emerald-500/40 text-emerald-200"
          }`}
        >
          {feedback.isError ? "✕ " : "✓ "} {feedback.message}
        </div>
      )}

      {/* Hero Narrative Section */}
      <div className="bg-white/5 border border-champagne-brass/20 p-6 space-y-6">
        <h2 className="text-sm font-display text-champagne-brass uppercase tracking-widest border-b border-white/10 pb-3">
          Homepage Hero Narrative
        </h2>

        <div>
          <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
            Hero Headline *
          </label>
          <input
            type="text"
            required
            value={formData.heroHeadline}
            onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
            placeholder="Cufflinks, finished the way formalwear demands."
            className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
            Hero Subtext / Tagline *
          </label>
          <textarea
            rows={3}
            required
            value={formData.heroSubtext}
            onChange={(e) => setFormData({ ...formData, heroSubtext: e.target.value })}
            placeholder="Cufflinks built around polished metal, considered patterns and the details of formal dressing."
            className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass leading-relaxed"
          />
        </div>
      </div>

      {/* Commerce & Contact Settings */}
      <div className="bg-white/5 border border-champagne-brass/20 p-6 space-y-6">
        <h2 className="text-sm font-display text-champagne-brass uppercase tracking-widest border-b border-white/10 pb-3">
          Commerce & Concierge
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              WhatsApp Business Contact (Numeric, with Country Code) *
            </label>
            <input
              type="text"
              required
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              placeholder="923719145871"
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass font-mono"
            />
            <p className="text-[10px] text-porcelain/40 mt-1">
              Used for instant WhatsApp order routing and concierge customer support.
            </p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
              Standard Courier Delivery Fee (PKR) *
            </label>
            <input
              type="number"
              min={0}
              required
              value={formData.deliveryFeePkr}
              onChange={(e) =>
                setFormData({ ...formData, deliveryFeePkr: Number(e.target.value) })
              }
              placeholder="180"
              className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass font-mono"
            />
            <p className="text-[10px] text-porcelain/40 mt-1">
              Flat shipping fee applied at checkout throughout Pakistan.
            </p>
          </div>
        </div>
      </div>

      {/* FAQs and Policies */}
      <div className="bg-white/5 border border-champagne-brass/20 p-6 space-y-6">
        <h2 className="text-sm font-display text-champagne-brass uppercase tracking-widest border-b border-white/10 pb-3">
          Store Policies & Contact Page FAQs
        </h2>

        <div>
          <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
            Delivery Timeline FAQ
          </label>
          <textarea
            rows={2}
            value={formData.faqDeliveryTime}
            onChange={(e) => setFormData({ ...formData, faqDeliveryTime: e.target.value })}
            placeholder="2–4 working days nationwide via tracked express courier."
            className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
            Delivery Coverage FAQ
          </label>
          <textarea
            rows={2}
            value={formData.faqDeliveryCoverage}
            onChange={(e) => setFormData({ ...formData, faqDeliveryCoverage: e.target.value })}
            placeholder="We deliver across all cities and regions of Pakistan."
            className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-porcelain/70 mb-2 font-sans">
            Return & Exchange Policy FAQ
          </label>
          <textarea
            rows={2}
            value={formData.faqReturnPolicy}
            onChange={(e) => setFormData({ ...formData, faqReturnPolicy: e.target.value })}
            placeholder="7-day inspection guarantee. Returns accepted for unblemished pieces in original presentation packaging."
            className="w-full px-4 py-2.5 bg-black/40 border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass leading-relaxed"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto px-8 py-3 bg-champagne-brass text-obsidian text-xs uppercase tracking-widest font-medium hover:bg-champagne-brass/90 transition-all duration-200 shadow-xl disabled:opacity-50 text-center"
        >
          {saving ? "Saving Storefront Settings..." : "Save Storefront Settings"}
        </button>
      </div>
    </form>
  );
}
