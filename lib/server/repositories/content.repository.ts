import { connectToDatabase } from "@/lib/server/db";
import SiteContentModel from "@/models/SiteContent";
import type { SiteContent } from "@/types/siteContent";

export const DEFAULT_SITE_CONTENT: SiteContent = {
  heroHeadline: "Cufflinks, finished the way formalwear demands.",
  heroSubtext:
    "Cufflinks built around polished metal, considered patterns and the details of formal dressing.",
  whatsappNumber: "923719145871",
  deliveryFeePkr: 180,
  faqDeliveryTime: "2–4 working days nationwide via standard courier.",
  faqDeliveryCoverage: "Nationwide delivery across Pakistan including Karachi, Lahore, Islamabad, and all major cities.",
  faqReturnPolicy: "7-day inspection guarantee. Returns accepted for unblemished pieces in original presentation packaging.",
};

function toPlainContent(doc: any): SiteContent {
  if (!doc) return DEFAULT_SITE_CONTENT;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    heroHeadline: obj.heroHeadline || DEFAULT_SITE_CONTENT.heroHeadline,
    heroSubtext: obj.heroSubtext || DEFAULT_SITE_CONTENT.heroSubtext,
    whatsappNumber: obj.whatsappNumber || DEFAULT_SITE_CONTENT.whatsappNumber,
    deliveryFeePkr: typeof obj.deliveryFeePkr === "number" ? obj.deliveryFeePkr : DEFAULT_SITE_CONTENT.deliveryFeePkr,
    faqDeliveryTime: obj.faqDeliveryTime || DEFAULT_SITE_CONTENT.faqDeliveryTime,
    faqDeliveryCoverage: obj.faqDeliveryCoverage || DEFAULT_SITE_CONTENT.faqDeliveryCoverage,
    faqReturnPolicy: obj.faqReturnPolicy || DEFAULT_SITE_CONTENT.faqReturnPolicy,
    _id: obj._id ? obj._id.toString() : undefined,
  };
}

export class ContentRepository {
  async get(): Promise<SiteContent> {
    await connectToDatabase();
    let content = await SiteContentModel.findOne().lean();
    if (!content) {
      content = await SiteContentModel.create(DEFAULT_SITE_CONTENT);
    }
    return toPlainContent(content);
  }

  async update(data: Partial<SiteContent>): Promise<SiteContent> {
    await connectToDatabase();
    const updated = await SiteContentModel.findOneAndUpdate(
      {},
      { $set: data },
      { returnDocument: "after", upsert: true }
    ).lean();
    return toPlainContent(updated);
  }
}

export const contentRepository = new ContentRepository();
