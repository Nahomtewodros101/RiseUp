"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Palette,
  Layout,
  Users,
  Eye,
  Lightbulb,
  Figma,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function UiUxDesignPage() {
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
              <h1 className="text-3xl font-bold text-blue-600 tracking-tighter sm:text-5xl">
                UI/UX Design
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Creating intuitive and engaging user experiences
              </p>
            </motion.div>
          </div>

          {/* Hero Section */}
          <motion.div
            className="grid gap-12 md:grid-cols-2 items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h2 className="text-3xl text-blue-600 font-bold mb-6">
                Design That Delights and Delivers
              </h2>
              <div className="space-y-4 text-gray-500 dark:text-gray-400">
                <p>
                  At Qemem Devs, we believe that exceptional design is the
                  foundation of successful digital products. Our UI/UX design
                  services focus on creating intuitive, engaging, and visually
                  appealing experiences that delight users and drive business
                  results.
                </p>
                <p>
                  Our team of experienced designers combines creativity with a
                  deep understanding of user behavior to craft interfaces that
                  are not only beautiful but also functional and accessible.
                </p>
                <p>
                  Whether you&apos;re building a new product from scratch or
                  improving an existing one, our design process ensures that
                  every interaction is thoughtfully considered and optimized for
                  your users&apos; needs.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/contact">
                    Start Your Design Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/design.png"
                alt="UI/UX Design"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">
              Our Design Services
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">User Research</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Understanding your users through interviews, surveys, and
                    usability testing to inform design decisions.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Layout className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">UX Design</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Creating user flows, wireframes, and interactive prototypes
                    that map out the user journey and experience.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Palette className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">UI Design</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Crafting visually stunning interfaces with attention to
                    color, typography, and visual hierarchy.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Figma className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Design Systems</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Building comprehensive design systems with reusable
                    components for consistent user experiences.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Usability Testing</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Evaluating designs with real users to identify pain points
                    and opportunities for improvement.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Design Workshops</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Collaborative sessions to generate ideas, align
                    stakeholders, and solve complex design challenges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Process Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">
              Our Design Process
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Discover</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Research users, business goals, and market context to
                  establish a solid foundation for design.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Define</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create user personas, journey maps, and information
                  architecture to guide the design process.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Design</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Develop wireframes, prototypes, and visual designs through an
                  iterative process with regular feedback.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Deliver</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Finalize designs, create specifications for developers, and
                  support implementation to ensure quality.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tools Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">
              Design Tools We Use
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold">Figma</h3>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold">Adobe XD</h3>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold">Sketch</h3>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold">Protopie</h3>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold">Miro</h3>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold">Maze</h3>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="bg-blue-600 dark:bg-blue-800 text-white rounded-lg p-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Elevate Your User Experience?
            </h2>
            <p className="max-w-[700px] mx-auto mb-8 text-blue-100">
              Contact us today to discuss your UI/UX design needs and discover
              how we can help create exceptional experiences for your users.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              <Link href="/contact">
                Start Your Design Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
