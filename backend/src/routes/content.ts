import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/content
router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Site content listing scaffolding.",
    content: [],
  });
});

// PUT /api/content/:key
router.put("/:key", requireAuth, (req: Request, res: Response) => {
  res.json({
    message: `Content block ${req.params.key} update scaffolding.`,
    data: req.body,
  });
});

export default router;
