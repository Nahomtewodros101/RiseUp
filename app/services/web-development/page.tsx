"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Code,
  Server,
  Database,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function WebDevelopmentPage() {
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
              <h1 className="text-3xl text-blue-600 font-bold tracking-tighter sm:text-5xl">
                Web Development
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Custom web solutions tailored to your business needs
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
                Modern Web Solutions for the Digital Age
              </h2>
              <div className="space-y-4 text-gray-500 dark:text-gray-400">
                <p>
                  At Qemem Devs, we specialize in creating custom web
                  applications and websites that help businesses thrive in the
                  digital landscape.
                </p>
                <p>
                  Our team of experienced developers combines technical
                  expertise with creative problem-solving to deliver web
                  solutions that are not only visually appealing but also
                  performant, secure, and scalable.
                </p>
                <p>
                  Whether you need a simple corporate website, a complex web
                  application, or an e-commerce platform, we have the skills and
                  experience to bring your vision to life.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/contact">
                    Discuss Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/webdev.png"
                alt="Web Development"
                className="object-cover"
                priority
                width={800}
                height={400}
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
              Our Web Development Services
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Responsive Websites
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Beautiful, mobile-friendly websites that adapt to any device
                    and screen size, ensuring a seamless user experience.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Web Applications</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Custom web applications with rich functionality, intuitive
                    interfaces, and seamless performance.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    E-commerce Solutions
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Robust online stores with secure payment processing,
                    inventory management, and customer relationship tools.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Server className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">API Development</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Secure and scalable APIs that enable seamless integration
                    between different systems and services.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Web Maintenance</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Ongoing support, updates, and optimization to keep your web
                    presence secure, fast, and up-to-date.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <ArrowRight className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Website Migration</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Seamless migration of existing websites to new platforms,
                    ensuring data integrity and minimal downtime.
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
                <h3 className="font-bold mb-2">Frontend</h3>
                <ul className="text-gray-500 dark:text-gray-400 space-y-2">
                  <li>React.js</li>
                  <li>Next.js</li>
                  <li>Vue.js</li>
                  <li>Angular</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">Backend</h3>
                <ul className="text-gray-500 dark:text-gray-400 space-y-2">
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>Django</li>
                  <li>Golang</li>
                  <li>PHP/Laravel</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">Databases</h3>
                <ul className="text-gray-500 dark:text-gray-400 space-y-2">
                  <li>MongoDB</li>
                  <li>PostgreSQL</li>
                  <li>MySQL</li>
                  <li>Firebase</li>
                  <li>Redis</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">DevOps</h3>
                <ul className="text-gray-500 dark:text-gray-400 space-y-2">
                  <li>Docker</li>
                  <li>Kubernetes</li>
                  <li>AWS</li>
                  <li>Google Cloud</li>
                  <li>Vercel</li>
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
              Our Development Process
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Discovery</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We start by understanding your business goals, target
                  audience, and project requirements.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Planning</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We create a detailed project plan, including architecture,
                  design concepts, and technical specifications.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Development</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our team builds your solution using agile methodologies, with
                  regular updates and feedback sessions.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Launch & Support</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We deploy your solution and provide ongoing maintenance and
                  support to ensure long-term success.
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
              Ready to Start Your Web Project?
            </h2>
            <p className="max-w-[700px] mx-auto mb-8 text-blue-100">
              Contact us today to discuss your web development needs and
              discover how we can help bring your vision to life.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              <Link href="/contact">
                Get in Touch
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
