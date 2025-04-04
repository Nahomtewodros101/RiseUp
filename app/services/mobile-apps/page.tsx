"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Tablet,
  Layers,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function MobileAppsPage() {
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
                Mobile App Development
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Innovative mobile solutions for iOS and Android platforms
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
              <h2 className="text-3xl font-bold mb-6">
                Transform Your Business with Custom Mobile Apps
              </h2>
              <div className="space-y-4 text-gray-500 dark:text-gray-400">
                <p>
                  In today's mobile-first world, having a powerful and intuitive
                  mobile app is essential for businesses looking to engage with
                  their customers and stay competitive.
                </p>
                <p>
                  At Qemem Devs, we specialize in creating custom mobile
                  applications that deliver exceptional user experiences across
                  iOS and Android platforms.
                </p>
                <p>
                  Our team of experienced mobile developers combines technical
                  expertise with creative problem-solving to build apps that are
                  not only visually appealing but also performant, secure, and
                  scalable.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/contact">
                    Discuss Your App Idea
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/mobile.png"
                alt="Mobile App Development"
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
              Our Mobile App Services
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Native iOS Apps</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Custom iOS applications built with Swift and SwiftUI,
                    optimized for performance and user experience on iPhone and
                    iPad.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Native Android Apps
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Robust Android applications developed with Kotlin and
                    Jetpack Compose, designed for the diverse Android ecosystem.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Cross-Platform Apps
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Efficient multi-platform applications using React Native or
                    Flutter, delivering native-like experiences with faster
                    development cycles.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Tablet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Progressive Web Apps
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Web applications with mobile app capabilities, offering
                    offline functionality and app-like experiences without
                    installation.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">App Optimization</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Performance enhancement, UI/UX improvements, and feature
                    additions for existing mobile applications.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">App Maintenance</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Ongoing support, updates, and optimization to keep your
                    mobile apps secure, performant, and compatible with the
                    latest OS versions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Technologies Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">
              Technologies We Use
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">iOS</h3>
                <ul className="text-gray-500 dark:text-gray-400 space-y-2">
                  <li>Swift</li>
                  <li>SwiftUI</li>
                  <li>UIKit</li>
                  <li>Core Data</li>
                  <li>ARKit</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">Android</h3>
                <ul className="text-gray-500 dark:text-gray-400 space-y-2">
                  <li>Kotlin</li>
                  <li>Jetpack Compose</li>
                  <li>Android SDK</li>
                  <li>Room</li>
                  <li>Jetpack</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">Cross-Platform</h3>
                <ul className="text-gray-500 dark:text-gray-400 space-y-2">
                  <li>React Native</li>
                  <li>Flutter</li>
                  <li>Expo</li>
                  <li>Ionic</li>
                  <li>Capacitor</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">Backend</h3>
                <ul className="text-gray-500 dark:text-gray-400 space-y-2">
                  <li>Firebase</li>
                  <li>Node.js</li>
                  <li>MongoDB</li>
                  <li>GraphQL</li>
                  <li>REST APIs</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Process Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">
              Our App Development Process
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Discovery</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Understanding your business goals, target audience, and app
                  requirements.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Design</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Creating wireframes, prototypes, and visual designs for your
                  app.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Development</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Building your app using agile methodologies with regular
                  updates and feedback.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Testing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Rigorous quality assurance across devices and platforms to
                  ensure a flawless experience.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">5</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Launch & Support</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  App store submission, deployment, and ongoing maintenance and
                  updates.
                </p>
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
              Ready to Build Your Mobile App?
            </h2>
            <p className="max-w-[700px] mx-auto mb-8 text-blue-100">
              Contact us today to discuss your mobile app idea and discover how
              we can help bring it to life.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              <Link href="/contact">
                Start Your App Project
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
