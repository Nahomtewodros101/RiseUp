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

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Job } from "@/types";

export default function CareersPage() {
  const [isContentReady, setIsContentReady] = useState(false);
  const [jobListings, setJobListings] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    careerId: "",
    fullName: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
  }

  interface ApplicationData {
    careerId: string;
    fullName: string;
    email: string;
    phone: string;
    resumeUrl: string;
    coverLetter: string;
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsContentReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const response = await fetch("/api/careers");
        if (!response.ok) throw new Error("Failed to fetch job listings");
        const data = await response.json();
        setJobListings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobListings();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitApplication = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });
      if (!res.ok) throw new Error("Failed to submit application");
      alert("Application submitted successfully!");
      setApplicationData({
        careerId: "",
        fullName: "",
        email: "",
        phone: "",
        resumeUrl: "",
        coverLetter: "",
      });
    } catch (err) {
      console.error(err);
      alert("Submission failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isContentReady) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 via-blue-200 to-white">
      <Navbar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link href="/">
              <Button variant="ghost" className="mb-6 text-blue-700">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back Home
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
              Dream Big. Build Bigger.
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Careers at Qemem Devs — shape the future with code, craft, and
              creativity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Open Roles
            </h2>
            {loadingJobs ? (
              <p className="text-blue-600">Fetching opportunities...</p>
            ) : (
              <Tabs defaultValue="all">
                <TabsList className="bg-blue-200 text-blue-900 mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="engineering">Engineering</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="grid md:grid-cols-2 gap-6">
                    {jobListings.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Apply Now</h2>
            <form
              onSubmit={handleSubmitApplication}
              className="space-y-4 bg-white p-6 rounded shadow"
            >
              <select
                name="careerId"
                value={applicationData.careerId}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-blue-300 rounded"
              >
                <option value="">Choose a position</option>
                {jobListings.length > 0 ? (
                  jobListings.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))
                ) : (
                  <option disabled>No openings</option>
                )}
              </select>
              <input
                name="fullName"
                value={applicationData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
                className="w-full p-2 border border-blue-300 rounded"
              />
              <input
                name="email"
                type="email"
                value={applicationData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="w-full p-2 border border-blue-300 rounded"
              />
              <input
                name="phone"
                type="tel"
                value={applicationData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                required
                className="w-full p-2 border border-blue-300 rounded"
              />
              <input
                name="resumeUrl"
                type="url"
                value={applicationData.resumeUrl}
                onChange={handleInputChange}
                placeholder="Resume URL"
                required
                className="w-full p-2 border border-blue-300 rounded"
              />
              <textarea
                name="coverLetter"
                value={applicationData.coverLetter}
                onChange={handleInputChange}
                placeholder="Cover Letter (optional)"
                className="w-full p-2 border border-blue-300 rounded"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <Card className="bg-white border border-blue-200 shadow-md">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          {job.title}
        </h3>
        <div className="flex flex-wrap gap-3 text-sm text-blue-700 mb-4">
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" /> {job.department}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {job.location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {job.type}
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" /> {job.salary}
          </div>
        </div>
        <p className="text-gray-600 mb-4">{job.description}</p>
        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
          <Link href={`/careers/${job.id}`}>
            View Job <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
