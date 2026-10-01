import type { Metadata } from "next";

// Scaffolding — Phase 1, Step 7 (Admin Products Management)
export const metadata: Metadata = {
  title: "Product Management — CuffKings Admin",
  robots: "noindex, nofollow",
};

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen bg-obsidian text-porcelain p-6 sm:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-xs tracking-[0.2em] text-champagne-brass font-medium">
          ADMIN INVENTORY
        </div>
        <h1 className="text-3xl font-display text-porcelain">
          Product Management
        </h1>
        <p className="text-sm text-porcelain/60">
          Product listing and management interface scaffolding. To be implemented in Phase 1, Step 7.
        </p>
      </div>
    </div>
  );
}
