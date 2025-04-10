"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

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

export default function CareerDetailsPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    careerId: "",
    fullName: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingJob, setLoadingJob] = useState(true);
  const [hasApplied, setHasApplied] = useState(false); // Track if the user has already applied
  const [successMessage, setSuccessMessage] = useState(""); // Track success message

  useEffect(() => {
    const fetchJobListing = async () => {
      try {
        const resolvedParams = await params;
        const id = Array.isArray(resolvedParams.id)
          ? resolvedParams.id[0]
          : resolvedParams.id;
        if (!id) return;

        const response = await fetch(`/api/careers/${id}`);
        if (!response.ok) throw new Error("Failed to fetch job listing");
        const data = await response.json();
        setJob(data);
        setApplicationData((prev) => ({
          ...prev,
          careerId: id || "",
        }));

        // Check if the user has already applied
        const applicationCheck = await fetch(`/api/careers/${id}/check`);
        if (applicationCheck.ok) {
          const { hasApplied } = await applicationCheck.json();
          setHasApplied(hasApplied);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingJob(false);
      }
    };

    fetchJobListing();
  }, [params]);

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
      // Check again if the user has already applied before submitting
      const applicationCheck = await fetch(`/api/careers/${job?.id}/check`);
      if (applicationCheck.ok) {
        const { hasApplied } = await applicationCheck.json();
        if (hasApplied) {
          setHasApplied(true);
          return;
        }
      }

      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit application");
      }

      setSuccessMessage("🎉 Good luck! We'll be in touch soon.");
      setApplicationData({
        careerId: job?.id || "",
        fullName: "",
        email: "",
        phone: "",
        resumeUrl: "",
        coverLetter: "",
      });
      setHasApplied(true);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        alert(err.message || "Submission failed. Try again.");
      } else {
        alert("Submission failed. Try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasApplied) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-800">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-black text-lg font-semibold text-center"
        >
          <svg
            className="h-12 w-12 text-black mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
            />
          </svg>
          You have already submitted an application for this position. Please
          wait patiently for us to reach out to you.
        </motion.div>
        <Link href="/careers">
          <Button variant="ghost" className="mt-4 text-black">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
          </Button>
        </Link>
      </div>
    );
  }

  if (loadingJob) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-blue-600 text-lg font-semibold"
        >
          <svg
            className="animate-spin h-8 w-8 text-blue-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          Loading job details...
        </motion.div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-red-600 text-lg font-semibold text-center"
        >
          <svg
            className="h-12 w-12 text-red-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
            />
          </svg>
          Job not found. Please check the URL or try again later.
        </motion.div>
        <Link href="/careers">
          <Button variant="ghost" className="mt-4 text-red-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
          </Button>
        </Link>
      </div>
    );
  }

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
            <Link href="/careers">
              <Button variant="ghost" className="mb-6 text-blue-700">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
              {job.title}
            </h1>
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
            <p className="text-gray-600">{job.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Apply Now</h2>
            {successMessage && (
              <div className="p-4 mb-4 text-green-800 bg-green-100 rounded">
                {successMessage}
              </div>
            )}
            <form
              onSubmit={handleSubmitApplication}
              className="space-y-4 bg-white p-6 rounded shadow"
            >
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
