"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, WavesIcon as Wave, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";

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
    sessionStorage.setItem("welcomeBannerDismissed", "true");
  };

  const triggerConfetti = () => {
    if (hasInteracted) return;

    setHasInteracted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#1E3A8A", "#3B82F6", "#FFFFFF", "#BFDBFE"],
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDismissed =
        sessionStorage.getItem("welcomeBannerDismissed") === "true";
      if (isDismissed) {
        setIsVisible(false);
      }
    }
  }, []);

  if (isLoading || !user || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="relative mb-8 overflow-hidden mx-auto max-w-4xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl p-6 sm:p-8 text-white shadow-2xl backdrop-blur-md bg-white/10 relative overflow-hidden"
          transition={{ duration: 0.3 }}
          onClick={triggerConfetti}
        >
          {/* Subtle Pulse Animation */}
          <motion.div
            className=" inset-0 bg-blue-700/20 rounded-2xl"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          <Button
            variant="ghost"
            size="icon"
            className=" absolute top-4 right-4 text-white hover:bg-blue-500/30 rounded-full"
            onClick={handleDismiss}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Dismiss</span>
          </Button>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <motion.div
              animate={{ rotate: [0, 20, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, delay: 0.5, repeat: 2 }}
            >
              <Wave className="h-12 w-12 text-blue-200" />
            </motion.div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold flex items-center gap-3 justify-center sm:justify-start">
                Welcome back, {user.name}!
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6 text-yellow-300" />
                </motion.div>
              </h2>
              <p className="text-blue-100 text-base sm:text-lg mt-2 leading-relaxed">
                We are thrilled to see you again at Qemem Tech! Click this
                banner for a surprise or explore your dashboard.
              </p>
              <motion.div
                className="mt-4 flex justify-center sm:justify-start gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/console">
                  <Button variant="ghost" size="lg">
                    Go to Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="lg" onClick={handleDismiss}>
                  Maybe Later
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
