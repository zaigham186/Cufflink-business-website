import { collectionRepository } from "@/lib/server/repositories/collection.repository";
import type { CollectionSettings } from "@/types/collection";

export const DEFAULT_COLLECTIONS: CollectionSettings[] = [
  {
    tier: "Classical",
    priceRangeLabel: "Rs. 700–800",
    description: "Essential formal cufflinks with a clean finish and timeless proportions.",
  },
  {
    tier: "Signature",
    priceRangeLabel: "Rs. 1,000–1,400",
    description: "Refined details, rich mineral enamel, and subtle surface textures.",
  },
  {
    tier: "Premium",
    priceRangeLabel: "Rs. 1,500–2,500",
    description: "Artisanal pieces featuring fine engraving, crystal pavé, and stone detailing.",
  },
];

export class CollectionService {
  async getCollections(): Promise<CollectionSettings[]> {
    const docs = await collectionRepository.findAll();
    const tiersOrder = ["Classical", "Signature", "Premium"] as const;

    return tiersOrder.map((tier) => {
      const existing = docs.find((d) => d.tier === tier);
      const def = DEFAULT_COLLECTIONS.find((d) => d.tier === tier)!;
      return {
        _id: existing?._id,
        tier,
        priceRangeLabel: existing?.priceRangeLabel || def.priceRangeLabel,
        description: existing?.description || def.description,
      };
    });
  }

  async updateCollection(tier: string, data: Partial<CollectionSettings>): Promise<CollectionSettings> {
    return collectionRepository.upsert(tier, data);
  }
}

export const collectionService = new CollectionService();
