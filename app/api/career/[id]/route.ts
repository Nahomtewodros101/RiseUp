import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

// Job schema for validation
const jobSchema = z.object({
  id: z.string().uuid("Invalid job ID"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Type is required"),
  salary: z.string().min(1, "Salary is required"),
  responsibilities: z
    .array(z.string())
    .min(1, "At least one responsibility is required"),
  requirements: z
    .array(z.string())
    .min(1, "At least one requirement is required"),
});

// DELETE a job by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(request.url);
  console.log(id);
  try {
    // Extract job ID from URL parameters
    const { id } = await params;

    // Delete the job
    const job = await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("Failed to delete job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}

// PATCH (update) a job by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

 console.log(id);
  try {
    // Extract job ID from URL parameters
    const { id } = await params;

    // Parse and validate request body
    const body = await request.json();
    const validatedData = jobSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validatedData.error.format() },
        { status: 400 }
      );
    }

    // Update the job
    const job = await prisma.job.update({
      where: { id },
      data: validatedData.data,
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("Failed to update job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}
