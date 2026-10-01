import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import collectionRoutes from "./routes/collections";
import contentRoutes from "./routes/content";
import uploadRoutes from "./routes/upload";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "cuffkings-backend",
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/upload", uploadRoutes);

// Database Connection & Server Listen
const server = app.listen(PORT, () => {
  console.log(`[CuffKings Backend] Server running on http://localhost:${PORT}`);
  console.log(`[CuffKings Backend] Allowed origin: ${FRONTEND_URL}`);
  
  connectDB().catch((err) => {
    console.error("[CuffKings Backend] Warning: MongoDB connection failed:", err.message || err);
  });
});

export default app;
