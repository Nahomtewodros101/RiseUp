import { type NextRequest } from "next/server";
import db from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

// GET application by ID (admin only)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await authMiddleware(request, ["admin"]);
  if (authError) return authError;

  try {
    const { id } = await context.params;

    const application = await db.jobApplication.findUnique({
      where: { id },
      include: {
        careerPosition: true,
      },
    });

    if (!application) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(application), { status: 200 });
  } catch (error) {
    console.error("Error fetching application:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch application" }),
      { status: 500 }
    );
  }
}

// PUT update application status (admin only)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await authMiddleware(request, ["admin"]);
  if (authError) return authError;

  try {
    const { id } = await context.params;
    const data = await request.json();

    const existingApplication = await db.jobApplication.findUnique({
      where: { id },
    });

    if (!existingApplication) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404,
      });
    }

    const updatedApplication = await db.jobApplication.update({
      where: { id },
      data: {
        status: data.status,
      },
    });

    return new Response(JSON.stringify(updatedApplication), { status: 200 });
  } catch (error) {
    console.error("Error updating application:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update application" }),
      { status: 500 }
    );
  }
}
