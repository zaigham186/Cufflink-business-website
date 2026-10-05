import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { connectToDatabase } from "../backend/lib/db";
import CollectionSettingsModel from "../backend/models/CollectionSettings";
import SiteContentModel from "../backend/models/SiteContent";

const INITIAL_COLLECTIONS: Array<{
  tier: "Classical" | "Signature" | "Premium";
  priceRangeLabel: string;
  description: string;
}> = [
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

const INITIAL_CONTENT = {
  heroHeadline: "Cufflinks, finished the way formalwear demands.",
  heroSubtext: "Cufflinks built around polished metal, considered patterns and the details of formal dressing.",
  whatsappNumber: "923719145871",
  deliveryFeePkr: 180,
  faqDeliveryTime: "2–4 working days nationwide via tracked express courier.",
  faqDeliveryCoverage: "We deliver across all cities and regions of Pakistan.",
  faqReturnPolicy: "7-day replacement guarantee for any transit damages or quality concerns in original packaging.",
};

async function seedSiteData() {
  await connectToDatabase();
  console.log("Seeding collection settings...");
  for (const item of INITIAL_COLLECTIONS) {
    await (CollectionSettingsModel as any).findOneAndUpdate(
      { tier: item.tier },
      { $set: item },
      { upsert: true, new: true }
    );
  }
  console.log("Collection settings ready.");

  console.log("Seeding site content...");
  const contentExists = await SiteContentModel.findOne();
  if (!contentExists) {
    await SiteContentModel.create(INITIAL_CONTENT);
  } else {
    await SiteContentModel.findByIdAndUpdate(contentExists._id, { $set: INITIAL_CONTENT });
  }
  console.log("Site content ready.");

  process.exit(0);
}

seedSiteData().catch((err) => {
  console.error(err);
  process.exit(1);
});
