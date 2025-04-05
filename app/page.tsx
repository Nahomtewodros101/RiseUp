"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  Cpu,
  Database,
  Globe,
  Layers,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroIllustration from "@/components/HeroIlutrator";
import ProjectCard from "@/components/ProjectCard";
import WelcomeBanner from "@/components/WelcomeBanner";
import { motion } from "framer-motion";
import { Project } from "@/types";
import BackgroundGrid from "@/components/BacgroundGrid";
export default function Home() {
  const [isContentReady, setIsContentReady] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchFeaturedProjects() {
      try {
        const response = await fetch("/api/projects?featured=true");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setFeaturedProjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProjects();
  }, []);

  if (!isContentReady) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 pt-8">
          <WelcomeBanner />
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                  >
                    Transforming Ideas into{" "}
                    <span className="text-blue-500 dark:text-blue-400">
                      Digital Reality
                    </span>
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                  >
                    Qemem Devs is a cutting-edge tech startup specializing in
                    web development, mobile applications, and custom software
                    solutions.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                >
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/projects">
                    <Button variant="outline" size="lg">
                      View Our Work
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <HeroIllustration />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Featured Projects
              </h2>
              <p className="max-w-[600px] mx-auto mt-4 text-gray-500 dark:text-gray-400">
                Check out some of our latest and greatest work.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center mt-10 text-lg font-semibold">
                Loading projects...
              </div>
            ) : error ? (
              <div className="flex justify-center mt-10 text-red-500 font-semibold">
                {error}
              </div>
            ) : (
              <div className="grid gap-6 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:space-x-52">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:bg-gradient-to-r dark:from-blue-800 dark:via-blue-900 dark:to-blue-900">
          {/* Background Grid */}
          <BackgroundGrid />

          {/* Content */}
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white tracking-tight sm:text-5xl">
                Why Choose Us?
              </h2>
              <p className="max-w-[600px] mx-auto mt-6 text-gray-200 text-lg">
                We are more than just a service; we are a movement, shaping the
                future together. Here’s why you should ride the wave with us.
              </p>
            </motion.div>

            {/* Card Section */}
            <div className="grid gap-8 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {["Expertise", "Innovation", "Reliability", "Support"].map(
                (item, index) => (
                  <motion.div
                    key={index}
                    className="bg-blue-600 p-8 rounded-xl shadow-2xl transition-all duration-700 ease-in-out hover:bg-gradient-to-l hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:scale-105"
                    whileHover={{ rotate: 360 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    }}
                  >
                    <h3 className="text-2xl font-semibold text-white">
                      {item}
                    </h3>
                    <p className="text-lg text-gray-100 mt-4">
                      {item === "Expertise"
                        ? "With years of hands-on experience, we’re not just knowledgeable, we’re masters of our craft, ready to turn your ideas into reality."
                        : item === "Innovation"
                        ? "We don’t just follow trends; we create them. Pushing boundaries and breaking barriers, we bring forward-thinking solutions to the table."
                        : item === "Reliability"
                        ? "In a world full of uncertainties, our track record speaks for itself. Dependable, consistent, and unwavering, we’re always here when you need us."
                        : "Our support goes beyond answering questions; we walk with you, guiding you every step of the way to ensure you thrive."}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-sm py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900 px-3 py-1 text-sm text-blue-600 dark:text-blue-400">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What We Do Best
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We deliver cutting-edge solutions tailored to your business
                  needs
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  icon: Globe,
                  title: "Web Development",
                  description:
                    "Modern, responsive websites and web applications",
                  link: "/services/web-development",
                },
                {
                  icon: Cpu,
                  title: "Mobile Apps",
                  description: "Native and cross-platform mobile applications",
                  link: "/services/mobile-apps",
                },
                {
                  icon: Database,
                  title: "Cloud Solutions",
                  description: "Scalable cloud infrastructure and services",
                  link: "/services/cloud-solutions",
                },
                {
                  icon: Layers,
                  title: "UI/UX Design",
                  description: "Intuitive and engaging user experiences",
                  link: "/services/ui-ux-design",
                },
                {
                  icon: Code,
                  title: "Custom Software",
                  description: "Tailored software solutions for your business",
                  link: "/services/custom",
                },
                {
                  icon: Zap,
                  title: "DevOps",
                  description:
                    "Streamlined development and deployment processes",
                  link: "/services/devops",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link href={service.link}>
                    {" "}
                    {/* Wrap each card in a Link */}
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
                      <service.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      {service.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600/90 dark:bg-blue-900/90 backdrop-blur-sm py-20 text-white">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Your Project?
                </h2>
                <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Let us discuss how we can help bring your ideas to life
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
