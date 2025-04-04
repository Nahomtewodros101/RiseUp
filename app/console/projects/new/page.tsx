import ProjectForm from "@/components/console/projects/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Create New Project
        </h2>
        <p className="text-muted-foreground mt-2">
          Add a new project to your portfolio
        </p>
      </div>

      <ProjectForm />
    </div>
  );
}
