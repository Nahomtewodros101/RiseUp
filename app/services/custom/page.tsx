"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function CustomSoftwarePage() {
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    // Set content as ready after the loading screen has had time to show
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 2100); // Slightly longer than the loading screen duration

    return () => clearTimeout(timer);
  }, []);

  if (!isContentReady) {
    return null; // Return nothing while loading screen is showing
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-12">
            <Link href="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Custom Software Development
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                We design, build and deploy custom software solutions that meets
                your business needs.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardContent>
                  <h2 className="mb-4 text-2xl font-bold tracking-tighter">
                    Custom Software Solutions
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    We design, build and deploy custom software solutions that
                    meets your business needs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h2 className="mb-4 text-2xl font-bold tracking-tighter">
                    Technology Stack
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    We use a wide range of technologies including Node.js, Java,
                    Python, React, Angular, Vue.js, MySQL, PostgreSQL, MongoDB,
                    and many more.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardContent>
                  <h2 className="mb-4 text-2xl font-bold tracking-tighter">
                    Agile Methodology
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    We use agile methodology to ensure that the project is
                    completed on time and within budget.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h2 className="mb-4 text-2xl font-bold tracking-tighter">
                    Benefits
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our custom software solutions can help you increase
                    efficiency, reduce costs, and improve customer satisfaction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
