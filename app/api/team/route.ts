import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

const teamMemberSchema = z.object({
  id: z.string().optional(), 
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

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({});

    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  try {
    const body = await req.json();
    console.log("Received body:", body); 

    const validatedData = teamMemberSchema.safeParse(body);

    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.format());
      return NextResponse.json(
        { error: "Invalid input data", details: validatedData.error.format() },
        { status: 400 }
      );
    }

    const teamMember = await prisma.teamMember.create({
      data: validatedData.data,
    });

    return NextResponse.json(teamMember, { status: 201 });
  } catch (error) {
    console.error("Failed to create team member:", error);
    return NextResponse.json(
      {
        error: "Failed to create team member",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
