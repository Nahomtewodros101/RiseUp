import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// DELETE handler
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    await prisma.contact.delete({
      where: { id }, // Use the destructured `id`
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    console.error("Request URL:", request.url);
    console.error("Request Method:", request.method);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
