import { NextRequest, NextResponse } from "next/server";
import { contentService } from "@/lib/server/services/content.service";
import { getAdminSession } from "@/lib/server/auth";
import { siteContentSchema } from "@/lib/validations/content.schema";

export async function GET() {
  try {
    const content = await contentService.getSiteContent();
    return NextResponse.json({ content });
  } catch (error) {
    console.error("API GET /api/content error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const isAdmin = await getAdminSession(req);
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = siteContentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const updated = await contentService.updateSiteContent(parsed.data);
    return NextResponse.json({ content: updated });
  } catch (error) {
    console.error("API PUT /api/content error:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
