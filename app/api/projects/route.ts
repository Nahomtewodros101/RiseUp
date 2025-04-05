import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

// Project schema for validation
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  techStack: z.array(z.string()),
  link: z.string().optional(),
  images: z.array(z.string()),
  projectType: z.enum(["website", "app", "ui-design"]),
  testimonial: z.string().optional(),
  featured: z.boolean().default(false),
});

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(req: NextRequest) {
  // Check authentication
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  try {
    // Parse and validate request body
    const body = await req.json();
    const validatedData = projectSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validatedData.error.format() },
        { status: 400 }
      );
    }

    // Create new project
    const project = await prisma.project.create({
      data: validatedData.data,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(req: NextRequest) {
  // Check authentication
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  try {
    // Parse and validate request body
    const body = await req.json();
    const validatedData = projectSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validatedData.error.format() },
        { status: 400 }
      );
    }

    // Update project
    const project = await prisma.project.update({
      where: { id: body.id },
      data: validatedData.data,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json(
      { error: " hmm Failed to update project" },
      { status: 500 }
    );
  }
}
// DELETE project
export async function DELETE(req: NextRequest) {
  // Check authentication
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  try {
    // Parse and validate request body
    const { id } = await req.json();

    // Delete project
    const project = await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
