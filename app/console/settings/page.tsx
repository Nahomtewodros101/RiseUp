"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Upload, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Image from "next/image";
import { User } from "@/types";

// Password form schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Failed to load user data");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle password form submission
  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
        credentials: "include",
      });

      if (response.ok) {
        passwordForm.reset();
        setSuccess("Password updated successfully");
        toast.success("Password updated successfully");

        await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: "Your password was updated successfully.",
            type: "success",
            targetAudience: [user?.id],
            isPriority: false,
            createdBy: user?.id,
            creator: {
              connect: { id: user?.id },
            },
          }),
          credentials: "include",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfilePictureUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    console.log("File:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    if (file.size === 0) {
      toast.error("Selected file is empty");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      console.log("FormData contents:", Array.from(formData.entries()));

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser((prev) =>
          prev ? { ...prev, profileImage: data.profileImage } : prev
        );
        setSuccess("Profile picture updated successfully");
        toast.success("Profile picture updated successfully");

        await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: "Your profile picture was updated successfully.",
            type: "success",
            targetAudience: [user?.id],
            isPriority: false,
            createdBy: user?.id,
            creator: {
              connect: { id: user?.id },
            },
          }),
          credentials: "include",
        });
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(
          errorData.message || "Failed to update profile picture"
        );
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight text-blue-600 dark:text-gray-100">
          Admin Settings
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account preferences
        </p>
      </div>

      <Tabs defaultValue="account" className="mt-6">
        <TabsList className="bg-blue-50 dark:bg-gray-800 text-blue-600">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/30"
          >
            <User2 className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/30"
          >
            <Lock className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-6">
          <Card className="bg-blue-50 dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="mb-6 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              {user ? (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Profile Picture
                    </label>
                    <div className="mt-2 flex items-center space-x-4">
                      {user.profileImage ? (
                        <Image
                          src={user.profileImage}
                          alt="Profile picture"
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <User2 className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                        </div>
                      )}
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePictureUpload}
                          disabled={isUploading || !user}
                          className="hidden"
                          id="profile-picture-upload"
                        />
                        <Button
                          asChild
                          disabled={isUploading || !user}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <label
                            htmlFor="profile-picture-upload"
                            className="cursor-pointer"
                          >
                            {isUploading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload New Picture
                              </>
                            )}
                          </label>
                        </Button>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Max 5MB, PNG, JPEG, or JPG
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-gray-100">
                      {user.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-gray-100">
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Role
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-gray-100">
                      {user.role}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Updated
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-gray-100">
                      {user.updatedAt
                        ? new Date(user.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Login
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-gray-100">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Joined
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-gray-100">
                      {user.createdAt
                        ? new Date(user.createdAt).getFullYear()
                        : "2025"}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-red-600 dark:text-red-400">
                  Failed to load user data
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card className="bg-blue-50 dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="mb-6 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="space-y-6"
                  aria-labelledby="change-password-title"
                >
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            disabled={isSubmitting || !user}
                            aria-required="true"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            disabled={isSubmitting || !user}
                            aria-required="true"
                          />
                        </FormControl>
                        <FormDescription>
                          Password must be at least 6 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            disabled={isSubmitting || !user}
                            aria-required="true"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !user}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
