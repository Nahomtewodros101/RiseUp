"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, LogIn } from "lucide-react";
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

// Add a new interface for the user
interface UserType {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Fetch current user data

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

  // Update the handleLogout function to ensure proper logout
  const handleLogout = async () => {
    try {
      // Make the logout request
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear user state immediately
      setUser(null);

      // Force a complete page reload to clear all state
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/team", label: "Team" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Talent" },
  ];

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
            <span className="font-bold text-sm">QD</span>
          </motion.div>
          <span className="font-bold text-xl">Qemem Devs</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={index}
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
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {!isLoading && (
            <>
              {user ? (
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
                      <DropdownMenuItem asChild>
                        <Link href="/console">Admin Console</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className=" hidden md:flex items-center gap-2">
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

          {user && user.role === "admin" ? (
            <Link href="/console">
              <Button variant="outline" className="w-full gap-2">
                Dashboard
              </Button>
            </Link>
          ) : null}

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
                  <Link
                    href="/console"
                    className="text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Admin Console
                  </Link>
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
                {user && user.role === "admin" ? (
                  <Link href="/console" className="text-sm font-medium">
                    Admin Console
                  </Link>
                ) : (
                  <Link href="/contact" className="text-sm font-medium">
                    Get Started
                  </Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
