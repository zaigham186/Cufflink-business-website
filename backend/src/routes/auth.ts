import { Router, Request, Response } from "express";
import { signToken, requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

// POST /api/auth/login — Admin Login
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Placeholder auth check (to be integrated with ADMIN_PASSWORD_HASH in Phase 1, Step 6)
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required." });
    return;
  }

  // Temporary scaffold token issue
  const token = signToken({ id: "admin-1", role: "admin" });
  res.json({
    message: "Admin authenticated successfully.",
    token,
  });
});

// GET /api/auth/me — Check session
router.get("/me", requireAuth, (req: AuthRequest, res: Response) => {
  res.json({
    authenticated: true,
    user: req.user,
  });
});

export default router;
