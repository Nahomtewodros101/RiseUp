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
  try {
    const data = await request.json();

    const requiredFields = [
      "careerId",
      "fullName",
      "email",
      "phone",
      "resumeUrl",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const career = await db.career.findUnique({
      where: { id: data.careerId },
    });
    if (!career) {
      return NextResponse.json(
        { error: "Invalid careerId: Career not found" },
        { status: 400 }
      );
    }

    const application = await db.jobApplication.create({
      data: {
        careerId: data.careerId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        resumeUrl: data.resumeUrl,
        coverLetter: data.coverLetter || "",
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}
