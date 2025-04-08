"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Project schema for form validation
const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  techStack: z.array(z.string()).min(1, "At least one technology is required"),
  link: z.string().optional(),
  images: z.array(z.string()),
  projectType: z.enum(
    ["website", "app", "ui-ux", "cloud-services", "dev-ops"],
    {
      required_error: "Project type is required",
    }
  ),
  testimonial: z.string().optional(),
  featured: z.boolean().default(false).optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema> & {
  id?: string;
};

interface ProjectFormProps {
  initialData?: ProjectFormValues;
  isEditing?: boolean;
}

export default function ProjectForm({
  initialData,
  isEditing = false,
}: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTech, setNewTech] = useState("");
  const [newImage, setNewImage] = useState("");

  // Initialize form with default values or existing project data
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      thumbnail: "",
      techStack: [],
      link: "",
      images: [],
      projectType: "website",
      testimonial: "",
      featured: false,
    },
  });

  // Add a new technology to the tech stack
  const handleAddTech = () => {
    if (!newTech.trim()) return;

    const currentTechStack = form.getValues("techStack");
    if (!currentTechStack.includes(newTech)) {
      form.setValue("techStack", [...currentTechStack, newTech]);
    }
    setNewTech("");
  };

  // Remove a technology from the tech stack
  const handleRemoveTech = (tech: string) => {
    const currentTechStack = form.getValues("techStack");
    form.setValue(
      "techStack",
      currentTechStack.filter((t) => t !== tech)
    );
  };

  // Add a new image URL
  const handleAddImage = () => {
    if (!newImage.trim()) return;

    const currentImages = form.getValues("images");
    if (!currentImages.includes(newImage)) {
      form.setValue("images", [...currentImages, newImage]);
    }
    setNewImage("");
  };

  // Remove an image URL
  const handleRemoveImage = (image: string) => {
    const currentImages = form.getValues("images");
    form.setValue(
      "images",
      currentImages.filter((img) => img !== image)
    );
  };

  // Form submission handler
  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const url = isEditing
        ? `/api/projects/${initialData?.id}`
        : "/api/projects";

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
        throw new Error(errorData.error || "Failed to save project");
      }

      router.push("/console/projects");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Project title"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Project description"
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
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="app">App</SelectItem>
                          <SelectItem value="ui-ux">UI/UX</SelectItem>
                          <SelectItem value="cloud-services">
                            Cloud services
                          </SelectItem>
                          <SelectItem value="dev-ops">Dev Ops</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Link (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        Link to the live project or demo
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Featured Project
                        </FormLabel>
                        <FormDescription>
                          Display this project prominently on the homepage
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
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        URL for the main project thumbnail
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-6">
                  <FormLabel>Additional Images</FormLabel>
                  <div className="flex mt-2">
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      onClick={handleAddImage}
                      className="ml-2"
                      disabled={isSubmitting}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormDescription className="mt-2">
                    Add URLs for additional project images
                  </FormDescription>

                  <div className="mt-4 space-y-2">
                    {form.watch("images").map((image, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border p-2"
                      >
                        <span className="text-sm truncate max-w-[300px]">
                          {image}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveImage(image)}
                          disabled={isSubmitting}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div>
                  <FormLabel>Tech Stack</FormLabel>
                  <div className="flex mt-2">
                    <Input
                      placeholder="React, Node.js, etc."
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      onClick={handleAddTech}
                      className="ml-2"
                      disabled={isSubmitting}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormDescription className="mt-2">
                    Add technologies used in this project
                  </FormDescription>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {form.watch("techStack").map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tech}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => handleRemoveTech(tech)}
                          disabled={isSubmitting}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  {form.formState.errors.techStack && (
                    <p className="text-sm font-medium text-destructive mt-2">
                      {form.formState.errors.techStack.message}
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="testimonial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Testimonial (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Client testimonial or feedback"
                            className="min-h-[100px]"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormDescription>
                          Add a client testimonial for this project
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/console/projects")}
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
              <>{isEditing ? "Update Project" : "Create Project"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
