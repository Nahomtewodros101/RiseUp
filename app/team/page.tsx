"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Github, Linkedin, Twitter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
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

        // Filter out inactive members
        const activeMembers = data.filter(
          (member: TeamMember) => member.isActive
        );

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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Team
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Meet the talented individuals behind Qemem Devs
              </p>
            </motion.div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
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
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
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
                  </div>
                </motion.div>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
