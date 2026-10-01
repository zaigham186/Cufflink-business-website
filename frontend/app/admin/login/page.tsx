import type { Metadata } from "next";

// Scaffolding — Phase 1, Step 6 (Admin Login Page)
export const metadata: Metadata = {
  title: "Admin Login — CuffKings",
  robots: "noindex, nofollow",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-obsidian text-porcelain flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-champagne-brass/25 p-8 text-center space-y-4">
        <div className="text-xs tracking-[0.2em] text-champagne-brass font-medium">
          CUFFKINGS ATELIER
        </div>
        <h1 className="text-2xl font-display text-porcelain">
          Admin Authentication
        </h1>
        <p className="text-xs sm:text-sm text-porcelain/60 leading-relaxed">
          Authentication portal scaffolding. Login form will be implemented in Phase 1, Step 6.
        </p>
      </div>
    </div>
  );
}
