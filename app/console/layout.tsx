"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Sidebar from "@/components/console/layout/sidebar";

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        isMobile={isMobile}
        toggleMobileSidebar={toggleMobileSidebar}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      <main
        className={`transition-all duration-300 ${
          isMobile ? "pl-0" : "pl-[250px]"
        }`}
      >
        <div className="container mx-auto p-4 pt-16 lg:pt-6">{children}</div>
      </main>
    </div>
  );
}
