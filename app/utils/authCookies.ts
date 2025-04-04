"use server";

import { cookies } from "next/headers";

// Set JWT token in cookies
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "auth-token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  });
}

// Get JWT token from cookies
export async function getAuthCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("auth-token")?.value;
}

// Delete JWT token from cookies
export async function deleteAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: "auth-token",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
