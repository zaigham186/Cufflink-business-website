import { imageRepository, StoredImageMetadata } from "@/lib/server/repositories/image.repository";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

export class ImageService {
  async processAndSaveImage(file: File): Promise<{
    url: string;
    id: string;
    filename: string;
    size: number;
    contentType: string;
  }> {
    if (!file) {
      throw new Error("No file provided");
    }

    const contentType = (file.type || "image/jpeg").toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(contentType)) {
      throw new Error(
        `Unsupported image type "${contentType}". Please upload JPG, PNG, WEBP, or AVIF.`
      );
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      throw new Error("File exceeds maximum allowed size of 10MB");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize filename
    const safeFilename = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .substring(0, 100);

    const saved = await imageRepository.saveImage({
      filename: safeFilename || "product-image.webp",
      contentType,
      size: buffer.length,
      data: buffer,
    });

    return {
      url: `/api/images/${saved.id}`,
      id: saved.id,
      filename: saved.filename,
      size: saved.size,
      contentType: saved.contentType,
    };
  }

  async getImageById(id: string) {
    return imageRepository.getImageById(id);
  }

  async deleteImage(id: string) {
    return imageRepository.deleteImage(id);
  }
}

export const imageService = new ImageService();
