import { Collection } from "./product";

export interface CollectionSettings {
  _id?: string;
  tier: Collection;
  priceRangeLabel: string;
  description: string;
  updatedAt?: Date | string;
}
