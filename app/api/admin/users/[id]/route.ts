import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  // Check if user is admin
  const authError = await authMiddleware(request, ["admin"]);
  if (authError) return authError;

  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Validate role
    if (data.role !== "admin" && data.role !== "user") {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user role
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        role: data.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
// delete user by id (admin only)
export async function DELETE(request: NextRequest) {
  // Check if user is admin
  const authError = await authMiddleware(request, ["admin"]);
  if (authError) return authError;

  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete user
    const deletedUser = await db.user.delete({
      where: { id },
    });

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
