"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";
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
import { motion } from "framer-motion";
import type { UserJwtPayload } from "@/lib/auth";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserJwtPayload | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setHasNotifications(data.hasNotifications); 
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const getPageTitle = () => {
    if (pathname === "/console") return "Dashboard";
    if (pathname.startsWith("/console/projects")) return "Projects";
    if (pathname.startsWith("/console/team")) return "Team";
    if (pathname.startsWith("/console/settings")) return "Settings";
    return "Console";
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    window.location.href = "/login";
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleNotificationSubmit = async (data: {
    message: string;
    type: "info" | "warning" | "success";
    scheduled: boolean;
    scheduledDate: Date | null;
    targetAudience: string[];
    isPriority: boolean;
  }) => {
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
      <h1 className="text-xl font-bold">{getPageTitle()}</h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={openModal}
        >
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              layoutId="notification-dot"
            ></motion.div>
          )}
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-400">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center">
              <User className="mr-2 h-4 w-4" />
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

      {/* Enhanced Notification Modal */}
      <NotificationModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onSubmit={handleNotificationSubmit}
      />
    </header>
  );
}
