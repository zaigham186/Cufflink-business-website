// types/siteContent.ts
// Shared Site Content type definition

export interface SiteContent {
  id?: string;
  key: string;
  section: "hero" | "about" | "editorial" | "brandStory" | "announcement" | "contact";
  title?: string;
  subtitle?: string;
  content?: string;
  mediaUrl?: string;
  metadata?: Record<string, unknown>;
  updatedAt?: string | Date;
}
