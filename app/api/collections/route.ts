import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/lib/db";
import CollectionSettingsModel from "@/backend/models/CollectionSettings";
import { getAdminSession } from "@/backend/lib/auth";
import { collectionSettingsSchema } from "@/backend/lib/validators";

export async function GET() {
  try {
    await connectToDatabase();
    const collections = await CollectionSettingsModel.find({}).lean();
    return NextResponse.json({ collections });
  } catch (error) {
    console.error("API GET /api/collections error:", error);
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const body = await req.json();
    const parsed = collectionSettingsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const updated = await CollectionSettingsModel.findOneAndUpdate(
      { tier: parsed.data.tier },
      { $set: parsed.data },
      { returnDocument: "after", upsert: true }
    );

    return NextResponse.json({ collection: updated });
  } catch (error) {
    console.error("API PUT /api/collections error:", error);
    return NextResponse.json({ error: "Failed to update collection" }, { status: 500 });
  }
}
