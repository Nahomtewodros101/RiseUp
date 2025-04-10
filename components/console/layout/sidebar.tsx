"use client";

import type React from "react";

import { useState } from "react";
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
  FileText,
  Briefcase,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isMobile: boolean;
  toggleMobileSidebar: () => void;
}

export default function Sidebar({
  isMobile,
  toggleMobileSidebar,
}: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    window.location.href = "/login";
  };

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
      title: "Team",
      href: "/console/team",
      icon: Users,
    },
    {
      title: "Blog",
      href: "/console/blog",
      icon: FileText,
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
  ];

  const SidebarGroup = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );

  const SidebarGroupLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
      {children}
    </div>
  );

  const SidebarGroupContent = ({ children }: { children: React.ReactNode }) => (
    <div className="space-y-1">{children}</div>
  );

  const SidebarMenu = ({ children }: { children: React.ReactNode }) => (
    <nav className="flex-1 p-2 space-y-1">{children}</nav>
  );

  const SidebarMenuItem = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );

  const SidebarMenuButton = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden"
          onClick={toggleMobileSidebar}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-white dark:bg-gray-950 border-r shadow-sm transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[250px]",
          isMobile && "transform transition-transform duration-300 ease-in-out",
          isMobile && (isCollapsed ? "-translate-x-full" : "translate-x-0")
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div
            className={cn(
              "flex items-center gap-2",
              isCollapsed && "justify-center w-full"
            )}
          >
            <div className="flex items-center justify-center rounded-lg bg-blue-600 text-white p-1 w-8 h-8">
              <span className="font-bold text-sm">QD</span>
            </div>
            {!isCollapsed && <span className="font-bold text-xl">Admin</span>}
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
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.title}</span>}
                  {isActive && !isCollapsed && (
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

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link
                    href="/console/admin/users"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Shield className="h-4 w-4" />
                    {!isCollapsed && <span>User Management</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="p-2 border-t">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
              isCollapsed && "justify-center"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>
    </>
  );
}
