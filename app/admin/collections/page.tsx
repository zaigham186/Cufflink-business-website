import { collectionService } from "@/lib/server/services/collection.service";
import CollectionEditor from "@/components/admin/CollectionEditor";

export const dynamic = "force-dynamic";

export default async function AdminCollectionsPage() {
  const collections = await collectionService.getCollections();

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

      <CollectionEditor initialCollections={collections as any} />
    </div>
  );
}
