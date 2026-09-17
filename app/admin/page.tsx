import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Placeholder — CuffKings",
};

export default function AdminPlaceholderPage() {
  return (
    <div className="min-h-screen bg-obsidian text-porcelain flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-champagne-brass/25 p-8 text-center space-y-6">
        <div className="text-xs tracking-[0.2em] text-champagne-brass font-medium">
          ADMIN ROUTE
        </div>
        <h1 className="text-2xl font-display text-porcelain">
          Atelier management portal
        </h1>
        <p className="text-xs sm:text-sm text-porcelain/60 leading-relaxed">
          Route placeholder only. Inventory and order management functionality
          is currently out of scope.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="text-xs text-champagne-brass hover:text-porcelain transition-colors"
          >
            ← Return to storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
