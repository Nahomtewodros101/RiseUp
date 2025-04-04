import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // Delete auth cookie with proper options
  const cookieStore = await cookies();
  cookieStore.delete({
    name: "auth-token",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return NextResponse.json({ success: true })
}

