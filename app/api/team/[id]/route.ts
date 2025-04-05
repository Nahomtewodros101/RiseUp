import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

// PUT (update) a team member by ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const { id } = params;

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

    const updatedTeamMember = await prisma.teamMember.update({
      where: { id },
      data: body, // Use the raw request data here
    });

    return NextResponse.json(updatedTeamMember);
  } catch (error) {
    console.error("Failed to update team member:", error);
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}
