import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { authMiddleware } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary"; // You'll create this file (see below)

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
  skills: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().default(0),
});

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        role: true,
        bio: true,
        image: true,
        isActive: true,
        skills: true,
        socialLinks: true,
        order: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(teamMembers, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
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
    // Parse multipart/form-data
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;
    const skills = formData.getAll("skills") as string[]; // if sent as array
    const isActive = formData.get("isActive") === "true";
    const order = Number(formData.get("order") || 0);

    // Social links as JSON string or individual fields
    let socialLinks: any = {};
    try {
      const socialLinksRaw = formData.get("socialLinks");
      if (typeof socialLinksRaw === "string") {
        socialLinks = JSON.parse(socialLinksRaw);
      } else {
        socialLinks = {
          twitter: formData.get("twitter") as string | undefined,
          linkedin: formData.get("linkedin") as string | undefined,
          github: formData.get("github") as string | undefined,
        };
      }
    } catch {
      socialLinks = {};
    }

    // Handle image upload
    const imageFile = formData.get("image") as File | null;
    if (!imageFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload buffer to Cloudinary
    const cloudinaryUpload = () =>
      new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "team_members" },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result as { secure_url: string });
          }
        );
        stream.end(buffer);
      });

    const uploadResult = await cloudinaryUpload();

    // Validate all data
    const validatedData = teamMemberSchema.safeParse({
      name,
      role,
      bio,
      image: uploadResult.secure_url,
      socialLinks,
      skills,
      isActive,
      order,
    });

    if (!validatedData.success) {
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
    return NextResponse.json(
      {
        error: "Failed to create team member",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}