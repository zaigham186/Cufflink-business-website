import mongoose, { Schema, Document, Model } from "mongoose";
import type { Collection } from "@/types/product";

export interface ICollectionSettings extends Document {
  tier: Collection;
  priceRangeLabel: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSettingsSchema = new Schema<ICollectionSettings>(
  {
    tier: {
      type: String,
      enum: ["Classical", "Signature", "Premium"],
      required: true,
      unique: true,
    },
    priceRangeLabel: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const CollectionSettingsModel: Model<ICollectionSettings> =
  mongoose.models.CollectionSettings ||
  mongoose.model<ICollectionSettings>("CollectionSettings", CollectionSettingsSchema);

export default CollectionSettingsModel;
