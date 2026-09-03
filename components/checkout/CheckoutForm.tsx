"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { generateWhatsAppURL } from "@/lib/whatsapp";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validators";
import Button from "@/components/ui/Button";

export default function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const result = checkoutSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<CheckoutFormData> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof CheckoutFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate WhatsApp URL
      const whatsappURL = generateWhatsAppURL(items, formData);

      // Open WhatsApp in new tab
      window.open(whatsappURL, "_blank");

      // Show confirmation
      setShowConfirmation(true);

      // Clear cart after a delay
      setTimeout(() => {
        clearCart();
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error processing your order. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="bg-deep-petrol border border-champagne-brass/30 p-8 lg:p-12 text-center space-y-8">
        <div className="w-20 h-20 mx-auto bg-champagne-brass/20 border border-champagne-brass/40 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-champagne-brass"
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
          <h2 className="text-2xl lg:text-3xl font-display mb-4 text-porcelain">Order details ready</h2>
          <p className="text-base text-porcelain/80 leading-relaxed max-w-md mx-auto">
            Your order details are ready in WhatsApp. Send the message there to
            confirm your order. We'll respond shortly with payment and delivery
            details.
          </p>
        </div>
        <div className="h-px w-24 bg-champagne-brass/40 mx-auto" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-porcelain border border-champagne-brass/30 p-6 lg:p-8 space-y-6">
        <h2 className="text-2xl font-display text-warm-charcoal">Delivery details</h2>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-warm-charcoal mb-2">
            Full name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-white border text-warm-charcoal placeholder:text-warm-charcoal/40 focus:outline-none focus:ring-2 focus:ring-champagne-brass ${
              errors.name ? "border-deep-wine" : "border-champagne-brass/30"
            }`}
            placeholder="Enter your full name"
            required
          />
          {errors.name && (
            <p className="mt-2 text-sm text-deep-wine">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-warm-charcoal mb-2">
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+92 300 1234567"
            className={`w-full px-4 py-3 bg-white border text-warm-charcoal placeholder:text-warm-charcoal/40 focus:outline-none focus:ring-2 focus:ring-champagne-brass ${
              errors.phone ? "border-deep-wine" : "border-champagne-brass/30"
            }`}
            required
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-deep-wine">{errors.phone}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-warm-charcoal mb-2">
            Delivery address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={`w-full px-4 py-3 bg-white border text-warm-charcoal placeholder:text-warm-charcoal/40 focus:outline-none focus:ring-2 focus:ring-champagne-brass resize-none ${
              errors.address ? "border-deep-wine" : "border-champagne-brass/30"
            }`}
            placeholder="Street address, apartment, suite, etc."
            required
          />
          {errors.address && (
            <p className="mt-2 text-sm text-deep-wine">{errors.address}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-warm-charcoal mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-white border text-warm-charcoal placeholder:text-warm-charcoal/40 focus:outline-none focus:ring-2 focus:ring-champagne-brass ${
              errors.city ? "border-deep-wine" : "border-champagne-brass/30"
            }`}
            placeholder="Enter your city"
            required
          />
          {errors.city && (
            <p className="mt-2 text-sm text-deep-wine">{errors.city}</p>
          )}
        </div>
      </div>

      {/* Info box */}
      <div className="bg-deep-petrol/30 border border-champagne-brass/20 p-6 space-y-3 text-sm text-porcelain">
        <p className="font-medium">How checkout works:</p>
        <ol className="list-decimal list-inside space-y-2 opacity-80 leading-relaxed">
          <li>Fill in your delivery details above</li>
          <li>Click "Complete order on WhatsApp"</li>
          <li>
            Your order details will open in WhatsApp — send the message to
            confirm
          </li>
          <li>We'll respond with payment and delivery timeline</li>
        </ol>
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Opening WhatsApp..." : "Complete order on WhatsApp"}
      </Button>
    </form>
  );
}
