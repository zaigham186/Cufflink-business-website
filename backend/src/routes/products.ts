import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/products — List all products (public)
router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Products listing endpoint. To be connected to MongoDB in Phase 1, Step 2.",
    products: [],
  });
});

// GET /api/products/:id — Get single product (public)
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Product details for ${id}.`,
    product: null,
  });
});

// POST /api/products — Create product (admin protected)
router.post("/", requireAuth, (req: Request, res: Response) => {
  res.status(201).json({
    message: "Product creation scaffolding.",
    data: req.body,
  });
});

// PUT /api/products/:id — Update product (admin protected)
router.put("/:id", requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Product ${id} update scaffolding.`,
    data: req.body,
  });
});

// DELETE /api/products/:id — Delete product (admin protected)
router.delete("/:id", requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Product ${id} deletion scaffolding.`,
  });
});

export default router;
