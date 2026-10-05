import { contentRepository } from "@/lib/server/repositories/content.repository";
import type { SiteContent } from "@/types/siteContent";

export class ContentService {
  async getSiteContent(): Promise<SiteContent> {
    return contentRepository.get();
  }

  async updateSiteContent(data: Partial<SiteContent>): Promise<SiteContent> {
    return contentRepository.update(data);
  }
}

export const contentService = new ContentService();
