import type { Metadata } from "next";
import Link from "next/link";

// Scaffolding — Phase 1 (Admin Dashboard)
export const metadata: Metadata = {
  title: "Admin Dashboard — CuffKings",
  robots: "noindex, nofollow",
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-obsidian text-porcelain flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-champagne-brass/25 p-8 text-center space-y-6">
        <div className="text-xs tracking-[0.2em] text-champagne-brass font-medium">
          ADMIN PORTAL
        </div>
        <h1 className="text-2xl font-display text-porcelain">
          Atelier Management Portal
        </h1>
        <p className="text-xs sm:text-sm text-porcelain/60 leading-relaxed">
          Dashboard scaffolding. Admin controls, inventory management, and metrics will be implemented in subsequent phases.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/admin/products"
            className="text-xs border border-champagne-brass/40 px-3 py-2 text-champagne-brass hover:bg-champagne-brass/10 transition-colors"
          >
            Products Management →
          </Link>
          <Link
            href="/admin/login"
            className="text-xs border border-champagne-brass/40 px-3 py-2 text-champagne-brass hover:bg-champagne-brass/10 transition-colors"
          >
            Admin Login →
          </Link>
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="text-xs text-champagne-brass/70 hover:text-porcelain transition-colors"
          >
            ← Return to storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
