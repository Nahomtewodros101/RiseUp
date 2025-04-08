import { notFound } from "next/navigation";
import ProjectForm from "@/components/console/projects/ProjectForm";
import prisma from "@/lib/db";

export default async function EditProjectPage({
  params: rawParams,
}: { params: { id: string } }) {
  // Await params if necessary
  const params = await rawParams;

  // Fetch project data
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit Project</h2>
        <p className="text-muted-foreground mt-2">Update project information</p>
      </div>

      <ProjectForm
        initialData={{
          ...project,
          link: project.link ?? undefined,
          projectType: project.projectType as
            | "website"
            | "app"
            | "ui-ux"
            | "cloud-services"
            | "dev-ops",
          testimonial: project.testimonial ?? undefined,
        }}
        isEditing
      />
    </div>
  );
}
