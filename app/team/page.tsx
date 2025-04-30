"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Github,
  Linkedin,
  Twitter,
  Loader2,
  VerifiedIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import type { TeamMember } from "@/types";

export default function TeamPage() {
  const [isContentReady, setIsContentReady] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/team");

        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }

        const data = await response.json();
        const activeMembers = data.filter(
          (member: TeamMember) => member.isActive
        );
        console.log("Fetched team members:", activeMembers); // Debug: Log fetched data
        setTeamMembers(activeMembers);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching team members"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (isContentReady) {
      fetchTeamMembers();
    }
  }, [isContentReady]);

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
                The Qmem Community
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Meet the talented individuals behind Qemem Cloud Community
              </p>
            </motion.div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
              <p className="ml-4 text-gray-500 dark:text-gray-400">
                Get ready to meet our Qmems
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Team Grid */}
          {!isLoading && !error && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg">
                      
                      <VerifiedIcon color="blue" className=" h-4 w-4 inline-flex" /> {member.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                      {member.bio}
                    </p>
                    {(member.skills?.length ?? 0) > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <AnimatePresence>
                          {member.skills!.map((skill, skillIndex) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{
                                duration: 0.2,
                                delay: skillIndex * 0.05,
                              }}
                            >
                              <Badge
                                variant="secondary"
                                className="bg-gradient-to-r from-blue-500 to-blue-500 text-white font-bold uppercase text-xs py-1 px-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 hover:rotate-2"
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        No skills listed
                      </p>
                    )}
                    <div className="mt-4 flex space-x-3">
                      {member.socialLinks.twitter && (
                        <Link
                          href={member.socialLinks.twitter}
                          className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="h-5 w-5" />
                          <span className="sr-only">Twitter</span>
                        </Link>
                      )}
                      {member.socialLinks.linkedin && (
                        <Link
                          href={member.socialLinks.linkedin}
                          className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                      )}
                      {member.socialLinks.github && (
                        <Link
                          href={member.socialLinks.github}
                          className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-5 w-5" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No Team Members State */}
          {!isLoading && !error && teamMembers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No team members found.
              </p>
            </div>
          )}

          {/* Join Our Team Section */}
          <motion.div
            className="mt-20 rounded-lg bg-blue-50 dark:bg-blue-900/20 p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="max-w-[600px] mx-auto mb-6 text-gray-500 dark:text-gray-400">
              We are always looking for talented individuals to join our growing
              team. Check out our open positions.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/careers">View Open Positions</Link>
            </Button>
          </motion.div>
          <blockquote className="text-xl font-semibold italic text-blue-600 dark:text-blue-400">
            We are not just a team ... we are a family. Together, we create
            magic.
          </blockquote>
          <p className="mt-4 text-sm font-medium text-end text-blue-300">
            — Qemem Devs
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
