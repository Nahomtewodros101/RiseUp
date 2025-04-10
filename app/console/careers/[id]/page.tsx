"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Career form schema
const careerFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Job type is required"),
  salary: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  responsibilities: z
    .array(z.string())
    .min(1, "At least one responsibility is required"),
  requirements: z
    .array(z.string())
    .min(1, "At least one requirement is required"),
  isActive: z.boolean({
    required_error: "Active status is required",
  }),
});

type CareerFormValues = z.infer<typeof careerFormSchema>;

export default function EditCareerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CareerFormValues>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      title: "",
      department: "",
      location: "",
      type: "",
      salary: "",
      description: "",
      responsibilities: [""],
      requirements: [""],
      isActive: true,
    },
  });

  useEffect(() => {
    if (!id) return;

    const fetchCareer = async () => {
      try {
        const response = await fetch(`/api/careers/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch career");
        }

        const career = await response.json();

        form.reset({
          title: career.title,
          department: career.department,
          location: career.location,
          type: career.type,
          salary: career.salary || "",
          description: career.description,
          responsibilities: career.responsibilities,
          requirements: career.requirements,
          isActive: career.isActive,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching career:", error);
        setError("Failed to load career data. Please try again.");
        setIsLoading(false);
      }
    };

    fetchCareer();
  }, [id, form]);

  const onSubmit = async (data: CareerFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/careers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update career");
      }

      router.push("/console/careers");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setIsSubmitting(false);
    }
  };

  const addResponsibility = () => {
    const current = form.getValues("responsibilities");
    form.setValue("responsibilities", [...current, ""]);
  };

  const removeResponsibility = (index: number) => {
    const current = form.getValues("responsibilities");
    if (current.length > 1) {
      form.setValue(
        "responsibilities",
        current.filter((_, i) => i !== index)
      );
    }
  };

  const addRequirement = () => {
    const current = form.getValues("requirements");
    form.setValue("requirements", [...current, ""]);
  };

  const removeRequirement = (index: number) => {
    const current = form.getValues("requirements");
    if (current.length > 1) {
      form.setValue(
        "requirements",
        current.filter((_, i) => i !== index)
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-muted-foreground h-8 w-8" />
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Career</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Job Title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Department" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Full-time, Part-time, etc."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. $100,000/year" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Describe the role" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Responsibilities */}
              <div className="space-y-2">
                <FormLabel>Responsibilities</FormLabel>
                {form.watch("responsibilities").map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`responsibilities.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={`Responsibility ${index + 1}`}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeResponsibility(index)}
                      disabled={form.watch("responsibilities").length <= 1}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addResponsibility}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Responsibility
                </Button>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <FormLabel>Requirements</FormLabel>
                {form.watch("requirements").map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`requirements.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={`Requirement ${index + 1}`}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeRequirement(index)}
                      disabled={form.watch("requirements").length <= 1}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addRequirement}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Requirement
                </Button>
              </div>

              {/* Active Toggle */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between border p-4 rounded-lg">
                    <div>
                      <FormLabel>Active</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
