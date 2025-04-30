"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, User2, LogIn, Bell } from "lucide-react";
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
import { User, Notification } from "@/types";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
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
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();

          setNotifications(
            Array.isArray(data.notifications) ? data.notifications : []
          );
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setNotifications([]);
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

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
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
    { href: "/team", label: "Partners" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/jobs", label: "Jobs" },
  ];

  function handleNotificationSubmit(data: Notification): Promise<void> {
    return new Promise((resolve) => {
      setNotifications((prev) => [...prev, data]);
      resolve();
    });
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
        {/* Logo & home */}
        <Link href="/" className="flex items-center">
          <motion.div
            className="flex items-center justify-center rounded-lg bg-transparent text-white p-1 "
            whileHover={{ rotate: 5 }}
          >
            <Image className="rounded-lg" src="/natqmem.jpg" alt="Qmem Logo" width={50} height={50} />
          </motion.div>
          <span className="font-bold text-xl text-blue-800 dark:text-blue-200">
            Qmem Cloud
          </span>
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
                            {isLoading ? (
                              <User2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            ) : user?.profileImage ? (
                              <Image
                                src={user.profileImage}
                                alt="Profile picture"
                                className="rounded-full object-cover"
                                width={32}
                                height={32}
                              />
                            ) : (
                              user?.name?.charAt(0) || "U"
                            )}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center">
                        <User2 className="mr-2 h-4 w-4" />
                        <span>{user.name}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-500">
                        {user.email}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-600 text-blue-600 hover:bg-blue-100"
                    >
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
            {isOpen ? (
              <X className="h-6 w-6 text-blue-600" />
            ) : (
              <Menu className="h-6 w-6 text-blue-600" />
            )}
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
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      Admin Console
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full text-left justify-start border-blue-600 text-blue-600 hover:bg-blue-100"
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
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-blue-600 text-blue-600 hover:bg-blue-100"
                      >
                        <LogIn className="h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button
                        variant="default"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto mt-10 bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-blue-800 dark:text-blue-200">
              <span>Notifications</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {Array.isArray(notifications) && notifications.length === 0 ? (
              <p className="text-center text-blue-600 dark:text-blue-400">
                No notifications found.
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border border-blue-200 dark:border-blue-700 rounded-lg overflow-hidden"
                >
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          {notification.creator?.name?.charAt(0) || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-blue-800 dark:text-blue-200">
                          {notification.creator?.name || " Admin"}
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
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
                          className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700"
                        >
                          Priority
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={cn(
                          notification.type === "info" &&
                            "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-700",
                          notification.type === "warning" &&
                            "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700",
                          notification.type === "success" &&
                            "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700"
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
                        <p className="whitespace-pre-wrap text-blue-800 dark:text-blue-200">
                          {notification.message}
                        </p>
                        {notification.scheduled &&
                          notification.scheduledDate && (
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                              Scheduled for:{" "}
                              {format(
                                new Date(notification.scheduledDate),
                                "MMM d, yyyy"
                              )}
                            </p>
                          )}
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
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
