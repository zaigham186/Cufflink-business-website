import type { Metadata } from "next";

// Scaffolding — Phase 1, Step 7 (Protected Admin Layout)
export const metadata: Metadata = {
  title: "Admin Atelier — CuffKings",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="admin-portal min-h-screen bg-obsidian text-porcelain">
      {children}
    </section>
  );
}
