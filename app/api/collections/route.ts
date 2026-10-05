import { NextRequest, NextResponse } from "next/server";
import { collectionService } from "@/lib/server/services/collection.service";
import { getAdminSession } from "@/lib/server/auth";
import { collectionSettingsSchema } from "@/lib/validations/collection.schema";

export async function GET() {
  try {
    const collections = await collectionService.getCollections();
    return NextResponse.json({ collections });
  } catch (error) {
    console.error("API GET /api/collections error:", error);
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const isAdmin = await getAdminSession(req);
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = collectionSettingsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const updated = await collectionService.updateCollection(parsed.data.tier, parsed.data);
    return NextResponse.json({ collection: updated });
  } catch (error) {
    console.error("API PUT /api/collections error:", error);
    return NextResponse.json({ error: "Failed to update collection" }, { status: 500 });
  }
}
