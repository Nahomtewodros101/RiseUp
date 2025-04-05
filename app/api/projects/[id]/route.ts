// pages/api/projects/[id].js

import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const deletedProject = await prisma.project.delete({
      where: { id: id },
    });

    if (!deletedProject) {
      return new Response(JSON.stringify({ message: "Project not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Project deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
