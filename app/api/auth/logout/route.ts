import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/server/auth";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.delete(COOKIE_NAME);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
