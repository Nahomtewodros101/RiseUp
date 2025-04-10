"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function CareersPage() {
  const [isContentReady, setIsContentReady] = useState(false);
  const [jobListings, setJobListings] = useState<
    {
      id: string;
      title: string;
      department: string;
      location: string;
      type: string;
      salary: string;
      description: string;
    }[]
  >([]);

  // Mock data for FAQs
  const faqs = [
    {
      question: "What is the application process?",
      answer:
        "Our application process involves submitting your resume, an initial screening, and an interview.",
    },
    {
      question: "Do you offer remote positions?",
      answer:
        "Yes, we offer remote positions for certain roles. Check the job description for details.",
    },
    {
      question: "What benefits do you provide?",
      answer:
        "We provide health insurance, paid time off, and opportunities for professional development.",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await fetch("/api/careers");
        const jobsData = await jobsResponse.json();

        setJobListings(jobsData);
        setIsContentReady(true);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchData();
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
                Join Our Team
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Explore career opportunities at Qemem Devs and be part of our
                mission to create innovative digital solutions
              </p>
            </motion.div>
          </div>

          {/* Why Join Us Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-6">Why Join Qemem Devs?</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2">
                    Innovative Projects
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Work on cutting-edge technologies and challenging projects
                    that make a real impact.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2">
                    Growth Opportunities
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Continuous learning, mentorship, and clear paths for career
                    advancement.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2">Inclusive Culture</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    A diverse, supportive environment where every voice is
                    valued and respected.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Open Positions Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Departments</TabsTrigger>
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="grid gap-6 md:grid-cols-2">
                  {jobListings.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="engineering">
                <div className="grid gap-6 md:grid-cols-2">
                  {jobListings
                    .filter((job) => job.department === "Engineering")
                    .map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="design">
                <div className="grid gap-6 md:grid-cols-2">
                  {jobListings
                    .filter((job) => job.department === "Design")
                    .map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="operations">
                <div className="grid gap-6 md:grid-cols-2">
                  {jobListings
                    .filter((job) => job.department === "Operations")
                    .map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* FAQs Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function JobCard({ job }: { job: any }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
        <div className="flex flex-wrap gap-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mr-4">
            <Briefcase className="h-4 w-4 mr-1" />
            {job.department}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mr-4">
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mr-4">
            <Clock className="h-4 w-4 mr-1" />
            {job.type}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <DollarSign className="h-4 w-4 mr-1" />
            {job.salary}
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {job.description}
        </p>
        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
          <Link href={`/careers/${job.id}`}>
            View Job Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
