// import { type NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";


// // GET a single project by ID
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const project = await prisma.project.findUnique({
//       where: { id: params.id },
//     });

//     if (!project) {
//       return NextResponse.json({ error: "Project not found" }, { status: 404 });
//     }

//     return NextResponse.json(project);
//   } catch (error) {
//     console.error("Failed to fetch project:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch project" },
//       { status: 500 }
//     );
//   }
// }
// //Delete a project by ID
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const project = await prisma.project.delete({
//       where: { id: params.id },
//     });

//     return NextResponse.json(project, { status: 200 });
//   } catch (error) {
//     console.error("Failed to delete project:", error);
//     return NextResponse.json(
//       { error: "Failed to delete project" },
//       { status: 500 }
//     );
//   }
// }

// // Other route handlers remain the same
