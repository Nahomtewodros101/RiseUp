import { type NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/db";

// Define the correct params type for Next.js 15 route handlers
type ContactParams = {
  params: {
    id: string;
  };
};

// GET handler to retrieve a specific contact by ID
export async function GET(request: NextRequest, context: ContactParams) {
  try {
    const id = context.params.id;

    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact" },
      { status: 500 }
    );
  }
}

// DELETE handler to remove a contact by ID
export async function DELETE(request: NextRequest, context: ContactParams) {
  try {
    const id = context.params.id;

    // Check if contact exists
    const existingContact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!existingContact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    // Delete the contact
    await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}

// PUT handler to update a contact by ID
export async function PUT(request: NextRequest, context: ContactParams) {
  try {
    const id = context.params.id;
    const body = await request.json();

    // Check if contact exists
    const existingContact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!existingContact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    // Update the contact
    const updatedContact = await prisma.contact.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}
