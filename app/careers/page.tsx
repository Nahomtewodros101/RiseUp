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

  useEffect(() => {
    // Set content as ready after the loading screen has had time to show
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 2100); // Slightly longer than the loading screen duration

    return () => clearTimeout(timer);
  }, []);

  // Sample job listings
  const jobListings = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA (Remote Option)",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      description:
        "We're looking for an experienced Frontend Developer to join our team and help build beautiful, responsive web applications.",
      responsibilities: [
        "Develop new user-facing features using React.js",
        "Build reusable components and libraries for future use",
        "Translate designs and wireframes into high-quality code",
        "Optimize components for maximum performance",
        "Collaborate with back-end developers and designers",
      ],
      requirements: [
        "5+ years of experience with JavaScript and React.js",
        "Strong understanding of responsive design principles",
        "Experience with modern frontend build pipelines and tools",
        "Familiarity with RESTful APIs and GraphQL",
        "Knowledge of modern authorization mechanisms",
      ],
    },
    {
      id: "2",
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      description:
        "We're seeking a talented UX/UI Designer to create amazing user experiences for our clients' digital products.",
      responsibilities: [
        "Create user flows, wireframes, prototypes, and mockups",
        "Design UI elements and components",
        "Conduct user research and testing",
        "Collaborate with developers to implement designs",
        "Stay up-to-date with the latest UI trends and technologies",
      ],
      requirements: [
        "3+ years of experience in UX/UI design",
        "Proficiency in design tools like Figma, Adobe XD, or Sketch",
        "Strong portfolio demonstrating UI design skills",
        "Understanding of user-centered design principles",
        "Experience working in an agile environment",
      ],
    },
    {
      id: "3",
      title: "Backend Developer",
      department: "Engineering",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      description:
        "Join our backend team to build scalable and efficient server-side applications.",
      responsibilities: [
        "Design and implement server-side architecture",
        "Develop APIs and services",
        "Optimize database queries and performance",
        "Implement security and data protection measures",
        "Collaborate with frontend developers",
      ],
      requirements: [
        "4+ years of experience with Node.js or similar backend technologies",
        "Strong knowledge of database systems (SQL and NoSQL)",
        "Experience with cloud services (AWS, Azure, or GCP)",
        "Understanding of server-side templating languages",
        "Knowledge of security compliance and best practices",
      ],
    },
    {
      id: "4",
      title: "Project Manager",
      department: "Operations",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      salary: "$100,000 - $130,000",
      description:
        "We're looking for an experienced Project Manager to lead our client projects from inception to completion.",
      responsibilities: [
        "Manage project scope, timeline, and budget",
        "Coordinate with development teams and clients",
        "Create and maintain project documentation",
        "Identify and mitigate project risks",
        "Report on project status to stakeholders",
      ],
      requirements: [
        "3+ years of experience in project management",
        "PMP certification or equivalent",
        "Experience with agile methodologies",
        "Strong communication and leadership skills",
        "Familiarity with project management tools",
      ],
    },
  ];

  // FAQs about working at the company
  const faqs = [
    {
      question: "What is the interview process like?",
      answer:
        "Our interview process typically consists of an initial phone screening, a technical assessment or portfolio review, and a final interview with the team. The entire process usually takes 2-3 weeks.",
    },
    {
      question: "Do you offer remote work options?",
      answer:
        "Yes, we offer both fully remote positions and hybrid options depending on the role and team. We believe in flexibility and focus on results rather than location.",
    },
    {
      question: "What benefits do you offer?",
      answer:
        "We offer competitive benefits including health insurance, 401(k) matching, unlimited PTO, professional development stipends, and regular team events and retreats.",
    },
    {
      question: "What is the company culture like?",
      answer:
        "We foster a collaborative, innovative, and inclusive environment. We value work-life balance, continuous learning, and celebrating our diverse perspectives and backgrounds.",
    },
    {
      question: "How do you support professional growth?",
      answer:
        "We support professional growth through mentorship programs, learning stipends, conference attendance, and clear career progression paths. We encourage everyone to dedicate time to learning new skills.",
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

          {/* Application Process Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-6">Our Application Process</h2>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    1
                  </span>
                </div>
                <h3 className="font-bold mb-2">Apply Online</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Submit your application through our careers page
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    2
                  </span>
                </div>
                <h3 className="font-bold mb-2">Initial Screening</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Phone interview with our recruitment team
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    3
                  </span>
                </div>
                <h3 className="font-bold mb-2">Technical Assessment</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Skills evaluation relevant to the position
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    4
                  </span>
                </div>
                <h3 className="font-bold mb-2">Final Interview</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Meet with the team and discuss next steps
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center bg-blue-600 dark:bg-blue-800 text-white rounded-lg p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              Don't See a Perfect Fit?
            </h2>
            <p className="max-w-[600px] mx-auto mb-6 text-blue-100">
              We're always looking for talented individuals to join our team.
              Send us your resume and we'll keep you in mind for future
              opportunities.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              <Link href="/contact">
                Send Your Resume
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

// Job Card Component
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
          <Link href={`/contact`}>
            View Job Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
