"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundGrid() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed  inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={isDark ? "#3b82f6" : "#1d4ed8"}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Glowing lines */}
      <div className="absolute inset-0">
        {/* Horizontal lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`h-line-${i}`}
            className="absolute h-[1px] w-full left-0 bg-blue-500 dark:bg-blue-500"
            style={{
              top: `${15 + i * 20}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleY: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Vertical lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`v-line-${i}`}
            className="absolute w-[1px] h-full top-0 bg-blue-500 dark:bg-blue-800"
            style={{
              left: `${20 + i * 15}%`,
            }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scaleX: [1, 1.5, 1],
            }}
            transition={{
              duration: 7 + i,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glowing dots at intersections */}
      <div className="absolute inset-0">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute rounded-full bg-blue-500 blur-[2px]"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Large gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute rounded-full w-[500px] h-[500px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-[80px]"
          style={{
            top: "-10%",
            right: "-10%",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full w-[400px] h-[400px] bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-[80px]"
          style={{
            bottom: "-5%",
            left: "-5%",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
