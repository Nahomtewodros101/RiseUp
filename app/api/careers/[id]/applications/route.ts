import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await authMiddleware(request, ["admin"]);
  if (authError) return authError;

  try {
    const { id: careerId } = await context.params;

    const career = await db.career.findUnique({
      where: { id: careerId },
      select: {
        id: true,
        title: true,
      },
    });

    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    const applications = await db.jobApplication.findMany({
      where: {
        careerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ career, applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
