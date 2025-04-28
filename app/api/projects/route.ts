import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  techStack: z.array(z.string()),
  link: z.string().optional(),
  images: z.array(z.string()),
  projectType: z.enum(["website", "app", "ui-design"]),
  testimonial: z.string().optional(),
  isFeatured: z.boolean().default(false),
});



export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectType = searchParams.get("projectType");
    const techStack = searchParams.getAll("techStack");
    const featured = searchParams.get("featured") === "true";

    const Projects = await prisma.project.findMany({
      where: {
        ...(featured ? { featured: true } : {}), 
      },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        techStack: true,
        link: true,
        projectType: true,
        featured: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Filter projects
    let filteredProjects = Projects;

    // Filter by projectType
    if (projectType && projectType !== "All") {
      filteredProjects = filteredProjects.filter(
        (project) => project.projectType === projectType
      );
    }

    // Filter by techStack
    if (techStack.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        techStack.every((tech) => project.techStack.includes(tech))
      );
    }

    return NextResponse.json(filteredProjects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  try {
    const body = await req.json();
    const validatedData = projectSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validatedData.error.format() },
        { status: 400 }
      );
    }

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

export async function PUT(req: NextRequest) {
  const authError = await authMiddleware(req, ["admin"]);
  if (authError) return authError;

  try {
    const body = await req.json();
    const validatedData = projectSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validatedData.error.format() },
        { status: 400 }
      );
    }

    const project = await prisma.project.update({
      where: { id: body.id },
      data: validatedData.data,
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
