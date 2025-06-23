"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center">
            {/* Logo */}
            <motion.div
              className="flex items-center justify-center rounded-lg bg-transparent text-black  mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.2, 1] }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <span className="font-bold text-xl">
                <Image src="/cloudd.png" alt="Logo" className="rounded-full" width={100} height={100} />
              </span>
            </motion.div>

            {/* Loading text */}
            <motion.h2
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Qmem Cloud
            </motion.h2>

            {/* Loading bar */}
            <div className="w-48 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600 dark:bg-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Loading dots */}
            <div className="flex mt-4 space-x-2">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: dot * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
