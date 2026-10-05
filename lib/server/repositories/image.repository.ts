import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/server/db";
import UploadedImageModel, { IUploadedImage } from "@/models/UploadedImage";

export interface StoredImageMetadata {
  id: string;
  filename: string;
  contentType: string;
  size: number;
}

export class ImageRepository {
  async saveImage(params: {
    filename: string;
    contentType: string;
    size: number;
    data: Buffer;
  }): Promise<StoredImageMetadata> {
    await connectToDatabase();
    const created = await UploadedImageModel.create(params);
    return {
      id: created._id.toString(),
      filename: created.filename,
      contentType: created.contentType,
      size: created.size,
    };
  }

  async getImageById(id: string): Promise<{ data: Buffer; contentType: string; filename: string } | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    await connectToDatabase();
    const doc = await UploadedImageModel.findById(id).lean();
    if (!doc || !doc.data) return null;

    // Buffer handling from MongoDB BSON Binary
    const buffer = Buffer.isBuffer(doc.data)
      ? doc.data
      : Buffer.from((doc.data as any).buffer || (doc.data as any));

    return {
      data: buffer,
      contentType: doc.contentType || "image/jpeg",
      filename: doc.filename || "image.jpg",
    };
  }

  async deleteImage(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    await connectToDatabase();
    const res = await UploadedImageModel.findByIdAndDelete(id);
    return Boolean(res);
  }
}

export const imageRepository = new ImageRepository();
