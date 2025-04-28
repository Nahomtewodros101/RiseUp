import { notFound } from "next/navigation";
import TeamMemberForm from "@/components/console/team/TeamMemberForm";
import prisma from "@/lib/db";

export default async function EditTeamMemberPage({
  params: rawParams,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = await rawParams;

  const teamMember = await prisma.teamMember.findUnique({
    where: { id: params.id },
  });

  if (!teamMember) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit Team Member</h2>
        <p className="text-muted-foreground mt-2">
          Update team member information
        </p>
      </div>

      <TeamMemberForm
        initialData={{
          ...teamMember,
          image: teamMember.image ?? undefined,
          socialLinks: teamMember.socialLinks as {
            linkedin?: string;
            twitter?: string;
            github?: string;
            website?: string;
          },
        }}
        isEditing
      />
    </div>
  );
}
