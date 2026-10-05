import { connectToDatabase } from "@/backend/lib/db";
import SiteContentModel from "@/backend/models/SiteContent";
import SiteContentForm from "@/backend/admin-components/SiteContentForm";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  await connectToDatabase();
  const defaultContent = {
    heroHeadline: "Cufflinks, finished the way formalwear demands.",
    heroSubtext:
      "Cufflinks built around polished metal, considered patterns and the details of formal dressing.",
    whatsappNumber: "923719145871",
    deliveryFeePkr: 180,
    faqDeliveryTime: "2–4 working days nationwide via tracked express courier.",
    faqDeliveryCoverage: "We deliver across all cities and regions of Pakistan.",
    faqReturnPolicy:
      "7-day replacement guarantee for any transit damages or quality concerns in original packaging.",
  };

  const rawContent = (await SiteContentModel.findOne().lean()) as any;
  const content = rawContent || defaultContent;

  const plainContent = {
    heroHeadline: content.heroHeadline || defaultContent.heroHeadline,
    heroSubtext: content.heroSubtext || defaultContent.heroSubtext,
    whatsappNumber: content.whatsappNumber || defaultContent.whatsappNumber,
    deliveryFeePkr: content.deliveryFeePkr ?? defaultContent.deliveryFeePkr,
    faqDeliveryTime: content.faqDeliveryTime || defaultContent.faqDeliveryTime,
    faqDeliveryCoverage: content.faqDeliveryCoverage || defaultContent.faqDeliveryCoverage,
    faqReturnPolicy: content.faqReturnPolicy || defaultContent.faqReturnPolicy,
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-champagne-brass/20">
        <h1 className="text-3xl font-display text-porcelain tracking-tight">
          Site Content & Policies
        </h1>
        <p className="text-xs text-porcelain/60 uppercase tracking-widest font-sans mt-1">
          Real-time copy controls, delivery pricing, and client service disclosures
        </p>
      </div>

      <SiteContentForm initialContent={plainContent} />
    </div>
  );
}
