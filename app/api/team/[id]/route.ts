import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

// Team member schema for validation
const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().min(1, "Bio is required"),
  image: z.string().min(1, "Image is required"),
  socialLinks: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
  isActive: z.boolean().default(true),
  order: z.number().int().default(0),
});

// Partial update schema for PATCH requests
const partialTeamMemberSchema = teamMemberSchema.partial();

// GET a single team member by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teamMember = await prisma.teamMember.findUnique({
      where: { id: params.id },
    });

    if (!teamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(teamMember);
  } catch (error) {
    console.error("Failed to fetch team member:", error);
    return NextResponse.json(
      { error: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

// PUT (update) a team member by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  try {
    // Check if team member exists
    const existingTeamMember = await prisma.teamMember.findUnique({
      where: { id: params.id },
    });

    if (!existingTeamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedData = teamMemberSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validatedData.error.format() },
        { status: 400 }
      );
    }

    // Update team member
    const updatedTeamMember = await prisma.teamMember.update({
      where: { id: params.id },
      data: validatedData.data,
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

// PATCH (partial update) a team member by ID
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  try {
    // Check if team member exists
    const existingTeamMember = await prisma.teamMember.findUnique({
      where: { id: params.id },
    });

    if (!existingTeamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedData = partialTeamMemberSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validatedData.error.format() },
        { status: 400 }
      );
    }

    // Update team member
    const updatedTeamMember = await prisma.teamMember.update({
      where: { id: params.id },
      data: validatedData.data,
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

// DELETE a team member by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  try {
    // Check if team member exists
    const existingTeamMember = await prisma.teamMember.findUnique({
      where: { id: params.id },
    });

    if (!existingTeamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    // Delete team member
    await prisma.teamMember.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete team member:", error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
