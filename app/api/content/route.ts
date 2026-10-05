import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/lib/db";
import SiteContentModel from "@/backend/models/SiteContent";
import { getAdminSession } from "@/backend/lib/auth";
import { siteContentSchema } from "@/backend/lib/validators";

export async function GET() {
  try {
    await connectToDatabase();
    let content = await SiteContentModel.findOne().lean();
    if (!content) {
      content = await SiteContentModel.create({});
    }
    return NextResponse.json({ content });
  } catch (error) {
    console.error("API GET /api/content error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const body = await req.json();
    const parsed = siteContentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const updated = await SiteContentModel.findOneAndUpdate(
      {},
      { $set: parsed.data },
      { returnDocument: "after", upsert: true }
    );

    return NextResponse.json({ content: updated });
  } catch (error) {
    console.error("API PUT /api/content error:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
