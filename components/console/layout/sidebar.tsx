"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Briefcase,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isMobile: boolean;
  toggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export default function Sidebar({
  isMobile,
  toggleMobileSidebar,
  isMobileSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    window.location.href = "/login";
  };

  const openModal = () => setHasNotifications(!hasNotifications);

  const navItems = [
    {
      title: "Dashboard",
      href: "/console",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      href: "/console/projects",
      icon: FolderKanban,
    },
    {
      title: "Teams",
      href: "/console/team",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/console/settings",
      icon: Settings,
    },
    {
      title: "Careers",
      href: "/console/careers",
      icon: Briefcase,
    },
    {
      title: "Users",
      href: "/console/admin/users",
      icon: Users2,
    },
  ];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isMobileSidebarOpen) {
        // Check if the click is outside the sidebar
        const sidebar = document.getElementById("sidebar");
        const menuButton = document.getElementById("mobile-menu-button");

        if (
          sidebar &&
          !sidebar.contains(event.target as Node) &&
          menuButton &&
          !menuButton.contains(event.target as Node)
        ) {
          toggleMobileSidebar();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isMobileSidebarOpen, toggleMobileSidebar]);

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          id="mobile-menu-button"
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden"
          onClick={toggleMobileSidebar}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}

      {/* Mobile Backdrop Overlay */}
      {isMobile && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-950 border-r shadow-sm transition-all duration-300",
          // Desktop width
          !isMobile && (isCollapsed ? "w-[70px]" : "w-[250px]"),
          // Mobile positioning
          isMobile && "w-[250px]",
          isMobile &&
            (isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full")
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div
            className={cn(
              "flex items-center gap-2",
              !isMobile && isCollapsed && "justify-center w-full"
            )}
          >
            <div className="flex items-center justify-center rounded-lg bg-blue-600 text-white p-1 w-8 h-8">
              <span className="font-bold text-sm">QT</span>
            </div>
            {(!isCollapsed || isMobile) && (
              <span className="font-bold text-xl">Admin</span>
            )}
          </div>
          {!isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleCollapse}>
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className="block">
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative",
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {(!isCollapsed || isMobile) && (
                    <span className="truncate">{item.title}</span>
                  )}
                  {isActive && (!isCollapsed || isMobile) && (
                    <motion.span
                      className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
                      layoutId="sidebar-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
              !isMobile && isCollapsed && "justify-center"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            {(!isCollapsed || isMobile) && "Logout"}
          </Button>
        </div>
      </div>
    </>
  );
}
