import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import type { JWTPayload } from "@/types/auth";

export const COOKIE_NAME = "ck_admin_token";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "CRITICAL SECURITY ERROR: JWT_SECRET environment variable is missing in production."
      );
    }
    // Safe dev-only notice
    return "dev_secret_cuffkings_local_only";
  }
  return secret;
}

export async function verifyPassword(plain: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash || !plain) return false;

  try {
    // Standard bcrypt verification
    if (
      hash.startsWith("$2a$") ||
      hash.startsWith("$2b$") ||
      hash.startsWith("$2y$")
    ) {
      return await bcrypt.compare(plain, hash);
    }

    // Allow plaintext comparison ONLY in non-production environments if explicitly configured
    if (process.env.NODE_ENV !== "production" && hash === plain) {
      return true;
    }
  } catch (error) {
    console.error("Password verification error:", error);
  }

  return false;
}

export function signAdminToken(): string {
  return jwt.sign({ role: "admin" }, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyAdminToken(token: string): boolean {
  try {
    const payload = jwt.verify(token, getJwtSecret()) as JWTPayload;
    return payload?.role === "admin";
  } catch {
    return false;
  }
}

export async function getAdminSession(req?: any): Promise<boolean> {
  try {
    if (req) {
      let token: string | undefined;
      if (req.cookies && typeof req.cookies.get === "function") {
        token = req.cookies.get(COOKIE_NAME)?.value;
      }
      if (!token && req.headers) {
        const cookieHeader =
          typeof req.headers.get === "function"
            ? req.headers.get("cookie")
            : req.headers.cookie;
        if (cookieHeader) {
          const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
          if (match) token = decodeURIComponent(match[1]);
        }
      }
      if (token) {
        return verifyAdminToken(token);
      }
    }

    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyAdminToken(token);
  } catch {
    return false;
  }
}

export const COOKIE_NAME_EXPORT = COOKIE_NAME;
