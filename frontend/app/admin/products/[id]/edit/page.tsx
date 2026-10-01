import type { Metadata } from "next";

// Scaffolding — Phase 1 (Edit Product Page)
export const metadata: Metadata = {
  title: "Edit Product — CuffKings Admin",
  robots: "noindex, nofollow",
};

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-obsidian text-porcelain p-6 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-xs tracking-[0.2em] text-champagne-brass font-medium">
          ADMIN INVENTORY
        </div>
        <h1 className="text-3xl font-display text-porcelain">
          Edit Product #{id}
        </h1>
        <p className="text-sm text-porcelain/60">
          Product editor scaffolding. To be implemented in Phase 1, Step 7.
        </p>
      </div>
    </div>
  );
}
