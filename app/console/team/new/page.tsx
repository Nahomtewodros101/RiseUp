import TeamMemberForm from "@/components/console/team/TeamMemberForm";

export default function NewTeamMemberPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add Team Member</h2>
        <p className="text-muted-foreground mt-2">
          Add a new member to your team
        </p>
      </div>

      <TeamMemberForm />
    </div>
  );
}
