import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contact.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    console.error("Request URL:", request.url);
    console.error("Request Method:", request.method);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
