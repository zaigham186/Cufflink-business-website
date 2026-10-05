import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteContent extends Document {
  heroHeadline: string;
  heroSubtext: string;
  whatsappNumber: string;
  deliveryFeePkr: number;
  faqDeliveryTime: string;
  faqDeliveryCoverage: string;
  faqReturnPolicy: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    heroHeadline: {
      type: String,
      default: "Cufflinks, finished the way formalwear demands.",
    },
    heroSubtext: {
      type: String,
      default:
        "Cufflinks built around polished metal, considered patterns and the details of formal dressing.",
    },
    whatsappNumber: { type: String, default: "923719145871" },
    deliveryFeePkr: { type: Number, default: 180 },
    faqDeliveryTime: {
      type: String,
      default: "2–4 working days nationwide via standard courier.",
    },
    faqDeliveryCoverage: {
      type: String,
      default: "Nationwide delivery across Pakistan including Karachi, Lahore, Islamabad, and all major cities.",
    },
    faqReturnPolicy: {
      type: String,
      default: "7-day inspection guarantee. Returns accepted for unblemished pieces in original presentation packaging.",
    },
  },
  { timestamps: true }
);

const SiteContentModel: Model<ISiteContent> =
  mongoose.models.SiteContent ||
  mongoose.model<ISiteContent>("SiteContent", SiteContentSchema);

export default SiteContentModel;
