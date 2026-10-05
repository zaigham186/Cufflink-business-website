import { connectToDatabase } from "@/backend/lib/db";
import CollectionSettingsModel from "@/backend/models/CollectionSettings";
import CollectionEditor from "@/backend/admin-components/CollectionEditor";

export const dynamic = "force-dynamic";

export default async function AdminCollectionsPage() {
  await connectToDatabase();
  const docs = await CollectionSettingsModel.find({}).lean();

  const tiersOrder = ["Classical", "Signature", "Premium"];
  const formatted = tiersOrder.map((tier) => {
    const existing = docs.find((d: any) => d.tier === tier);
    return {
      tier: tier as "Classical" | "Signature" | "Premium",
      priceRangeLabel: existing?.priceRangeLabel || (tier === "Classical" ? "Rs. 700–800" : tier === "Signature" ? "Rs. 1,000–1,400" : "Rs. 1,500–2,500"),
      description: existing?.description || "",
    };
  });

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="pb-6 border-b border-champagne-brass/20">
        <h1 className="text-3xl font-display text-porcelain tracking-tight">
          Collection Tier Settings
        </h1>
        <p className="text-xs text-porcelain/60 uppercase tracking-widest font-sans mt-1">
          Configure tier names, displayed price bands, and editorial descriptions
        </p>
      </div>

      <CollectionEditor initialCollections={formatted} />
    </div>
  );
}
