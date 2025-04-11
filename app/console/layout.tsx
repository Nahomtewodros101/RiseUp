"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/console/layout/sidebar";
import Header from "@/components/console/layout/header";
import { useMobile } from "@/hooks/UseMobile";

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useMobile();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar isMobile={isMobile} toggleMobileSidebar={toggleMobileSidebar} />

      <div className="flex-1 flex flex-col ml-0 lg:ml-[250px]">
        <Header />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobile && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleMobileSidebar}
        />
      )}
    </div>
  );
}
