import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { authMiddleware } from "@/lib/auth";

// Project schema for validation
const jobSchema = z.object({
  id: z.string().uuid("Invalid project ID"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Type is required"),
  salary: z.string().min(1, "Salary is required"),
  experience: z.string().min(1, "Experience is required"),
  responsibilities: z
    .array(z.string())
    .min(1, "At least one responsibility is required"),
  requirements: z
    .array(z.string())
    .min(1, "At least one requirement is required"),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

// GET all projects
// POST new job
export async function POST(req: NextRequest) {
    // Check authentication
    const authError = await authMiddleware(req, ["admin"]);
    if (authError) return authError;
  
    try {
      // Parse and validate request body
      const body = await req.json();
      const validatedData = jobSchema.safeParse(body);
  
      if (!validatedData.success) {
        return NextResponse.json(
          { error: "Invalid input data", details: validatedData.error.format() },
          { status: 400 }
        );
      }
  
      // Create new job
      const job = await prisma.job.create({
        data: validatedData.data,
      });
  
      return NextResponse.json(job, { status: 201 });
    } catch (error) {
      console.error("Failed to create job:", error);
      return NextResponse.json(
        { error: "Failed to create job" },
        { status: 500 }
      );
    }
  }
  