import mongoose from "mongoose";

let isConnected = false;

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("[MongoDB] MONGODB_URI not defined in environment. Running in mock/offline mode.");
    return;
  }

  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(uri);
    isConnected = db.connections[0].readyState === 1;
    console.log("[MongoDB] Connected to database successfully.");
  } catch (error) {
    console.error("[MongoDB] Connection error:", error);
    throw error;
  }
}

export default connectDB;
