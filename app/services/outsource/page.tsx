"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  PhoneCall,
  Server,
  Shield,
  Users,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function BusinessOutsourcingPage() {
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 2100);
    return () => clearTimeout(timer);
  }, []);

  if (!isContentReady) return null;

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
                Business Process Outsourcing
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Streamline your operations. Cut overhead. Scale smart.
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
                Focus on Your Core. We will Handle the Rest.
              </h2>
              <div className="space-y-4 text-gray-500 dark:text-gray-400">
                <p>
                  At Qemem Solutions, we specialize in outsourced business
                  services designed to unburden your in-house team and boost
                  performance. From customer support to data operations — we have
                  got you.
                </p>
                <p>
                  Outsourcing is not just cost-saving — it is  growth-accelerating.
                  Let your talent focus on what they do best, while we handle
                  the behind-the-scenes grind with precision and accountability.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/contact">
                    Talk to Our Team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/out.png"
                alt="Business Outsourcing"
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
              What We Offer
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <PhoneCall className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Customer Support</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    24/7 multi-language support agents who treat your customers
                    like royalty.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Server className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Back Office Ops</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    From data entry to billing, we optimize and scale your
                    internal processes.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Data & Reporting</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Real-time dashboards and actionable analytics handled by our
                    reporting specialists.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">HR & Payroll</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    End-to-end human resource support including hiring, payroll,
                    and compliance.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Risk Management</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Identify threats, safeguard data, and meet regulations with
                    our compliance experts.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Dedicated Teams</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Fully managed remote teams tailored to your workflow and
                    KPIs.
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
