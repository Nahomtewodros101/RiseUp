import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { authMiddleware } from "@/lib/auth";
type CareerFilter = {
  isActive?: boolean;
  department?: string;
};
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get("active");
    const department = searchParams.get("department");

    const filter: CareerFilter = {};
    if (isActive === "true") {
      filter.isActive = true;
    } else if (isActive === "false") {
      filter.isActive = false;
    }

    if (department) {
      filter.department = department;
    }

    const careers = await db.career.findMany({
      where: filter,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(careers);
  } catch (error) {
    console.error("Error fetching careers:", error);
    return NextResponse.json(
      { error: "Failed to fetch careers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await authMiddleware(request, ["admin"]);
  if (authError) return authError;

  try {
    const data = await request.json();

    const requiredFields = [
      "title",
      "department",
      "location",
      "type",
      "description",
      "responsibilities",
      "requirements",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const career = await db.career.create({
      data: {
        title: data.title,
        department: data.department,
        location: data.location,
        type: data.type,
        salary: data.salary,
        description: data.description,
        responsibilities: data.responsibilities,
        requirements: data.requirements,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(career, { status: 201 });
  } catch (error) {
    console.error("Error creating career:", error);
    return NextResponse.json(
      { error: "Failed to create career" },
      { status: 500 }
    );
  }
}
