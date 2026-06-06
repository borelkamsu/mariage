import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminToken } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword || password !== expectedPassword) {
    return NextResponse.json({ message: "Accès refusé." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, createAdminToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}
