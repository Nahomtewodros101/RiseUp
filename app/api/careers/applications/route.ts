import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { authMiddleware } from "@/lib/auth";
export async function GET(request: NextRequest) {
  const authError = await authMiddleware(request, ["admin"]);
  if (authError) return authError;

  try {
    const applications = await db.jobApplication.findMany({
      include: {
        careerPosition: {
          select: {
            id: true,
            title: true,
            department: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { careerId, fullName, email, phone, resumeUrl, coverLetter } = data;

    const newApplication = await db.jobApplication.create({
      data: {
        careerId,
        fullName,
        email,
        phone,
        resumeUrl,
        coverLetter,
      },
    });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}
