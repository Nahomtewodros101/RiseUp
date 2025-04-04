"use client";

import { motion } from "framer-motion";

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[500px] h-[400px]">
      {/* Main circle */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-100 dark:bg-blue-900/30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Floating elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 rounded-lg bg-blue-500 dark:bg-blue-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        whileHover={{ rotate: 5, scale: 1.05 }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-purple-500 dark:bg-purple-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        whileHover={{ scale: 1.1 }}
      />

      <motion.div
        className="absolute top-1/2 right-20 w-12 h-12 rounded-lg bg-green-500 dark:bg-green-600 rotate-45"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        whileHover={{ rotate: 90 }}
      />

      <motion.div
        className="absolute bottom-10 left-20 w-14 h-14 rounded-lg bg-yellow-500 dark:bg-yellow-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        whileHover={{ rotate: -10 }}
      />

      {/* Code brackets */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-blue-600 dark:text-blue-400"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
      >
        {"</>"}
      </motion.div>

      {/* Orbiting dot */}
      <motion.div
        className="absolute top-0 left-1/2 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400"
        animate={{
          rotate: 360,
        }}
        style={{
          originX: "0",
          originY: "8rem",
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  );
}
