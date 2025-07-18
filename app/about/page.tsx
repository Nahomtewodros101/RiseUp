"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  if (!isContentReady) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          {/* Header part */}
          <div className="mb-12">
            <Link href="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <motion.div
              className="space-y-2 text-blue-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-blue-600 tracking-tighter sm:text-5xl">
                About Qemem Cloud
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Learn about our mission, values, and the team behind our success
              </p>
            </motion.div>
          </div>

          {/* Company Story Section */}
          <motion.div
            className="grid gap-12 text-blue-600 md:grid-cols-2 items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-500 dark:text-gray-400">
                <p>
                  Founded in 2022, Qemem Cloud began as a small team of
                  passionate developers with a shared vision: to create digital
                  solutions that make a real difference for businesses and users
                  alike.
                </p>
                <p>
                  What started as a three-person operation in a small co-working
                  space has grown into a diverse team of developers, designers,
                  and digital strategists working with clients across multiple
                  industries.
                </p>
                <p>
                  Our name, Qemem, comes from the amharic word for
                  &quot;spice&quot; which reflects our commitment to adding
                  flavor and uniqueness to every project we undertake. We
                  believe that every line of code we write has the potential to
                  make a positive impact on the world, and we are dedicated to
                  creating solutions that not only meet but exceed our clients
                  expectations.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/team.png"
                alt="Qemem Cloud team"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Mission & Values Section */}
          <motion.div
            className="mb-20 text-blue-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">
              Our Mission & Values
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We embrace new Cloudnologies and approaches, constantly
                  pushing the boundaries of what is possible in digital
                  development.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We are committed to excellence in everything we do, from clean
                  code to intuitive user experiences and reliable performance.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We believe in working closely with our clients, understanding
                  their needs, and building solutions together.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex flex-col items-center max-w-2xl container justify-center">
              <div className="flex flex-row sm:flex-col gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 "
                >
                  <Link href="/contact">Reach out </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </main>
  );
}
