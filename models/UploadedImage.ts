import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUploadedImage extends Document {
  filename: string;
  contentType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const UploadedImageSchema = new Schema<IUploadedImage>(
  {
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

const UploadedImageModel: Model<IUploadedImage> =
  mongoose.models.UploadedImage ||
  mongoose.model<IUploadedImage>("UploadedImage", UploadedImageSchema);

export default UploadedImageModel;
