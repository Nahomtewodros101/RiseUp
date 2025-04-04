"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, WavesIcon as Wave, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export default function WelcomeBanner() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

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

  const handleDismiss = () => {
    setIsVisible(false);
    // Store in session storage so it doesn't show again during this session
    sessionStorage.setItem("welcomeBannerDismissed", "true");
  };

  const triggerConfetti = () => {
    if (hasInteracted) return;

    setHasInteracted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Check if banner was already dismissed in this session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDismissed =
        sessionStorage.getItem("welcomeBannerDismissed") === "true";
      if (isDismissed) {
        setIsVisible(false);
      }
    }
  }, []);

  // Don't render anything if loading, no user, or banner dismissed
  if (isLoading || !user || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="relative mb-8 overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-6 pr-12 text-white shadow-lg"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          onClick={triggerConfetti}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white hover:bg-blue-500/20"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>

          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 20, 0, 20, 0] }}
              transition={{ duration: 1.5, delay: 0.5, repeat: 0 }}
            >
              <Wave className="h-8 w-8 text-white" />
            </motion.div>

            <div className="flex justify-center items-center flex-col">
              <h2 className="text-xl font-bold flex items-center gap-2">
                Welcome back, {user.name}!
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                </motion.div>
              </h2>
              <p className="text-blue-100">
                We are excited to see you again. Click anywhere on this banner
                for a surprise!
              </p>
            </div>
          </div>

          {user.role === "admin" && (
            <div className="mt-3 bg-blue-700/30 p-2 rounded text-sm">
              <span className="font-semibold">Admin access:</span> You have
              access to the{" "}
              <a href="/console" className="underline hover:text-blue-200">
                admin console
              </a>
              .
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
