import { NextRequest, NextResponse } from "next/server";
import { imageService } from "@/lib/server/services/image.service";
import { getAdminSession } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    // Strip optional file extension if present (e.g. 65f...jpg -> 65f...)
    const id = rawId.split(".")[0];

    const image = await imageService.getImageById(id);
    if (!image) {
      return new NextResponse("Image not found", { status: 404 });
    }

    return new NextResponse(new Uint8Array(image.data), {
      status: 200,
      headers: {
        "Content-Type": image.contentType,
        "Content-Length": image.data.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("API GET /api/images/[id] error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await getAdminSession(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id: rawId } = await params;
    const id = rawId.split(".")[0];

    const deleted = await imageService.deleteImage(id);
    if (!deleted) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API DELETE /api/images/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
