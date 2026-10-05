import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, signAdminToken, COOKIE_NAME } from "@/lib/server/auth";
import { loginSchema } from "@/lib/validations/auth.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const isValid = await verifyPassword(parsed.data.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials. Access denied." },
        { status: 401 }
      );
    }

    const token = signAdminToken();
    const response = NextResponse.json({ success: true, message: "Authenticated successfully" });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("API /api/auth/login error:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred" },
      { status: 500 }
    );
  }
}
