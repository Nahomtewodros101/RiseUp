import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authMiddleware } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

type UpdateData = {
  isActive?: boolean;
  name?: string;
  role?: string;
  bio?: string;
  image?: string;
  socialLinks?: string;
  skills?: string[];
};

// Set your Cloudinary config in env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

async function uploadToCloudinary(fileBuffer: Buffer, filename?: string) {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "team-members",
        public_id: filename
          ? filename.split(".").slice(0, -1).join(".")
          : undefined,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result)
          return reject(error || "No result from Cloudinary");
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
}

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

    let updateData: UpdateData = {};
    let formData: FormData | null = null;
    let contentType = request.headers.get("content-type") || "";

    if (contentType.startsWith("multipart/form-data")) {
      formData = await request.formData();

      const isActive = formData.get("isActive");
      if (isActive !== null) updateData.isActive = isActive === "true";

      if (formData.get("name"))
        updateData.name = formData.get("name") as string;
      if (formData.get("role"))
        updateData.role = formData.get("role") as string;
      if (formData.get("bio")) updateData.bio = formData.get("bio") as string;

      // Handle image upload
      const image = formData.get("image");
      if (image && typeof image === "object" && "arrayBuffer" in image) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const uploadedUrl = await uploadToCloudinary(
          buffer,
          (image as File).name
        );
        updateData.image = uploadedUrl;
      }

      if (formData.get("socialLinks"))
        updateData.socialLinks = formData.get("socialLinks") as string;
      if (formData.getAll("skills")) {
        // skills as array
        const skillsRaw = formData.getAll("skills");
        updateData.skills = skillsRaw.map((s) => s.toString());
      }
    } else {
      // JSON fallback (e.g. PATCH from dashboard, not multipart)
      const body = await request.json();
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

      // If body.image is a file (not URL), upload to Cloudinary
      if (body.image && typeof body.image !== "string") {
        return NextResponse.json(
          { error: "Image upload must be sent as multipart/form-data" },
          { status: 400 }
        );
      } else if (typeof body.image === "string") {
        updateData.image = body.image;
      }

      if (body.socialLinks) updateData.socialLinks = body.socialLinks;
      if (body.skills && Array.isArray(body.skills))
        updateData.skills = body.skills;
    }

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
