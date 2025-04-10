import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ providerId: number }> }
) {
  const authError = await authMiddleware(request, ["admin"]);
  if (authError) return authError;
  console.log("Fetching all users", context.params);
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        lastLogin: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
