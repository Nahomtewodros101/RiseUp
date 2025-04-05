"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice in localStorage
    const consentChoice = localStorage.getItem("cookie-consent");

    // Check if the user is logged in, if so, reset the consent (optional based on your needs)
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // You can adjust this check based on your auth logic

    // If no choice has been made OR user just logged in, show the consent banner
    if (!consentChoice || isLoggedIn) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative rounded-lg bg-white dark:bg-gray-800 shadow-lg border p-4 md:p-6">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                onClick={declineCookies}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <Cookie className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-1">We use cookies</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    We use cookies and similar technologies to provide the best
                    experience on our website. By continuing to use this site,
                    you consent to our use of cookies as described in our{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0 w-full md:w-auto">
                  <Button
                    variant="outline"
                    onClick={declineCookies}
                    className="w-full sm:w-auto"
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={acceptCookies}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                  >
                    Accept All Cookies
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
