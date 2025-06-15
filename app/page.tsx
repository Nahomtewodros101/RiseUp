"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Cable,
  Code,
  Database,
  Globe,
  Layers,
  Phone,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroIllustration from "@/components/HeroIlutrator";
import ProjectCard from "@/components/ProjectCard";
import WelcomeBanner from "@/components/WelcomeBanner";
import { motion } from "framer-motion";
import { Project } from "@/types";
import CountUp from "react-countup";
import { Card, CardContent } from "../components/ui/card";
import Image from "next/image";
import WhyChooseUsSection from "../components/WhyChooseUS";
import LifecycleSection from "../components/LifecycleSection";

export default function Home() {
  const [isContentReady, setIsContentReady] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const Maintenance = () => (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a1a3a 0%, #1e3a8a 100%)",
        color: "#ffffff",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        transition: "background 1s ease-in-out",
      }}
    >
      <div
        style={{
          opacity: 0,
          animation: "fadeIn 1.5s ease-out forwards",
        }}
      >
        {/* SVG Illustration */}
        <svg
          width="400"
          height="300"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            margin: "0 auto",
            display: "block",
            transition: "transform 0.5s ease",
          }}
        >
          {/* Background Glow */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Animated Orbiting Circles */}
          <circle
            cx="200"
            cy="150"
            r="80"
            stroke="#3b82f6"
            strokeWidth="4"
            fill="none"
            filter="url(#glow)"
            style={{ transition: "stroke 0.3s ease" }}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 150"
              to="360 200 150"
              dur="12s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1"
            />
          </circle>
          <circle
            cx="200"
            cy="150"
            r="60"
            stroke="#60a5fa"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            style={{ transition: "stroke 0.3s ease" }}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 200 150"
              to="0 200 150"
              dur="10s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1"
            />
          </circle>

          {/* Central Node with Pulse */}
          <circle
            cx="200"
            cy="150"
            r="20"
            fill="#93c5fd"
            filter="url(#glow)"
            style={{ transition: "fill 0.3s ease" }}
          >
            <animate
              attributeName="r"
              values="20;24;20"
              dur="2s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1"
            />
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="2s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1"
            />
          </circle>

          {/* Floating Particles with Bounce */}
          <circle cx="150" cy="100" r="5" fill="#3b82f6">
            <animate
              attributeName="cy"
              values="100;85;100"
              dur="3s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1"
            />
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="3s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1"
            />
          </circle>
          <circle cx="250" cy="200" r="5" fill="#60a5fa">
            <animate
              attributeName="cy"
              values="200;185;200"
              dur="4s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1"
            />
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="4s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1"
            />
          </circle>
        </svg>

        {/* Text Content */}
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "800",
            background: "linear-gradient(90deg, #3b82f6, #93c5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginTop: "1.5rem",
            letterSpacing: "0.15em",
            transition: "all 0.5s ease",
          }}
        >
          QMEM
        </h1>
      </div>

      {/* CSS for Animations and Transitions */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
        }
        h1 {
          animation: pulse 5s infinite ease-in-out;
        }
        svg:hover {
          transform: scale(1.05);
        }
        p:hover {
          color: #ffffff;
        }
      `}</style>
    </div>
  );

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
  const isMaintenance = false;
  if (isMaintenance) return <Maintenance />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Welcome Banner */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
          <WelcomeBanner />
        </div>

        {/* Enhanced Hero Section with Parallax */}
        <section className="relative overflow-hidden py-20 md:py-32 bg-transparent">
          <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] bg-cover bg-center animate-parallax opacity-20" />
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
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
                    <span className="text-blue-500 dark:text-blue-600">
                      Digital Reality
                    </span>
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-gray-600 dark:text-gray-600 md:text-xl"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Qmem Cloud is a leading software development & business and
                    product outsourcing <span>Agency</span>, dedicated to
                    delivering innovative solutions that drive success. Our team
                    of expert developers and designers work tirelessly to create
                    custom software solutions that meet the unique needs of our
                    clients.
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
        <section className="py-20 px-20 bg-transparent dark:bg-transparent">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-700 dark:text-blue-600">
                Featured Projects
              </h2>
              <p className="max-w-[600px] mx-auto mt-4 text-xl text-gray-600 dark:text-gray-300">
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
              <div className="mt-12 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
                  {featuredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      className="w-full  max-w-[300px] mx-auto"
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
            )}
          </div>
          <Link className="flex justify-center" href="/projects">
            <Button
              variant="outline"
              size="lg"
              className="border-blue-500 text-blue-500 hover:bg-blue-100 mt-10"
            >
              View More Qmem Projects
            </Button>
          </Link>
        </section>

        {/* Services Section */}
        <section className="bg-transparent dark:transparent py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-200 dark:bg-blue-800 px-3 py-1 text-sm text-blue-700 dark:text-blue-600">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-800 dark:text-blue-600">
                  What We Do Best
                </h2>
                <p className="max-w-[900px] text-gray-600 dark:text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
                  icon: Phone,
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
                  icon: Cable,
                  title: " Buisness Outsourcing",
                  description:
                    "Efficient outsourcing services for your business",
                  link: "/services/outsource",
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
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">
          <WhyChooseUsSection />
        </section>

        {/* Stats Counter Section */}
        <section className="py-20 bg-transparent dark:bg-transparent">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-600 dark:text-blue-600">
                Our Impact in Numbers
              </h2>
              <p className="max-w-[600px] mx-auto mt-4 text-xl text-gray-600 d dark:text-blue-600">
                We are proud of the milestones we have achieved with our
                clients.
              </p>
            </motion.div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              {[
                { label: "Projects Completed", value: 95, suffix: "+" },
                { label: "Happy Clients", value: 400, suffix: "+" },
                { label: "Years of Experience", value: 10, suffix: "+" },
                { label: "Market Place Revenue", value: 50000, suffix: "$" },
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
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-600">
                    <CountUp start={0} end={stat.value} duration={2.5} />
                    {stat.suffix}
                  </p>
                  <p className="mt-2 text-gray-600 dark:text-blue-600">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-transparent dark:bg-transparent 0"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">
                  Testimonials
                </div>
                <h2 className="text-3xl text-blue-600 font-bold tracking-tighter md:text-4xl">
                  What Our Clients Say
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl">
                  Don not just take our word for it. Here is what our clients
                  have to say about working with us.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO, Lead Gen Ethiopia",
                  quote:
                    "Working with Qmem Tech transformed our business. Their team delivered a solution that exceeded our expectations and helped us scale rapidly.",
                  image: "/person-1.jpg",
                },
                {
                  name: "Michael Chen",
                  role: "CTO, Moon Studios",
                  quote:
                    "The team at Qmem Tech is exceptional. They understood our complex requirements and delivered a robust platform that our users love.",
                  image: "/person-2.jpg",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Founder, One Planet",
                  quote:
                    "Qmem Tech data analytics solution gave us insights we never had before. It's been a game-changer for our decision-making process.",
                  image: "/person-3.jpg",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-sky-100">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sky-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-500 italic">{testimonial.quote}</p>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-sky-100 w-12 h-12 flex items-center justify-center">
                        <Image
                          src={testimonial.image}
                          alt={`${testimonial.name}'s picture`}
                          className="rounded-full w-12 h-12 object-cover"
                          width={48}
                          height={48}
                        />
                      </div>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Partners Section */}
        <section
          id="partners"
          className="w-full py-12 md:py-24 lg:py-32 bg-transparent dark:bg-transparent "
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">
                  Our Partners
                </div>
                <h2 className="text-3xl text-blue-600 font-bold tracking-tighter md:text-4xl">
                  Trusted by Industry Leaders
                </h2>
                <p className="max-w-[900px] text-gray-600 dark:text-gray-600 md:text-xl">
                  We collaborate with top organizations to deliver cutting-edge
                  solutions.
                </p>
              </div>
            </div>
            <div className="relative mt-12 overflow-hidden">
              {/* Gradient overlays for fade effect */}
              <div className="absolute inset-y-0 right-0 w-16 bg-transparent z-10"></div>
              {/* Infinite scrolling container */}
              <div className="flex animate-scroll">
                <div className="flex shrink-0">
                  {[
                    { logo: "/cbe.png", name: "Commercial bank" },
                    { logo: "/luxx.png", name: "LuxxOds" },
                    { logo: "/lead.webp", name: "Lead Gen Ethiopia" },
                    { logo: "/planet.png", name: "One Planet" },
                    { logo: "/real.png", name: "Nolan Realestate" },
                    { logo: "/upwrk.png", name: "Upwork Business Clients" },
                    { logo: "/fvr.png", name: "Fiver Business Clients" },
                  ].map((partner, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center w-40 mx-6 opacity-80 hover:opacity-100 transition-opacity duration-300"
                    >
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-h-16 rounded-full w-auto object-contain"
                        width={160}
                        height={80}
                      />
                      <p className="mt-2 text-sm font-medium dark:text-white text-blue-600">
                        {partner.name}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Duplicate logos and names for seamless infinite scroll */}
                <div className="flex shrink-0">
                  {[
                    { logo: "/cbe.png", name: "Commercial bank" },
                    { logo: "/luxx.png", name: "LuxxOds" },
                    { logo: "/lead.webp", name: "Lead Gen Ethiopia" },
                    { logo: "/planet.png", name: "One Planet" },
                    { logo: "/real.png", name: "Nolan Realestate" },
                    { logo: "/upwrk.png", name: "Upwork Business Clients" },
                    { logo: "/fvr.png", name: "Fiver Business Clients" },
                  ].map((partner, index) => (
                    <div
                      key={`duplicate-${index}`}
                      className="flex flex-col items-center justify-center w-40 mx-6 opacity-80 hover:opacity-100 transition-opacity duration-300"
                    >
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-h-16 rounded-full w-auto object-contain"
                        width={160}
                        height={80}
                      />
                      <p className="mt-2 text-sm font-medium dark:text-white text-blue-600">
                        {partner.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lifecycle Section */}

        <section className="w-full py-12 md:py-24 lg:py-32 bg-transparent dark:bg-trans">
          <LifecycleSection />
        </section>

        {/* Blog Teaser Section */}
        <section className="py-20 bg-transparent dark:bg-transparent">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700 dark:text-blue-600">
                Latest Blog Insights
              </h2>
              <p className="max-w-[600px] mx-auto mt-4 text-gray-600 dark:text-gray-300">
                Stay updated with our tips, trends, and tech insights.
              </p>
            </motion.div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {[
                {
                  title: "Top Web Design Trends for 2025",
                  excerpt:
                    "Discover the styles shaping the future of digital experiences.",
                  link: "/blog",
                  image: "/website.jpg",
                },

                {
                  title: "Why choosing the right tech provider is crucial",
                  excerpt:
                    "Choosing the right tech provider can make all the difference.",
                  link: "/blog",
                  image: "/jemaw.png",
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
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      width={400}
                      height={200}
                      priority
                    />
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-block text-blue-500 dark:text-blue-600 hover:underline font-medium">
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
        <section className="bg-transparent dark:to-blue-900 py-20 text-blue-600 dark:text-blue-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl  font-bold text-blue-600 dark:text-white tracking-tighter sm:text-4xl md:text-5xl">
                  Let us{" "}
                  <span className="text-black dark:text-blue-900">Build</span>{" "}
                  Something{" "}
                  <span className="text-black dark:text-blue-900">Amazing</span>
                </h2>
                <Link href="/contact" className="inline-block">
                  <Button className="bg-blue-600 text-white hover:bg-blue-500 font-semibold py-3 px-8 rounded-full">
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
