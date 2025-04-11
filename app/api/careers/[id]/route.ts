import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: careerId } = await context.params;

    const career = await db.career.findUnique({
      where: { id: careerId },
    });

    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json(career, { status: 200 });
  } catch (error) {
    console.error("Error fetching career:", error);
    return NextResponse.json(
      { error: "Failed to fetch career" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await authMiddleware(request, ["admin"]);
  if (authError) return authError;

  try {
    const { id: careerId } = await context.params;

    const existingCareer = await db.career.findUnique({
      where: { id: careerId },
    });

    if (!existingCareer) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    // Delete the career
    const deletedCareer = await db.career.delete({
      where: { id: careerId },
    });

    return NextResponse.json(deletedCareer, { status: 200 });
  } catch (error) {
    console.error("Error deleting career:", error);
    return NextResponse.json(
      { error: "Failed to delete career" },
      { status: 500 }
    );
  }
}
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await authMiddleware(request, ["admin"]);
  if (authError) return authError;

  try {
    const { id: careerId } = await context.params;
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Request body is empty or invalid" },
        { status: 400 }
      );
    }

    const existingCareer = await db.career.findUnique({
      where: { id: careerId },
    });

    if (!existingCareer) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    const updatedCareer = await db.career.update({
      where: { id: careerId },
      data: body,
    });

    return NextResponse.json(updatedCareer, { status: 200 });
  } catch (error) {
    console.error("Error updating career:", error);
    return NextResponse.json(
      { error: "Failed to update career" },
      { status: 500 }
    );
  }
}
