import { contentService } from "@/lib/server/services/content.service";
import SiteContentForm from "@/components/admin/SiteContentForm";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const content = await contentService.getSiteContent();

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

      <SiteContentForm initialContent={content as any} />
    </div>
  );
}
