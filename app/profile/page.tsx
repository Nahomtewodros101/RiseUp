"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { User } from "@/types";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  // Handle profile picture upload
  const handleProfilePictureUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-300">
            Your Profile
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View and manage your profile details
          </p>
        </div>

        <Card className="bg-blue-50 dark:bg-gray-800 mt-6">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              View or update your profile details
            </CardDescription>
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
        <div className="mt-6 flex space-x-5 justify-end">
          <Button
            variant="outline"
            className="bg-blue-600 dark:bg-gray-700 text-white dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            className="bg-blue-600 dark:bg-gray-700 text-white dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
