"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TeamPage() {
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    // Set content as ready after the loading screen has had time to show
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 2100); // Slightly longer than the loading screen duration

    return () => clearTimeout(timer);
  }, []);

  // Sample team data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "10+ years of experience in software development and tech entrepreneurship.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Expert in cloud architecture and distributed systems with a background in AI research.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Developer",
      bio: "Full-stack developer specializing in React and Node.js ecosystems.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Priya Patel",
      role: "UI/UX Designer",
      bio: "Award-winning designer with a passion for creating intuitive user experiences.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "David Kim",
      role: "Mobile Developer",
      bio: "Specialist in cross-platform mobile development with React Native and Flutter.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Emma Wilson",
      role: "Project Manager",
      bio: "Certified Scrum Master with experience managing complex tech projects.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
  ];

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
                Our Team
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Meet the talented individuals behind Qemem Devs
              </p>
            </motion.div>
          </div>

          {/* Team Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-lg border bg-background p-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {member.role}
                  </p>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {member.bio}
                  </p>
                  <div className="mt-4 flex space-x-3">
                    <Link
                      href={member.social.twitter}
                      className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link
                      href={member.social.linkedin}
                      className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                      href={member.social.github}
                      className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

         
        </div>
      </main>
      <Footer />
    </div>
  );
}
