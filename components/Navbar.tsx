"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, User, LogIn, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import NotificationModal from "@/components/NotficationModal";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, CheckCircle } from "lucide-react";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface Notification {
  id: string;
  message: string;
  type: "info" | "warning" | "success";
  scheduled: boolean;
  scheduledDate: Date | null;
  targetAudience: string[];
  isPriority: boolean;
  createdAt: Date;
  creator: { name: string } | null;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const notificationRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications", {
          credentials: "include",
        });
        if (response.ok) {
          const data: Notification[] = await response.json(); 
          const formattedNotifications = data.map((notif: Notification) => ({
            ...notif,
            createdAt: new Date(notif.createdAt),
            scheduledDate: notif.scheduledDate
              ? new Date(notif.scheduledDate)
              : null,
          }));
          setNotifications(formattedNotifications);
        } else {
          console.error(
            "Failed to fetch notifications:",
            await response.json()
          );
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [user]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
      case "warning":
        return "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800";
      case "success":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/team", label: "Team" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/jobs", label: "Jobs" },
  ];

  function handleNotificationSubmit(data: Notification): Promise<void> {
    throw new Error("Function not implemented.");
    
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm"
          : "bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="flex items-center justify-center rounded-lg bg-blue-600 text-white p-1 w-8 h-8"
            whileHover={{ rotate: 5 }}
          >
            <span className="font-bold text-sm">👨🏾‍💻</span>
          </motion.div>
          <span className="font-bold text-xl">Rise Up!</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <div key={index} className="relative flex flex-col items-center">
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400"
                      layoutId="navbar-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </div>
            );
          })}
          {user && user.role === "admin" && (
            <div className="relative flex flex-col items-center">
              <Link
                href="/console"
                className={`relative text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  pathname === "/console"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                Admin Console
                {pathname === "/console" && (
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400"
                    layoutId="navbar-indicator"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {!isLoading && (
            <>
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => setIsPreviewOpen(true)}
                    ref={notificationRef}
                  >
                    <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    {notifications.length > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                        layoutId="notification-dot"
                      />
                    )}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                            {user.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>{user.name}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-500">
                        {user.email}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.role === "admin" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/console">Admin Console</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setIsNotificationModalOpen(true)}
                          >
                            <Bell className="mr-2 h-4 w-4" />
                            Post Notification
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={handleLogout}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="outline" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container border-t py-4 px-4 md:px-6 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={index}
                      href={link.href}
                      className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                {user && user.role === "admin" && (
                  <>
                    <Link
                      href="/console"
                      className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                        pathname === "/console"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray- depart: true"
                      }`}
                    >
                      Admin Console
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full text-left justify-start"
                      onClick={() => setIsNotificationModalOpen(true)}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Post Notification
                    </Button>
                  </>
                )}
                {!user && (
                  <>
                    <Link href="/login">
                      <Button variant="outline" className="w-full gap-2">
                        <LogIn className="h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button
                        variant="default"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        closeModal={() => setIsNotificationModalOpen(false)}
        onSubmit={handleNotificationSubmit}
      />

      {/* Notification Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto mt-10">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Notifications</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500">
                No notifications found.
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-400">
                          {notification.creator?.name?.charAt(0) || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {notification.creator?.name || "Unknown Admin"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(
                            new Date(notification.createdAt),
                            "MMM d, yyyy"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {notification.isPriority && (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-600 border-red-200"
                        >
                          Priority
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={cn(
                          notification.type === "info" &&
                            "bg-blue-50 text-blue-600 border-blue-200",
                          notification.type === "warning" &&
                            "bg-amber-50 text-amber-600 border-amber-200",
                          notification.type === "success" &&
                            "bg-green-50 text-green-600 border-green-200"
                        )}
                      >
                        {notification.type.charAt(0).toUpperCase() +
                          notification.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "p-4",
                      getNotificationColor(notification.type)
                    )}
                  >
                    <div className="flex gap-3">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <p className="whitespace-pre-wrap">
                          {notification.message}
                        </p>
                        {notification.scheduled &&
                          notification.scheduledDate && (
                            <p className="text-xs text-gray-500 mt-2">
                              Scheduled for:{" "}
                              {format(
                                new Date(notification.scheduledDate),
                                "MMM d, yyyy"
                              )}
                            </p>
                          )}
                        <p className="text-xs text-gray-500 mt-1">
                          Audience: {notification.targetAudience.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
