// app/utils/auth.ts
import { type NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { z } from "zod";
import { cookies } from "next/headers";

// User types
export type UserRole = "user" | "admin";

export interface UserJwtPayload {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  profileImage?: string;
}

const envSchema = z.object({
  JWT_SECRET: z.string().min(1),
});

function getEnv() {
  const env = envSchema.safeParse({
    JWT_SECRET: process.env.JWT_SECRET,
  });

  if (!env.success) {
    throw new Error(
      "Environment variables validation failed: JWT_SECRET is required"
    );
  }

  return env.data;
}

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("auth-token")?.value;
}

// Sign JWT token
export async function signJwtToken(payload: UserJwtPayload): Promise<string> {
  const { JWT_SECRET } = getEnv();

  const token = await new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(JWT_SECRET));

  return token;
}

// Verify JWT token
export async function verifyJwtToken(
  token: string
): Promise<UserJwtPayload | null> {
  const { JWT_SECRET } = getEnv();

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    const userPayload = z
      .object({
        id: z.string(),
        email: z.string().email(),
        role: z.enum(["user", "admin"]),
        name: z.string(),
      })
      .safeParse(payload);

    if (!userPayload.success) {
      throw new Error("Invalid token payload");
    }

    return userPayload.data;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// Get current user from JWT token
export async function getCurrentUser(): Promise<UserJwtPayload | null> {
  try {
    const token = await getAuthCookie();

    if (!token) {
      return null;
    }

    const user = await verifyJwtToken(token);
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null && user.role === "admin";
}

export async function authMiddleware(
  req: NextRequest,
  allowedRoles: UserRole[] = ["user", "admin"]
) {
  const token = req.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const user = await verifyJwtToken(token);

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json(
      { error: "Insufficient permissions" },
      { status: 403 }
    );
  }

  return null;
}
