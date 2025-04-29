"use client";

import { useState, useEffect } from "react";
import { Bell, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/ThemeToggle";
import NotificationModal from "@/components/NotficationModal";
import type { Notification, User } from "@/types";
import Image from "next/image";
import { toast } from "sonner";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched user data:", data);
        setUser(data.user || null);
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

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    window.location.href = "/login";
  };

  const closeModal = () => setIsModalOpen(false);

  const handleNotificationSubmit = async (data: Notification) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const toast = document.createElement("div");
        toast.className =
          "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50";
        toast.textContent = data.scheduled
          ? "Notification scheduled successfully"
          : "Notification posted successfully";

        document.body.appendChild(toast);

        setTimeout(() => {
          toast.remove();
        }, 3000);

        closeModal();
      } else {
        alert("Failed to post notification");
      }
    } catch (error) {
      console.error("Failed to post notification:", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md px-4 md:px-6">
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsModalOpen(true)}
          title="Post Notification"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Post Notification</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {user?.profileImage ? (
                  <Image
                    src={user.profileImage}
                    alt="Profile picture"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                    onLoad={() =>
                      console.log(
                        "Profile image loaded successfully",
                        user.profileImage
                      )
                    }
                    onError={() =>
                      console.error("Failed to load profile image")
                    }
                  />
                ) : (
                  <AvatarFallback className="bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-400">
                    {isLoading ? (
                      <User2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <User2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center">
              <User2 className="mr-2 h-4 w-4" />
              <span>{user?.name || "User"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-500">
              {user?.email || "user@example.com"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <NotificationModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onSubmit={handleNotificationSubmit}
      />
    </header>
  );
}
