"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
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
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white p-2 w-16 h-16 mb-4"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
          >
            <span className="font-bold text-3xl">404</span>
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Oops&#33; The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
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
              fill="#EBF4FF"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Compass body */}
            <motion.circle
              cx="100"
              cy="100"
              r="60"
              fill="#BFDBFE"
              stroke="#3B82F6"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />

            {/* Compass center */}
            <motion.circle
              cx="100"
              cy="100"
              r="5"
              fill="#3B82F6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            />

            {/* Compass needle */}
            <motion.g
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ delay: 0.7, duration: 2, ease: "easeInOut" }}
              style={{ originX: "100px", originY: "100px" }}
            >
              <motion.path
                d="M100,100 L100,60"
                stroke="#EF4444"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <motion.path
                d="M100,100 L100,140"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </motion.g>

            {/* Compass cardinal points */}
            <text
              x="100"
              y="40"
              textAnchor="middle"
              fill="#3B82F6"
              fontSize="10"
              fontWeight="bold"
            >
              N
            </text>
            <text
              x="160"
              y="100"
              textAnchor="middle"
              fill="#3B82F6"
              fontSize="10"
              fontWeight="bold"
            >
              E
            </text>
            <text
              x="100"
              y="165"
              textAnchor="middle"
              fill="#3B82F6"
              fontSize="10"
              fontWeight="bold"
            >
              S
            </text>
            <text
              x="40"
              y="100"
              textAnchor="middle"
              fill="#3B82F6"
              fontSize="10"
              fontWeight="bold"
            >
              W
            </text>

            {/* Question marks */}
            {[...Array(4)].map((_, i) => (
              <motion.text
                key={i}
                x={100 + Math.cos((i * Math.PI) / 2 + Math.PI / 4) * 40}
                y={100 + Math.sin((i * Math.PI) / 2 + Math.PI / 4) * 40 + 5}
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="16"
                fontWeight="bold"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [
                    100 + Math.sin((i * Math.PI) / 2 + Math.PI / 4) * 40 + 5,
                    100 + Math.sin((i * Math.PI) / 2 + Math.PI / 4) * 40 - 5,
                    100 + Math.sin((i * Math.PI) / 2 + Math.PI / 4) * 40 + 5,
                  ],
                }}
                transition={{
                  delay: 1 + i * 0.2,
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
              >
                ?
              </motion.text>
            ))}
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
