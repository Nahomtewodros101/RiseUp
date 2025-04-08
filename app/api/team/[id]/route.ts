import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

// PATCH (update) a team member's status (e.g., activate or deactivate)
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const { id } = await params;

  // Check authentication
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  try {
    const existingTeamMember = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!existingTeamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    const body = await req.json();

    // Only updating the 'isActive' status
    if (typeof body.isActive !== "boolean") {
      return NextResponse.json(
        { error: "Invalid 'isActive' value" },
        { status: 400 }
      );
    }

    const updatedTeamMember = await prisma.teamMember.update({
      where: { id },
      data: {
        isActive: body.isActive,
      },
    });

    return NextResponse.json(updatedTeamMember);
  } catch (error) {
    console.error("Failed to update team member status:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update team member status",
      },
      { status: 500 }
    );
  }
}
