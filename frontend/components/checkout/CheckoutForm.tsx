"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import {
  generateWhatsAppURL,
  generateWhatsAppOrderMessage,
  formatWhatsAppBusinessNumber,
} from "@/lib/whatsapp";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validators";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

export default function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.getSubtotal());

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "Cash on Delivery (COD)",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preparedOrder, setPreparedOrder] = useState<{
    orderId: string;
    whatsappURL: string;
    messageText: string;
    total: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user types
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCopyMessage = async () => {
    if (!preparedOrder) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(preparedOrder.messageText);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = preparedOrder.messageText;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy order message:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty. Please add cufflinks before checking out.");
      router.push("/shop");
      return;
    }

    // Validate form with Zod
    const result = checkoutSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof CheckoutFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(fieldErrors)[0];
      if (firstErrorKey) {
        const el = document.getElementById(firstErrorKey);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate clean unique order reference
      const orderId = `CK-${Math.floor(10000 + Math.random() * 90000)}`;
      const orderCustomerDetails = {
        ...result.data,
        orderId,
      };

      // Generate WhatsApp URL and message text
      const whatsappURL = generateWhatsAppURL(items, orderCustomerDetails);
      const messageText = generateWhatsAppOrderMessage(items, orderCustomerDetails);

      // Attempt to open WhatsApp in a new tab/window
      try {
        const win = window.open(whatsappURL, "_blank");
        if (win) {
          win.focus();
        }
      } catch (e) {
        console.warn("Direct window.open blocked by browser; user can click the manual link", e);
      }

      setPreparedOrder({
        orderId,
        whatsappURL,
        messageText,
        total: subtotal,
      });
    } catch (error) {
      console.error("Checkout submission error:", error);
      alert("There was an error preparing your order. Please check your information and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishOrder = () => {
    clearCart();
    router.push("/");
  };

  // Order Confirmation / Ready View
  if (preparedOrder) {
    const businessPhone = formatWhatsAppBusinessNumber();

    return (
      <Reveal direction="up" duration={0.6} className="w-full">
        <div className="bg-deep-petrol border border-champagne-brass/40 p-6 sm:p-8 lg:p-10 space-y-8 text-porcelain">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-champagne-brass/15 border border-champagne-brass/40 flex items-center justify-center text-champagne-brass">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-champagne-brass font-medium">
                Order Reference #{preparedOrder.orderId}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display text-porcelain mt-1">
                Order details ready
              </h2>
            </div>
            <p className="text-sm text-porcelain/80 leading-relaxed max-w-lg mx-auto">
              Your order has been formatted for WhatsApp. Click below to send your order directly to our Peshawar atelier to confirm dispatch.
            </p>
          </div>

          {/* Primary Action Button (Guaranteed to work even if popup was blocked) */}
          <div className="space-y-3 max-w-md mx-auto">
            <Magnetic className="w-full">
              <a
                href={preparedOrder.whatsappURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-champagne-brass text-obsidian font-medium text-sm hover:bg-champagne-brass/90 transition-all text-center shadow-lg hover:shadow-champagne-brass/20"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.179.181-.077.356.101.174.45 744.966 1.204.664.591 1.224.774 1.397.86.173.087.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.044.072.044.419-.1.824z" />
                </svg>
                <span>Open WhatsApp to send order</span>
              </a>
            </Magnetic>

            {/* Secondary Copy Message option */}
            <button
              type="button"
              onClick={handleCopyMessage}
              className="w-full py-2.5 px-4 text-xs font-medium border border-champagne-brass/30 bg-obsidian/40 text-porcelain hover:border-champagne-brass hover:text-champagne-brass transition-colors flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <span className="text-champagne-brass">✓</span>
                  <span>Order message copied to clipboard!</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy order text (if WhatsApp doesn&apos;t open)</span>
                </>
              )}
            </button>
          </div>

          {/* Order Summary & Customer Recap Card */}
          <div className="bg-obsidian border border-champagne-brass/25 p-5 sm:p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-champagne-brass/20 pb-3">
              <span className="text-porcelain/60">Recipient</span>
              <span className="font-medium text-porcelain">{formData.name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-champagne-brass/20 pb-3">
              <span className="text-porcelain/60">Phone</span>
              <span className="font-medium text-porcelain">{formData.phone}</span>
            </div>
            <div className="flex justify-between items-start border-b border-champagne-brass/20 pb-3">
              <span className="text-porcelain/60">Delivery Address</span>
              <span className="font-medium text-porcelain text-right max-w-xs">{formData.address}, {formData.city}</span>
            </div>
            <div className="flex justify-between items-center border-b border-champagne-brass/20 pb-3">
              <span className="text-porcelain/60">Payment Preference</span>
              <span className="font-medium text-champagne-brass">{formData.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center pt-1 text-sm font-medium">
              <span className="text-porcelain">Total Order Value</span>
              <span className="text-champagne-brass text-base">Rs. {preparedOrder.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Helpful next steps */}
          <div className="bg-white/5 border border-champagne-brass/20 p-4 text-xs text-porcelain/70 space-y-2">
            <p className="font-medium text-porcelain">What happens next:</p>
            <ol className="list-decimal list-inside space-y-1.5 leading-relaxed opacity-90">
              <li>Sending the message in WhatsApp notifies our artisan workbench in Peshawar.</li>
              <li>We will confirm stock availability and share your dispatch tracking number.</li>
              <li>Direct atelier WhatsApp: +92 371 9145871</li>
            </ol>
          </div>

          {/* Navigation Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-champagne-brass/20">
            <button
              type="button"
              onClick={() => setPreparedOrder(null)}
              className="text-xs text-porcelain/70 hover:text-champagne-brass transition-colors underline"
            >
              ← Edit delivery details
            </button>
            <button
              type="button"
              onClick={handleFinishOrder}
              className="text-xs font-medium px-5 py-2.5 bg-obsidian border border-champagne-brass/40 text-champagne-brass hover:border-champagne-brass transition-colors"
            >
              I have sent the message — Done
            </button>
          </div>
        </div>
      </Reveal>
    );
  }

  // Active Checkout Form View
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-porcelain border border-champagne-brass/30 p-6 lg:p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-display text-warm-charcoal">Delivery details</h2>
          <p className="text-xs text-warm-charcoal/60 mt-1">
            Please enter your dispatch information accurately. All orders are fulfilled from Peshawar, Pakistan.
          </p>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-warm-charcoal mb-2">
            Full name <span className="text-deep-wine">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-white border text-warm-charcoal placeholder:text-warm-charcoal/40 focus:outline-none focus:ring-2 focus:ring-champagne-brass ${
              errors.name ? "border-deep-wine ring-1 ring-deep-wine" : "border-champagne-brass/30"
            }`}
            placeholder="Enter your full name"
            required
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-deep-wine font-medium">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-warm-charcoal mb-2">
            WhatsApp phone number <span className="text-deep-wine">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0371 9145871 or +92 371 9145871"
            className={`w-full px-4 py-3 bg-white border text-warm-charcoal placeholder:text-warm-charcoal/40 focus:outline-none focus:ring-2 focus:ring-champagne-brass ${
              errors.phone ? "border-deep-wine ring-1 ring-deep-wine" : "border-champagne-brass/30"
            }`}
            required
          />
          <p className="mt-1 text-[11px] text-warm-charcoal/50">
            We will contact this number on WhatsApp for order confirmation and courier tracking.
          </p>
          {errors.phone && (
            <p className="mt-1.5 text-xs text-deep-wine font-medium">{errors.phone}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-warm-charcoal mb-2">
            Complete delivery address <span className="text-deep-wine">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={`w-full px-4 py-3 bg-white border text-warm-charcoal placeholder:text-warm-charcoal/40 focus:outline-none focus:ring-2 focus:ring-champagne-brass resize-none ${
              errors.address ? "border-deep-wine ring-1 ring-deep-wine" : "border-champagne-brass/30"
            }`}
            placeholder="House/Apartment #, Street, Sector or Area, Landmark"
            required
          />
          {errors.address && (
            <p className="mt-1.5 text-xs text-deep-wine font-medium">{errors.address}</p>
          )}
        </div>

        {/* City & Payment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-warm-charcoal mb-2">
              City <span className="text-deep-wine">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white border text-warm-charcoal placeholder:text-warm-charcoal/40 focus:outline-none focus:ring-2 focus:ring-champagne-brass ${
                errors.city ? "border-deep-wine ring-1 ring-deep-wine" : "border-champagne-brass/30"
              }`}
              placeholder="e.g. Peshawar, Lahore, Islamabad, Karachi"
              required
            />
            {errors.city && (
              <p className="mt-1.5 text-xs text-deep-wine font-medium">{errors.city}</p>
            )}
          </div>

          {/* Payment Preference */}
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-warm-charcoal mb-2">
              Payment method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-champagne-brass/30 text-warm-charcoal focus:outline-none focus:ring-2 focus:ring-champagne-brass text-sm"
            >
              <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
              <option value="Direct Bank Transfer / Raast">Direct Bank Transfer / Raast</option>
              <option value="EasyPaisa / JazzCash">EasyPaisa / JazzCash</option>
            </select>
          </div>
        </div>

        {/* Special Instructions / Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-warm-charcoal mb-2">
            Special instructions or gift note <span className="text-xs text-warm-charcoal/50">(Optional)</span>
          </label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={formData.notes || ""}
            onChange={handleChange}
            placeholder="e.g. Gift packaging requested, call before delivery"
            className="w-full px-4 py-3 bg-white border border-champagne-brass/30 text-warm-charcoal placeholder:text-warm-charcoal/40 focus:outline-none focus:ring-2 focus:ring-champagne-brass text-sm"
          />
        </div>
      </div>

      {/* Reassurance Info Box */}
      <div className="bg-obsidian border border-champagne-brass/20 p-5 space-y-2 text-xs text-porcelain/80">
        <p className="font-medium text-champagne-brass text-sm">How our checkout process works:</p>
        <ol className="list-decimal list-inside space-y-1.5 leading-relaxed text-porcelain/70">
          <li>Complete your delivery details above and click the button below.</li>
          <li>Your order summary opens directly in WhatsApp with all selected pieces.</li>
          <li>Send the pre-filled message — our team will confirm your order and courier timeline.</li>
          <li>Pay comfortably via your chosen method upon delivery or via direct transfer.</li>
        </ol>
      </div>

      {/* Submit Button */}
      <Magnetic className="w-full">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full py-4 text-base tracking-wide"
        >
          {isSubmitting ? "Preparing WhatsApp order..." : "Complete order on WhatsApp →"}
        </Button>
      </Magnetic>
    </form>
  );
}
