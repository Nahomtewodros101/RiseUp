"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, RefreshCw, MailIcon } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <motion.div
            className="inline-flex items-center justify-center rounded-lg bg-red-600 text-white p-2 w-16 h-16 mb-4"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
          >
            <span className="font-bold text-3xl">500</span>
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Something Went Wrong</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            We are sorry, but we encountered an unexpected error. Our team has
            been notified and is working to fix the issue.
          </p>
        </div>

        {/* Interactive SVG */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Background circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="80"
              fill="#FEE2E2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Gear 1 */}
            <motion.path
              d="M100,60 L105,60 L107,50 L93,50 L95,60 Z M100,140 L105,140 L107,150 L93,150 L95,140 Z M60,100 L60,105 L50,107 L50,93 L60,95 Z M140,100 L140,105 L150,107 L150,93 L140,95 Z M75,75 L78,80 L70,87 L63,80 L70,75 Z M125,125 L128,130 L120,137 L113,130 L120,125 Z M75,125 L78,120 L70,113 L63,120 L70,125 Z M125,75 L128,70 L120,63 L113,70 L120,75 Z"
              fill="#EF4444"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />

            <motion.circle
              cx="100"
              cy="100"
              r="30"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />

            {/* Rotating gear */}
            <motion.g
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ originX: "100px", originY: "100px" }}
            >
              <motion.circle
                cx="100"
                cy="100"
                r="20"
                fill="#EF4444"
                stroke="#FEE2E2"
                strokeWidth="2"
              />

              {/* Gear teeth */}
              {[...Array(8)].map((_, i) => (
                <motion.rect
                  key={i}
                  x="98"
                  y="70"
                  width="4"
                  height="10"
                  fill="#EF4444"
                  style={{
                    transformOrigin: "100px 100px",
                    transform: `rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </motion.g>

            {/* Warning symbols */}
            {[...Array(3)].map((_, i) => (
              <motion.text
                key={i}
                x={70 + i * 30}
                y="40"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="16"
                fontWeight="bold"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [30, 20, 30],
                }}
                transition={{
                  delay: 1 + i * 0.3,
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
              >
                !
              </motion.text>
            ))}
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => reset()}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="ghost" className="w-full sm:w-auto">
              <Link href="/contact">
                <MailIcon className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
