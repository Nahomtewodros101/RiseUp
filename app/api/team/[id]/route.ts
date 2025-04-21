import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

type UpdateData = {
  isActive?: boolean;
  name?: string;
  role?: string;
  bio?: string;
  image?: string;
  socialLinks?: string;
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Check authentication
  const authError = await authMiddleware(request, ["admin"]);
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

    const body = await request.json();

    const updateData: UpdateData = {};

    if (body.isActive !== undefined) {
      if (typeof body.isActive !== "boolean") {
        return NextResponse.json(
          { error: "Invalid 'isActive' value" },
          { status: 400 }
        );
      }
      updateData.isActive = body.isActive;
    }

    if (body.name) updateData.name = body.name;
    if (body.role) updateData.role = body.role;
    if (body.bio) updateData.bio = body.bio;
    if (body.image) updateData.image = body.image;
    if (body.socialLinks) updateData.socialLinks = body.socialLinks;

    const updatedTeamMember = await prisma.teamMember.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedTeamMember);
  } catch (error) {
    console.error("Failed to update team member:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update team member",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Check authentication
  const authError = await authMiddleware(request, ["admin"]);
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

    await prisma.teamMember.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Team member deleted successfully" });
  } catch (error) {
    console.error("Failed to delete team member:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete team member",
      },
      { status: 500 }
    );
  }
}
