"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PrivacyPolicyPage() {
  const [isContentReady, setIsContentReady] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isContentReady) {
    return null;
  }

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "use-of-your-information", title: "Use of Your Information" },
    {
      id: "disclosure-of-your-information",
      title: "Disclosure of Your Information",
    },
    {
      id: "security-of-your-information",
      title: "Security of Your Information",
    },
    { id: "contact-us", title: "Contact Us" },
  ];

  return (
    <div className="min-h-screen flex flex-col  text-gray-900 font-inter">
      {/* Floating Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md "
      >
        <Navbar />
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-32 pb-16 text-center  text-blue-600"
      >
        <h1 className="text-4xl md:text-5xl font-poppins font-bold tracking-tight leading-tight">
          Your Privacy, Our Priority
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-blue-600 leading-relaxed">
          Learn how Qemem cloud protects your data with transparency and care.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} className="mt-8">
          <Button
            asChild
            className="bg-white text-blue-800 hover:bg-blue-100 font-semibold py-3 px-6 rounded-full"
          >
            <Link href="#content">Explore Our Policy</Link>
          </Button>
        </motion.div>
      </motion.section>

      <main id="content" className="flex-1 py-12  backdrop-blur-lg  md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="mb-12 flex items-center justify-between">
            <Link href="/" className="bg-white rounded-lg">
              <Button
                variant="ghost"
                className="text-blue-600 hover:text-blue-800 flex items-center text-base"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
            <p className="text-sm text-black font-medium">
              Last updated: April 21, 2025
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sticky Table of Contents */}
            <motion.aside
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="md:sticky md:top-24 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg max-h-[300px] overflow-y-auto"
            >
              <h3 className="text-base font-poppins font-semibold text-blue-800 mb-3">
                Contents
              </h3>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={cn(
                        "block text-sm font-medium hover:text-blue-600 transition-colors",
                        activeSection === section.id
                          ? "text-blue-600 font-semibold"
                          : "text-gray-600"
                      )}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              className="md:col-span-3 prose prose-blue max-w-none bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <section id="introduction" className="scroll-mt-24">
                <h2 className="text-3xl font-poppins font-bold text-blue-800 mb-4 leading-tight">
                  Introduction
                </h2>
                <p className="text-base leading-relaxed text-gray-700">
                  Qemem cloud we are committed to protecting your privacy. This
                  Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our website or use
                  our services.
                </p>
                <p className="text-base leading-relaxed text-gray-700 mt-4">
                  Please read this Privacy Policy carefully. If you do not agree
                  with the terms of this Privacy Policy, please do not access
                  the site or use our services.
                </p>
              </section>

              <section
                id="information-we-collect"
                className="mt-12 scroll-mt-24"
              >
                <h2 className="text-3xl font-poppins font-bold text-blue-800 mb-4 leading-tight">
                  Information We Collect
                </h2>
                <p className="text-base leading-relaxed text-gray-700">
                  We may collect information about you in a variety of ways,
                  including:
                </p>

                <h3 className="text-xl font-poppins font-semibold text-blue-800 mt-6 mb-3">
                  Personal Data
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  Personally identifiable information, such as your name, email
                  address, telephone number, and other similar contact data that
                  you voluntarily give to us when you register with the site or
                  participate in activities like online chat and message boards.
                </p>

                <h3 className="text-xl font-poppins font-semibold text-blue-800 mt-6 mb-3">
                  Derivative Data
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  Information our servers automatically collect, such as your IP
                  address, browser type, operating system, access times, and the
                  pages you viewed before and after accessing the site.
                </p>

                <h3 className="text-xl font-poppins font-semibold text-blue-800 mt-6 mb-3">
                  Financial Data
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  Financial information, such as payment method details (e.g.,
                  credit card number, card brand, expiration date) collected
                  when you purchase, order, return, exchange, or request
                  information about our services.
                </p>
              </section>

              <section
                id="use-of-your-information"
                className="mt-12 scroll-mt-24"
              >
                <h2 className="text-3xl font-poppins font-bold text-blue-800 mb-4 leading-tight">
                  Use of Your Information
                </h2>
                <p className="text-base leading-relaxed text-gray-700">
                  We use your information to provide a smooth, efficient, and
                  customized experience, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed text-gray-700 mt-4">
                  <li>Create and manage your account.</li>
                  <li>Process your transactions.</li>
                  <li>Send email newsletters (if opted in).</li>
                  <li>Respond to inquiries and customer service requests.</li>
                  <li>Deliver targeted advertising and promotions.</li>
                  <li>Administer sweepstakes, promotions, and contests.</li>
                  <li>Compile anonymous statistical data for internal use.</li>
                  <li>Improve site efficiency and operation.</li>
                  <li>Monitor and analyze usage trends.</li>
                  <li>Notify you of site updates.</li>
                  <li>Prevent fraud and protect against criminal activity.</li>
                </ul>
              </section>

              <section
                id="disclosure-of-your-information"
                className="mt-12 scroll-mt-24"
              >
                <h2 className="text-3xl font-poppins font-bold text-blue-800 mb-4 leading-tight">
                  Disclosure of Your Information
                </h2>
                <p className="text-base leading-relaxed text-gray-700">
                  Your information may be shared in the following situations:
                </p>

                <h3 className="text-xl font-poppins font-semibold text-blue-800 mt-6 mb-3">
                  By Law or to Protect Rights
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  We may share your information to respond to legal processes,
                  investigate policy violations, or protect the rights,
                  property, and safety of others as permitted by law.
                </p>

                <h3 className="text-xl font-poppins font-semibold text-blue-800 mt-6 mb-3">
                  Third-Party Service Providers
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  We may share your information with third parties that perform
                  services for us, such as payment processing, data analysis,
                  email delivery, hosting, customer service, and marketing.
                </p>
              </section>

              <section
                id="security-of-your-information"
                className="mt-12 scroll-mt-24"
              >
                <h2 className="text-3xl font-poppins font-bold text-blue-800 mb-4 leading-tight">
                  Security of Your Information
                </h2>
                <p className="text-base leading-relaxed text-gray-700">
                  We use administrative, cloudnical, and physical security
                  measures to protect your personal information. However, no
                  security measures are perfect, and no data transmission method
                  is guaranteed against interception or misuse.
                </p>
              </section>

              <section id="contact-us" className="mt-12 scroll-mt-24">
                <h2 className="text-3xl font-poppins font-bold text-blue-800 mb-4 leading-tight">
                  Contact Us
                </h2>
                <p className="text-base leading-relaxed text-gray-700">
                  If you have questions or comments about this Privacy Policy,
                  please contact us at:
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-700">
                  Qemem cloud
                  <br />
                  Gerji Imperial
                  <br />
                  Spokane, WD 94107
                  <br />
                  <a
                    href="mailto:chefche@qememcloud.com"
                    className="text-blue-600 hover:underline"
                  ></a>
                  <br />
                  +251930902116
                </p>
                <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
                  <Button className=" text-white hover:bg-blue-700 py-3 px-6 rounded-full flex items-center font-medium">
                    <Link href="/contact" className="flex">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Us a Message
                    </Link>
                  </Button>
                </motion.div>
              </section>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
