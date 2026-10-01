import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/collections
router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Collections settings listing scaffolding.",
    collections: [],
  });
});

// PUT /api/collections/:id
router.put("/:id", requireAuth, (req: Request, res: Response) => {
  res.json({
    message: `Collection ${req.params.id} update scaffolding.`,
    data: req.body,
  });
});

export default router;
