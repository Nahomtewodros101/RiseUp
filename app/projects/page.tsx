"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/index";
import { Dialog } from "@/components/ui/dialog";

export default function ProjectsPage() {
  const [isContentReady, setIsContentReady] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (selectedType !== "All") {
          queryParams.append("projectType", selectedType);
        }
        selectedTech.forEach((tech) => queryParams.append("techStack", tech));

        const url = `/api/projects${
          queryParams.toString() ? `?${queryParams}` : ""
        }`;
        const response = await fetch(url);
        const data = await response.json();
        setProjects(data); // Directly set the fetched data without normalization
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [selectedType, selectedTech]);

  const projectTypes: string[] = [
    "All",
    "website",
    "app",
    "ui-ux",
    "cloud-services",
    "dev-ops",
  ];

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  if (!isContentReady || isLoading) {
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
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-3xl font-bold text-blue-600 tracking-tighter sm:text-5xl">
                Our Projects
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Explore our portfolio of successful projects and innovative
                solutions.
              </p>
            </motion.div>
          </div>

          {/* Filter Buttons */}
          <div className="mb-8">
            <h3 className="text-lg p-5 font-semibold">
              Filter by Project Type
            </h3>
            <div className="flex px-5 flex-wrap gap-4">
              {projectTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "ghost" : "default"}
                  onClick={() => setSelectedType(type)}
                  className="transition-all duration-300"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            <AnimatePresence mode="wait">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -60 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer"
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* Project Details Modal */}
      {selectedProject && (
        <Dialog open={true} onOpenChange={() => setSelectedProject(null)}>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key="modal"
                  initial={{ opacity: 0, scale: 0.7, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: 50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-3xl w-full space-y-8 relative"
                >
                  {/* Close Button */}
                  <X
                  color="blue"
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 cursor-pointer"
                  />

                  {/* Project Image */}
                  {selectedProject.thumbnail && (
                    <Image
                      src={selectedProject.thumbnail}
                      alt={selectedProject.title}
                      width={700}
                      height={400}
                      className="w-full h-72 object-cover rounded-lg shadow-md"
                    />
                  )}

                  {/* Project Title */}
                  <h2 className="text-3xl font-bold text-blue-600">
                    {selectedProject.title}
                  </h2>

                  {/* Project Description */}
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedProject.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Link */}
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-blue-500 hover:underline font-semibold"
                    >
                      View Project ↗
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Dialog>
      )}
    </div>
  );
}
