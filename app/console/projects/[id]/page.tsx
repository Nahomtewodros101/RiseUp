import { notFound } from "next/navigation";
import ProjectForm from "@/components/console/projects/ProjectForm";
import prisma from "@/lib/db";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({ params }: PageProps) {
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
          projectType: project.projectType as
            | "website"
            | "app"
            | "ui-ux"
            | "cloud-services"
            | "dev-ops",
          link: project.link ?? undefined,
          testimonial: project.testimonial ?? undefined,
        }}
        isEditing
      />
    </div>
  );
}
