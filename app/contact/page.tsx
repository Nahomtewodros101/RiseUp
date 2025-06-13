"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { IPhoneFrame } from "@/components/IphoneFrame";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

export default function ContactPage() {
  const [isContentReady, setIsContentReady] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again later.");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setIsSubmitting(false);
      if (err instanceof Error) {
        setError(err.message || "Something went wrong, please try again.");
      } else {
        setError("Something went wrong, please try again.");
      }
    }
  };

  if (!isContentReady) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <main className="flex-1 py-12 md:py-24">
        {/* Decorative Header Section */}
        <div className="relative w-full h-48 bg-blue-600 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/path-to-decorative-image.jpg')] bg-cover bg-center opacity-30" />
          <motion.div
            className="container px-4 md:px-6 mt-10 text-center text-white space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Let's Connect
            </h1>
            <p className="max-w-[700px] mx-auto text-lg">
              Reach out to our team for inquiries, projects, or support. We're
              here to help!
            </p>
          </motion.div>
        </div>

        <div className="container px-4 md:px-6 mt-12">
          <div className="mb-12 flex justify-center">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-blue-100"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact Form inside iPhone Frame */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <IPhoneFrame>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-10">
                      <div className="rounded-full bg-green-100 p-3">
                        <svg
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold">Message Sent!</h3>
                      <p className="text-center text-gray-500 dark:text-gray-400">
                        Thank you for contacting us. We'll get back to you soon.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-4 bg-blue-600 hover:bg-blue-700"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          required
                          className="border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Subject
                        </label>
                        <Select>
                          <SelectTrigger className="border-gray-300 dark:border-gray-600">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="project">
                              Project Discussion
                            </SelectItem>
                            <SelectItem value="quote">
                              Request a Quote
                            </SelectItem>
                            <SelectItem value="support">
                              Technical Support
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Your message"
                          className="min-h-[100px] border-gray-300 dark:border-gray-600"
                          required
                        />
                      </div>
                      {error && <p className="text-red-600 text-sm">{error}</p>}
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </div>
              </IPhoneFrame>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-lg border bg-card p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-500 dark:text-gray-400">
                        Addis Ababa, Ethiopia
                        <br />
                        Spokane, WA
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-500 dark:text-gray-400">
                        hello@qememdevs.com
                        <br />
                        Estifanos.neway.d@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-gray-500 dark:text-gray-400">
                        +251 963 18 29 98
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <MapComponent />
            </motion.div>
          </div>

          {/* Call to Action Section */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-lg bg-blue-100 dark:bg-blue-900 p-6 shadow-md">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Ready to Start a Project?
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Let's collaborate to bring your ideas to life. Contact us today!
              </p>
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setIsSubmitted(false)}
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
