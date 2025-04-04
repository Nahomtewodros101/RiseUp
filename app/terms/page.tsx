"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    // Set content as ready after the loading screen has had time to show
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 2100); // Slightly longer than the loading screen duration

    return () => clearTimeout(timer);
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
                Terms of Service
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
            <h2>Agreement to Terms</h2>
            <p>
              {/* i hate linting problems */}
              These Terms of Service constitute a legally binding agreement made
              between you, whether personally or on behalf of an entity (&apos;you&apos;)
              and Qemem Devs (&apos;we,&apos; &apos;us&apos; or &apos;our&apos;), concerning your access to
              and use of our website as well as any other media form, media
              channel, mobile website or mobile application related, linked, or
              otherwise connected thereto (collectively, the &apos;Site&apos;).
            </p>
            <p>
              You agree that by accessing the Site, you have read, understood,
              and agree to be bound by all of these Terms of Service. If you do
              not agree with all of these Terms of Service, then you are
              expressly prohibited from using the Site and you must discontinue
              use immediately.
            </p>

            <h2>Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property
              and all source code, databases, functionality, software, website
              designs, audio, video, text, photographs, and graphics on the Site
              (collectively, the &apos;Content&apos;) and the trademarks, service marks,
              and logos contained therein (the &apos;Marks&apos;) are owned or controlled
              by us or licensed to us, and are protected by copyright and
              trademark laws and various other intellectual property rights and
              unfair competition laws of the United States, international
              copyright laws, and international conventions.
            </p>
            <p>
              The Content and the Marks are provided on the Site &apos;AS IS&apos; for
              your information and personal use only. Except as expressly
              provided in these Terms of Service, no part of the Site and no
              Content or Marks may be copied, reproduced, aggregated,
              republished, uploaded, posted, publicly displayed, encoded,
              translated, transmitted, distributed, sold, licensed, or otherwise
              exploited for any commercial purpose whatsoever, without our
              express prior written permission.
            </p>

            <h2>User Representations</h2>
            <p>
              By using the Site, you represent and warrant that: (1) you have
              the legal capacity and you agree to comply with these Terms of
              Service; (2) you are not a minor in the jurisdiction in which you
              reside; (3) you will not access the Site through automated or
              non-human means, whether through a bot, script or otherwise; (4)
              you will not use the Site for any illegal or unauthorized purpose;
              and (5) your use of the Site will not violate any applicable law
              or regulation.
            </p>

            <h2>Prohibited Activities</h2>
            <p>
              You may not access or use the Site for any purpose other than that
              for which we make the Site available. The Site may not be used in
              connection with any commercial endeavors except those that are
              specifically endorsed or approved by us.
            </p>
            <p>As a user of the Site, you agree not to:</p>
            <ul>
              <li>
                Systematically retrieve data or other content from the Site to
                create or compile, directly or indirectly, a collection,
                compilation, database, or directory without written permission
                from us.
              </li>
              <li>
                Trick, defraud, or mislead us and other users, especially in any
                attempt to learn sensitive account information such as user
                passwords.
              </li>
              <li>
                Circumvent, disable, or otherwise interfere with
                security-related features of the Site, including features that
                prevent or restrict the use or copying of any Content or enforce
                limitations on the use of the Site and/or the Content contained
                therein.
              </li>
              <li>
                Disparage, tarnish, or otherwise harm, in our opinion, us and/or
                the Site.
              </li>
              <li>
                Use any information obtained from the Site in order to harass,
                abuse, or harm another person.
              </li>
              <li>
                Make improper use of our support services or submit false
                reports of abuse or misconduct.
              </li>
              <li>
                Use the Site in a manner inconsistent with any applicable laws
                or regulations.
              </li>
              <li>
                Upload or transmit (or attempt to upload or to transmit)
                viruses, Trojan horses, or other material, including excessive
                use of capital letters and spamming (continuous posting of
                repetitive text), that interferes with any party's uninterrupted
                use and enjoyment of the Site or modifies, impairs, disrupts,
                alters, or interferes with the use, features, functions,
                operation, or maintenance of the Site.
              </li>
            </ul>

            <h2>Submissions</h2>
            <p>
              You acknowledge and agree that any questions, comments,
              suggestions, ideas, feedback, or other information regarding the
              Site (&apos;Submissions&apos;) provided by you to us are non-confidential
              and shall become our sole property. We shall own exclusive rights,
              including all intellectual property rights, and shall be entitled
              to the unrestricted use and dissemination of these Submissions for
              any lawful purpose, commercial or otherwise, without
              acknowledgment or compensation to you.
            </p>

            <h2>Site Management</h2>
            <p>
              We reserve the right, but not the obligation, to: (1) monitor the
              Site for violations of these Terms of Service; (2) take
              appropriate legal action against anyone who, in our sole
              discretion, violates the law or these Terms of Service, including
              without limitation, reporting such user to law enforcement
              authorities; (3) in our sole discretion and without limitation,
              refuse, restrict access to, limit the availability of, or disable
              (to the extent technologically feasible) any of your Contributions
              or any portion thereof; (4) in our sole discretion and without
              limitation, notice, or liability, to remove from the Site or
              otherwise disable all files and content that are excessive in size
              or are in any way burdensome to our systems; and (5) otherwise
              manage the Site in a manner designed to protect our rights and
              property and to facilitate the proper functioning of the Site.
            </p>

            <h2>Term and Termination</h2>
            <p>
              These Terms of Service shall remain in full force and effect while
              you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE
              TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION
              AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE
              SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR
              ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR
              BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN
              THESE TERMS OF SERVICE OR OF ANY APPLICABLE LAW OR REGULATION. WE
              MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR DELETE ANY
              CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT
              WARNING, IN OUR SOLE DISCRETION.
            </p>

            <h2>Contact Us</h2>
            <p>
              In order to resolve a complaint regarding the Site or to receive
              further information regarding use of the Site, please contact us
              at:
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
