"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Database,
  Shield,
  BarChart,
  Server,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function CloudSolutionsPage() {
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
                Cloud Solutions
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Scalable, secure, and efficient cloud infrastructure for your
                business
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
                Transform Your Business with Cloud Technology
              </h2>
              <div className="space-y-4 text-gray-500 dark:text-gray-400">
                <p>
                  In today'&apos; digital landscape, cloud technology is essential
                  for businesses looking to scale efficiently, reduce costs, and
                  stay competitive.
                </p>
                <p>
                  At Qemem Devs, we provide comprehensive cloud solutions that
                  help you leverage the full potential of cloud computing, from
                  infrastructure setup and migration to ongoing management and
                  optimization.
                </p>
                <p>
                  Our team of cloud experts works with leading platforms like
                  AWS, Google Cloud, and Azure to design and implement cloud
                  architectures that are tailored to your specific business
                  needs.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/contact">
                    Discuss Your Cloud Needs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/cloud.png"
                alt="Cloud Solutions"
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
              Our Cloud Services
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Cloud Migration</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Seamless migration of your existing infrastructure and
                    applications to the cloud with minimal disruption.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Server className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Cloud Infrastructure
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Design and implementation of scalable, secure, and
                    cost-effective cloud infrastructure tailored to your needs.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Database Solutions</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Cloud-based database setup, migration, and optimization for
                    improved performance and reliability.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Cloud Security</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Implementation of robust security measures to protect your
                    cloud infrastructure and data from threats.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Cloud Optimization</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Analysis and optimization of your cloud resources to improve
                    performance and reduce costs.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">DevOps & CI/CD</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Implementation of DevOps practices and CI/CD pipelines for
                    faster, more reliable software delivery.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Cloud Platforms Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">
              Cloud Platforms We Work With
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">Amazon Web Services (AWS)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  EC2, S3, Lambda, RDS, DynamoDB, CloudFront, and more
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">Google Cloud Platform (GCP)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Compute Engine, Cloud Storage, Cloud Functions, BigQuery, and
                  more
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">Microsoft Azure</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Virtual Machines, Blob Storage, Azure Functions, SQL Database,
                  and more
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">Vercel</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Frontend deployment, serverless functions, and edge computing
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">Netlify</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Static site hosting, serverless functions, and form handling
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="font-bold mb-2">Digital Ocean</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Droplets, Kubernetes, App Platform, and managed databases
                </p>
              </div>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">
              Benefits of Cloud Solutions
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-2">Scalability</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Easily scale your resources up or down based on demand,
                  ensuring optimal performance during peak times.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-2">Cost Efficiency</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Pay only for the resources you use, reducing capital
                  expenditure on hardware and maintenance.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-2">Reliability</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Benefit from high availability and disaster recovery
                  capabilities to minimize downtime.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-2">Security</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Leverage advanced security features and compliance
                  certifications offered by major cloud providers.
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
              Ready to Move to the Cloud?
            </h2>
            <p className="max-w-[700px] mx-auto mb-8 text-blue-100">
              Contact us today to discuss your cloud strategy and discover how
              our solutions can help your business thrive in the digital age.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              <Link href="/contact">
                Get Started with Cloud
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
