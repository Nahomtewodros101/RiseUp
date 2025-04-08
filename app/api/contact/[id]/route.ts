// app/api/contact/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    console.log("Contact ID is required", request.url);
    console.log("Contact ID is required", id);
    if (!id) {
      return NextResponse.json(
        { error: "Contact ID is required" },
        { status: 400 }
      );
    }

    const deletedContact = await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json(deletedContact, { status: 200 });
  } catch (error) {
    console.error("Failed to delete contact:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while deleting the contact" },
      { status: 500 }
    );
  }
}
