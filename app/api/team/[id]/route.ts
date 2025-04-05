import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

// Team member schema
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

// For PATCH requests
const partialTeamMemberSchema = teamMemberSchema.partial();

// GET: Fetch team member by ID
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const teamMember = await prisma.teamMember.findUnique({ where: { id } });

    if (!teamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(teamMember);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: Full update
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  const { id } = params;

  try {
    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await req.json();
    const parsed = teamMemberSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await prisma.teamMember.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH: Partial update
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  const { id } = params;

  try {
    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await req.json();
    const parsed = partialTeamMemberSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await prisma.teamMember.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Remove team member
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  const { id } = params;

  try {
    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.teamMember.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
