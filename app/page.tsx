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
import CountUp from "react-countup";

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
        {/* Welcome Banner */}
        <div className="container px-4 md:px-6 pt-8">
          <WelcomeBanner />
        </div>

        {/* Enhanced Hero Section with Parallax */}
        <section className="relative overflow-hidden py-20 md:py-32 bg-transparent">
          <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] bg-cover bg-center animate-parallax opacity-20" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-28 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-2">
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    Transforming Ideas into{" "}
                    <span className="text-blue-500 dark:text-blue-300">
                      Digital Reality
                    </span>
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Qemem Devs crafts innovative web, mobile, and software
                    solutions tailored to your vision.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/projects">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-blue-500 text-blue-500 hover:bg-blue-100"
                    >
                      View Our Work
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
              >
                <HeroIllustration />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 bg-transparent dark:bg-blue-900/20">
          <div className="flex-col justify-center items-center w-full px-4 md:px-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-700 dark:text-blue-300">
                Featured Projects
              </h2>
              <p className="max-w-[600px] mx-auto mt-4 text-gray-600 dark:text-gray-300">
                Check out some of our latest and greatest work.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center mt-10 text-lg font-semibold text-blue-600 dark:text-blue-400">
                Loading projects...
              </div>
            ) : error ? (
              <div className="flex justify-center mt-10 text-red-500 font-semibold">
                <p>Sorry! No projects to show currently.</p>
              </div>
            ) : (
              <div className="w-full flex justify-center items-center px-4 md:px-6">
                <div className="mt-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {featuredProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <ProjectCard {...project} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="bg-transparent dark:bg-blue-900/20 py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-200 dark:bg-blue-800 px-3 py-1 text-sm text-blue-700 dark:text-blue-300">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-800 dark:text-blue-300">
                  What We Do Best
                </h2>
                <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Cutting-edge solutions tailored to your business needs.
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
                  className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md bg-white/80 dark:bg-blue-800/20 backdrop-blur-sm border-blue-200 dark:border-blue-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link href={service.link}>
                    <div className="rounded-full bg-blue-200 dark:bg-blue-800 p-3">
                      <service.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">
                      {service.title}
                    </h3>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                      {service.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Why Choose Us Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900">
          <BackgroundGrid />
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
              <p className="max-w-[600px] mx-auto mt-6 text-blue-100 text-lg">
                We are more than just a service; we are a movement, shaping the
                future together.
              </p>
            </motion.div>
            <div className="grid gap-8 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {["Expertise", "Innovation", "Reliability", "Support"].map(
                (item, index) => (
                  <motion.div
                    key={index}
                    className="relative group bg-blue-600/80 dark:bg-blue-700/80 p-8 rounded-xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-all duration-1000 ease-in-out pointer-events-none"></div>
                    <h3 className="text-2xl font-semibold text-white z-10 relative">
                      {item}
                    </h3>
                    <p className="text-lg text-blue-100 mt-4 z-10 relative">
                      {item === "Expertise"
                        ? "Masters of our craft with years of experience."
                        : item === "Innovation"
                        ? "Creating trends, not following them."
                        : item === "Reliability"
                        ? "Dependable and consistent, always there for you."
                        : "Guiding you every step to ensure success."}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Stats Counter Section */}
        <section className="py-20 bg-transparent dark:bg-blue-800/50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800 dark:text-blue-300">
                Our Impact in Numbers
              </h2>
              <p className="max-w-[600px] mx-auto mt-4 text-gray-600 dark:text-blue-200">
                We’re proud of the milestones we’ve achieved with our clients.
              </p>
            </motion.div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              {[
                { label: "Projects Completed", value: 30, suffix: "+" },
                { label: "Happy Clients", value: 20, suffix: "+" },
                { label: "Years of Experience", value: 6, suffix: "+" },
                { label: "Team Members", value: 6, suffix: "+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.2,
                    duration: 0.6,
                    type: "spring",
                  }}
                  viewport={{ once: true }}
                >
                  <p className="text-4xl font-bold text-blue-800 dark:text-blue-300">
                    <CountUp start={0} end={stat.value} duration={2.5} />
                    {stat.suffix}
                  </p>
                  <p className="mt-2 text-gray-600 dark:text-blue-200">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}

        {/* Testimonials Section */}
        <section className="py-20 bg-transparent dark:bg-blue-900/30">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700 dark:text-blue-300">
                What Our Clients Say
              </h2>
              <p className="max-w-[600px] mx-auto mt-4 text-gray-600 dark:text-gray-300">
                Hear from those who’ve experienced our passion and expertise.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                {
                  quote:
                    "Qemem Devs turned our vision into a stunning reality!",
                  author: "Jane Doe, CEO",
                  company: "TechTrend Innovations",
                  image: "/person-1.jpg",
                },
                {
                  quote: "Their dedication and creativity are unmatched.",
                  author: "John Smith, Founder",
                  company: "GrowEasy Solutions",
                  image: "/person-2.jpg",
                },
                {
                  quote: "A seamless experience from start to finish.",
                  author: "Emily Chen, CTO",
                  company: "NextGen Apps",
                  image: "/person-3.jpg",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-blue-800/50 p-10 rounded-xl shadow-xl border border-blue-200 dark:border-blue-700 flex flex-col items-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-blue-300 dark:border-blue-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                  <p className="text-lg text-gray-600 dark:text-gray-200 italic text-center">
                    “{testimonial.quote}”
                  </p>
                  <p className="mt-6 font-semibold text-xl text-blue-600 dark:text-blue-400">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-base">
                    {testimonial.company}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        {/* Blog Teaser Section */}
        <section className="py-20 bg-transparent dark:bg-blue-900/30">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700 dark:text-blue-300">
                Latest Insights
              </h2>
              <p className="max-w-[600px] mx-auto mt-4 text-gray-600 dark:text-gray-300">
                Stay updated with our tips, trends, and tech insights.
              </p>
            </motion.div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Top Web Design Trends for 2025",
                  excerpt:
                    "Discover the styles shaping the future of digital experiences.",
                  link: "/blog",
                  image: "/website.jpg",
                },
                {
                  title: "Scaling Apps with Cloud Solutions",
                  excerpt: "Learn how to optimize performance with cloud tech.",
                  link: "/blog",
                  image: "/cloud.png",
                },
                {
                  title: "Why UX Matters for Business",
                  excerpt: "Explore the impact of user experience on growth.",
                  link: "/blog",
                  image: "/design.png",
                },
              ].map((post, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-blue-800/50 rounded-xl shadow-xl overflow-hidden border border-blue-200 dark:border-blue-700"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link href={post.link}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-block text-blue-500 dark:text-blue-300 hover:underline font-medium">
                        Read More
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section with Newsletter */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 py-20 text-white">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Let’s Build Something Amazing
                </h2>
                <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ready to transform your ideas? Contact us or join our
                  newsletter for the latest tech insights.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row items-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.reload();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-blue-800/50 border border-blue-300 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-blue-400 hover:bg-blue-500"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
