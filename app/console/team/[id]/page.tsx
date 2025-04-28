// src/components/console/team/TeamMemberForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

// Schema aligned with Prisma's TeamMember model
const teamMemberFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().min(1, "Bio is required"),
  image: z.string().nullable().optional(), // Allow string, null, or undefined
  socialLinks: z
    .object({
      twitter: z.string().nullable().optional(),
      linkedin: z.string().nullable().optional(),
      github: z.string().nullable().optional(),
    })
    .optional(),
  skills: z.array(z.string()).optional(),
  isActive: z.boolean(),
  order: z.number().int(),
});

type TeamMemberFormValues = z.infer<typeof teamMemberFormSchema> & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date; // Added to match Prisma field
};

interface TeamMemberFormProps {
  initialData?: TeamMemberFormValues;
  isEditing?: boolean;
}

export default function TeamMemberForm({
  initialData,
  isEditing = false,
}: TeamMemberFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSkill, setCurrentSkill] = useState<string>("");

  const form = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberFormSchema),
    defaultValues: initialData || {
      name: "",
      role: "",
      bio: "",
      image: "", // Default to empty string for form input
      socialLinks: {
        twitter: "",
        linkedin: "",
        github: "",
      },
      skills: [],
      isActive: true,
      order: 0,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
  });

  const onSubmit = async (data: TeamMemberFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const url = isEditing ? `/api/team/${initialData?.id}` : "/api/team";
      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save team member");
      }

      router.push("/console/team");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSkill = () => {
    if (currentSkill.trim()) {
      const newSkills = [
        ...(form.getValues("skills") || []),
        currentSkill.trim(),
      ];
      form.setValue("skills", newSkills, { shouldValidate: true });
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = (form.getValues("skills") || []).filter(
      (skill) => skill !== skillToRemove
    );
    form.setValue("skills", newSkills, { shouldValidate: true });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Full name"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Job title"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Professional biography"
                          className="min-h-[120px]"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expertise</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input
                              placeholder="e.g., JavaScript"
                              value={currentSkill}
                              onChange={(e) => setCurrentSkill(e.target.value)}
                              onKeyPress={handleKeyPress}
                              disabled={isSubmitting}
                            />
                            <Button
                              type="button"
                              onClick={handleAddSkill}
                              disabled={isSubmitting || !currentSkill.trim()}
                            >
                              Add
                            </Button>
                          </div>
                          <AnimatePresence>
                            {field.value?.map((skill, index) => (
                              <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{
                                  duration: 0.2,
                                  delay: index * 0.05,
                                }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-blue-500 text-white font-bold uppercase text-xs py-1 px-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 hover:rotate-2"
                                >
                                  {skill}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 text-white hover:text-red-300"
                                    onClick={() => handleRemoveSkill(skill)}
                                    disabled={isSubmitting}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Add one skill at a time. Each skill will be displayed as
                        a vibrant badge.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value) || 0)
                          }
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        Order in which team member appears
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Active Status
                        </FormLabel>
                        <FormDescription>
                          Show this team member on the website
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                          value={field.value ?? ""}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        URL for the team members profile image (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <FormField
                  control={form.control}
                  name="socialLinks.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://twitter.com/username"
                          {...field}
                          value={field.value ?? ""}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          {...field}
                          value={field.value ?? ""}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username"
                          {...field}
                          value={field.value ?? ""}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/console/team")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{isEditing ? "Update Team Member" : "Create Team Member"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
