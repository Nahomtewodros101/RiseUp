import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

// Project schema for validation
const projectSchema = z.object({
  id: z.string().optional(),
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

// GET a single project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// DELETE a project by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(request.url);
  try {
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

// PATCH (update) a project by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const parsedBody = projectSchema.partial().parse(body);

    const project = await prisma.project.update({
      where: { id },
      data: parsedBody,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
