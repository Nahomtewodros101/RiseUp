"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 2100); 

    return () => clearTimeout(timer);
  }, []);

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
                Privacy Policy
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Last updated: January 1, 2023
              </p>
            </motion.div>
          </div>

          <motion.div
            className="prose prose-blue max-w-none dark:prose-invert"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Introduction</h2>
            <p>
              Qemem Devs (&qout;we&qout;, &qout;our&qout;, or &qout;us&qout;) is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website or use our services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree
              with the terms of this Privacy Policy, please do not access the
              site or us our services.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The
              information we may collect includes:
            </p>

            <h3>Personal Data</h3>
            <p>
              Personally identifiable information, such as your name, email
              address, telephone number, and other similar contact data that you
              voluntarily give to us when you register with the site or when you
              choose to participate in various activities related to the site,
              such as online chat and message boards. You are under no
              obligation to provide us with personal information of any kind,
              however your refusal to do so may prevent you from using certain
              features of the site.
            </p>

            <h3>Derivative Data</h3>
            <p>
              Information our servers automatically collect when you access the
              site, such as your IP address, browser type, operating system,
              access times, and the pages you have viewed directly before and
              after accessing the site.
            </p>

            <h3>Financial Data</h3>
            <p>
              Financial information, such as data related to your payment method
              (e.g., valid credit card number, card brand, expiration date) that
              we may collect when you purchase, order, return, exchange, or
              request information about our services from the site.
            </p>

            <h2>Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you
              with a smooth, efficient, and customized experience. Specifically,
              we may use information collected about you via the site to:
            </p>
            <ul>
              <li>Create and manage your account.</li>
              <li>Process your transactions.</li>
              <li>
                Send you email newsletters, if you have opted in to receive
                them.
              </li>
              <li>Respond to your inquiries and customer service requests.</li>
              <li>
                Deliver targeted advertising, newsletters, and other information
                regarding promotions and the site to you.
              </li>
              <li>Administer sweepstakes, promotions, and contests.</li>
              <li>
                Compile anonymous statistical data and analysis for use
                internally or with third parties.
              </li>
              <li>Increase the efficiency and operation of the site.</li>
              <li>
                Monitor and analyze usage and trends to improve your experience
                with the site.
              </li>
              <li>Notify you of updates to the site.</li>
              <li>
                Prevent fraudulent transactions, monitor against theft, and
                protect against criminal activity.
              </li>
            </ul>

            <h2>Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain
              situations. Your information may be disclosed as follows:
            </p>

            <h3>By Law or to Protect Rights</h3>
            <p>
              If we believe the release of information about you is necessary to
              respond to legal process, to investigate or remedy potential
              violations of our policies, or to protect the rights, property,
              and safety of others, we may share your information as permitted
              or required by any applicable law, rule, or regulation.
            </p>

            <h3>Third-Party Service Providers</h3>
            <p>
              We may share your information with third parties that perform
              services for us or on our behalf, including payment processing,
              data analysis, email delivery, hosting services, customer service,
              and marketing assistance.
            </p>

            <h2>Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable, and no method of data transmission
              can be guaranteed against any interception or other type of
              misuse.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy,
              please contact us at:
            </p>
            <p>
              Qemem Devs
              <br />
              Gerji Imperial
              <br />
              Spokane, WD 94107
              <br />
              chefche@qememdevs.com
              <br />
              +251 (300) 123-4567
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
