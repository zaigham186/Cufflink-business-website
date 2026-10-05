import { connectToDatabase } from "@/lib/server/db";
import CollectionSettingsModel from "@/models/CollectionSettings";
import type { CollectionSettings } from "@/types/collection";

function toPlainCollection(doc: any): CollectionSettings {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    _id: obj._id ? obj._id.toString() : undefined,
  };
}

export class CollectionRepository {
  async findAll(): Promise<CollectionSettings[]> {
    await connectToDatabase();
    const docs = await CollectionSettingsModel.find({}).lean();
    return docs.map(toPlainCollection);
  }

  async findByTier(tier: string): Promise<CollectionSettings | null> {
    await connectToDatabase();
    const doc = await CollectionSettingsModel.findOne({ tier: tier as any }).lean();
    return doc ? toPlainCollection(doc) : null;
  }

  async upsert(tier: string, data: Partial<CollectionSettings>): Promise<CollectionSettings> {
    await connectToDatabase();
    const updated = await CollectionSettingsModel.findOneAndUpdate(
      { tier: tier as any },
      { $set: data },
      { returnDocument: "after", upsert: true }
    ).lean();
    return toPlainCollection(updated);
  }

  async count(): Promise<number> {
    await connectToDatabase();
    return CollectionSettingsModel.countDocuments({});
  }
}

export const collectionRepository = new CollectionRepository();
