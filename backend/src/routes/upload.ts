import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/upload — Asset upload (Vercel Blob / server upload)
router.post("/", requireAuth, (_req: Request, res: Response) => {
  res.status(501).json({
    message: "Asset upload endpoint scaffolding. Vercel Blob integration in Phase 1, Step 3.",
  });
});

export default router;
