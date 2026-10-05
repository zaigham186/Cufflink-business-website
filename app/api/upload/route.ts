import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/server/auth";
import { imageService } from "@/lib/server/services/image.service";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await getAdminSession(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;

    const filesToProcess: File[] = [];
    if (files && files.length > 0) {
      filesToProcess.push(...files);
    } else if (singleFile) {
      filesToProcess.push(singleFile);
    }

    if (filesToProcess.length === 0) {
      return NextResponse.json(
        { error: "No image file provided for upload" },
        { status: 400 }
      );
    }

    const results = [];
    for (const file of filesToProcess) {
      const saved = await imageService.processAndSaveImage(file);
      results.push(saved);
    }

    return NextResponse.json(
      {
        success: true,
        urls: results.map((r) => r.url),
        images: results,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API POST /api/upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
