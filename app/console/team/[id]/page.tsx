import { notFound } from "next/navigation";
import TeamMemberForm from "@/components/console/team/TeamMemberForm";
import prisma from "@/lib/db";

interface EditTeamMemberPageProps {
  params: Promise<{ id: string }>;  
}

export default async function EditTeamMemberPage({
  params,
}: EditTeamMemberPageProps) {

  const { id } = await params;

  try {
    
    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!teamMember) {
      notFound();
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Edit Team Member
          </h2>
          <p className="text-muted-foreground mt-2">
            Update team member information
          </p>
        </div>

        <TeamMemberForm initialData={teamMember} isEditing />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch team member:", error);
    notFound();
  }
}
