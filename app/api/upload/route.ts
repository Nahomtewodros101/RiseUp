import type { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser, isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic"; 
export async function POST(req: NextRequest) {
  // Check if the user is an admin
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return new Response(
      JSON.stringify({ message: "Unauthorized: Admin access required" }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const user = await getCurrentUser();
  if (!user || !user.id) {
    return new Response(JSON.stringify({ message: "User not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return new Response(JSON.stringify({ message: "No image uploaded" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate file type (only allow images)
    if (!file.type.startsWith("image/")) {
      return new Response(
        JSON.stringify({ message: "Only image files are allowed" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate file size (≤5MB)
    if (file.size > 5 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ message: "Image size must be less than 5MB" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    await prisma.user.update({
      where: { id: user.id },
      data: { profileImage: base64Image },
    });

    return new Response(
      JSON.stringify({
        message: "Profile picture updated successfully",
        profileImage: base64Image, 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update profile picture" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
// get Profile Image
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !user.id) {
    return new Response(JSON.stringify({ message: "User not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const profileImage = await prisma.user.findUnique({
      where: { id: user.id },
      select: { profileImage: true },
    });

    if (!profileImage) {
      return new Response(
        JSON.stringify({ message: "Profile image not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Profile image retrieved successfully",
        profileImage: profileImage.profileImage,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error retrieving profile image:", error);
    return new Response(
      JSON.stringify({ message: "Failed to retrieve profile image" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}