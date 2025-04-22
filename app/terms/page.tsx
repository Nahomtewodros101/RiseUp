"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Shield,
  FileText,
  BookOpen,
  ChevronDown,
  ExternalLink,
  VerifiedIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState("agreement");
  const [isContentReady, setIsContentReady] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.95, 1, 1, 0.95]
  );

  const sections = [
    { id: "agreement", title: "Agreement to Terms" },
    { id: "intellectual", title: "Intellectual Property" },
    { id: "user", title: "User Representations" },
    { id: "prohibited", title: "Prohibited Activities" },
    { id: "submissions", title: "Submissions" },
    { id: "management", title: "Site Management" },
    { id: "termination", title: "Term and Termination" },
    { id: "contact", title: "Contact Us" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const sectionElements = sections.map((section) =>
        document.getElementById(section.id)
      );

      const currentSectionIndex = sectionElements.findIndex((element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom > 200;
      });

      if (currentSectionIndex !== -1) {
        setActiveSection(sections[currentSectionIndex].id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isContentReady]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  if (!isContentReady) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Shield className="h-16 w-16 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold">Loading Terms of Service</h2>
            <p className="text-muted-foreground mt-2">
              Preparing legal information...
            </p>
            <div className="mt-6 w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-background -z-10" />
        <div className="container px-4 pt-16 pb-8 md:pt-24 md:pb-12">
          <Link href="/">
            <Button variant="ghost" className="mb-6 group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>

          <motion.div
            className="space-y-4 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-500" />
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Terms of Service
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm bg-blue-500/10"
              >
                Last updated: April 25, 2025
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm">
                <VerifiedIcon className="mr-1 " size={15} />
                Official Document
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Please read these terms carefully before using our services. By
              accessing our platform, you agree to be bound by these terms and
              conditions.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="flex-1 py-8" ref={contentRef}>
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 lg:sticky lg:top-24 h-fit">
              <AnimatePresence>
                {showTableOfContents && (
                  <motion.div
                    initial={{  x: -20 }}
                    animate={{  x: 0 }}
                    exit={{  x: -20 }}
                    className="bg-card rounded-xl border shadow-sm p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Table of Contents
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 lg:hidden"
                        onClick={() => setShowTableOfContents(false)}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <nav className="space-y-1">
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center ${
                            activeSection === section.id
                              ? "bg-blue-500/10 text-blue-500 font-medium"
                              : "hover:bg-muted"
                          }`}
                        >
                          {activeSection === section.id && (
                            <div className="w-1 h-4 bg-blue-500 rounded-full mr-2" />
                          )}
                          {section.title}
                        </button>
                      ))}
                    </nav>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Download PDF
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showTableOfContents && (
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden mb-4"
                  onClick={() => setShowTableOfContents(true)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Show Table of Contents
                </Button>
              )}
            </div>

            <motion.div
              className="lg:col-span-9 prose prose-slate max-w-none dark:prose-invert"
              style={{ opacity, scale }}
            >
              <Tabs defaultValue="full" className="mb-8">
                <TabsList className="w-full sm:w-auto">
                  <TabsTrigger value="full">Full Document</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>
                <TabsContent value="full" className="mt-6">
                  <Card className="mb-8 border-blue-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <span>This document is legally binding</span>
                      </div>
                      <p className="text-sm">
                        By using our services, you acknowledge that you have
                        read, understood, and agree to be bound by these Terms
                        of Service. If you do not agree with any part of these
                        terms, you must not use our services.
                      </p>
                    </CardContent>
                  </Card>

                  <section id="agreement" className="scroll-mt-24">
                    <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                      <span className="inline-block p-1 rounded-md bg-blue-500/10 text-blue-500">
                        <Check className="h-5 w-5" />
                      </span>
                      Agreement to Terms
                    </h2>
                    <p>
                      These Terms of Service constitute a legally binding
                      agreement made between you, whether personally or on
                      behalf of an entity (&apos;you&apos;) and Qemem Devs
                      (&apos;we,&apos; &apos;us&apos; or &apos;our&apos;),
                      concerning your access to and use of our website as well
                      as any other media form, media channel, mobile website or
                      mobile application related, linked, or otherwise connected
                      thereto (collectively, the &apos;Site&apos;).
                    </p>
                    <p>
                      You agree that by accessing the Site, you have read,
                      understood, and agree to be bound by all of these Terms of
                      Service. If you do not agree with all of these Terms of
                      Service, then you are expressly prohibited from using the
                      Site and you must discontinue use immediately.
                    </p>
                  </section>

                  <section id="intellectual" className="scroll-mt-24 mt-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                      <span className="inline-block p-1 rounded-md bg-blue-500/10 text-blue-500">
                        <Check className="h-5 w-5" />
                      </span>
                      Intellectual Property Rights
                    </h2>
                    <p>
                      Unless otherwise indicated, the Site is our proprietary
                      property and all source code, databases, functionality,
                      software, website designs, audio, video, text,
                      photographs, and graphics on the Site (collectively, the
                      &apos;Content&apos;) and the trademarks, service marks,
                      and logos contained therein (the &apos;Marks&apos;) are
                      owned or controlled by us or licensed to us, and are
                      protected by copyright and trademark laws and various
                      other intellectual property rights and unfair competition
                      laws of the United States, international copyright laws,
                      and international conventions.
                    </p>
                    <p>
                      The Content and the Marks are provided on the Site
                      &apos;AS IS&apos; for your information and personal use
                      only. Except as expressly provided in these Terms of
                      Service, no part of the Site and no Content or Marks may
                      be copied, reproduced, aggregated, republished, uploaded,
                      posted, publicly displayed, encoded, translated,
                      transmitted, distributed, sold, licensed, or otherwise
                      exploited for any commercial purpose whatsoever, without
                      our express prior written permission.
                    </p>
                  </section>

                  <section id="user" className="scroll-mt-24 mt-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                      <span className="inline-block p-1 rounded-md bg-blue-500/10 text-blue-500">
                        <Check className="h-5 w-5" />
                      </span>
                      User Representations
                    </h2>
                    <p>
                      By using the Site, you represent and warrant that: (1) you
                      have the legal capacity and you agree to comply with these
                      Terms of Service; (2) you are not a minor in the
                      jurisdiction in which you reside; (3) you will not access
                      the Site through automated or non-human means, whether
                      through a bot, script or otherwise; (4) you will not use
                      the Site for any illegal or unauthorized purpose; and (5)
                      your use of the Site will not violate any applicable law
                      or regulation.
                    </p>
                  </section>

                  <section id="prohibited" className="scroll-mt-24 mt-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                      <span className="inline-block p-1 rounded-md bg-blue-500/10 text-blue-500">
                        <Check className="h-5 w-5" />
                      </span>
                      Prohibited Activities
                    </h2>
                    <p>
                      You may not access or use the Site for any purpose other
                      than that for which we make the Site available. The Site
                      may not be used in connection with any commercial
                      endeavors except those that are specifically endorsed or
                      approved by us.
                    </p>
                    <p>As a user of the Site, you agree not to:</p>
                    <ul className="space-y-2 my-4">
                      {[
                        "Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.",
                        "Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.",
                        "Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.",
                        "Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.",
                        "Use any information obtained from the Site in order to harass, abuse, or harm another person.",
                        "Make improper use of our support services or submit false reports of abuse or misconduct.",
                        "Use the Site in a manner inconsistent with any applicable laws or regulations.",
                        "Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site.",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 mt-0.5 flex-shrink-0">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section id="submissions" className="scroll-mt-24 mt-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                      <span className="inline-block p-1 rounded-md bg-blue-500/10 text-blue-500">
                        <Check className="h-5 w-5" />
                      </span>
                      Submissions
                    </h2>
                    <p>
                      You acknowledge and agree that any questions, comments,
                      suggestions, ideas, feedback, or other information
                      regarding the Site (&apos;Submissions&apos;) provided by
                      you to us are non-confidential and shall become our sole
                      property. We shall own exclusive rights, including all
                      intellectual property rights, and shall be entitled to the
                      unrestricted use and dissemination of these Submissions
                      for any lawful purpose, commercial or otherwise, without
                      acknowledgment or compensation to you.
                    </p>
                  </section>

                  <section id="management" className="scroll-mt-24 mt-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                      <span className="inline-block p-1 rounded-md bg-blue-500/10 text-blue-500">
                        <Check className="h-5 w-5" />
                      </span>
                      Site Management
                    </h2>
                    <p>
                      We reserve the right, but not the obligation, to: (1)
                      monitor the Site for violations of these Terms of Service;
                      (2) take appropriate legal action against anyone who, in
                      our sole discretion, violates the law or these Terms of
                      Service, including without limitation, reporting such user
                      to law enforcement authorities; (3) in our sole discretion
                      and without limitation, refuse, restrict access to, limit
                      the availability of, or disable (to the extent
                      technologically feasible) any of your Contributions or any
                      portion thereof; (4) in our sole discretion and without
                      limitation, notice, or liability, to remove from the Site
                      or otherwise disable all files and content that are
                      excessive in size or are in any way burdensome to our
                      systems; and (5) otherwise manage the Site in a manner
                      designed to protect our rights and property and to
                      facilitate the proper functioning of the Site.
                    </p>
                  </section>

                  <section id="termination" className="scroll-mt-24 mt-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                      <span className="inline-block p-1 rounded-md bg-blue-500/10 text-blue-500">
                        <Check className="h-5 w-5" />
                      </span>
                      Term and Termination
                    </h2>
                    <p>
                      These Terms of Service shall remain in full force and
                      effect while you use the Site. WITHOUT LIMITING ANY OTHER
                      PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT
                      TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR
                      LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING
                      BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY
                      REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR
                      BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT
                      CONTAINED IN THESE TERMS OF SERVICE OR OF ANY APPLICABLE
                      LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
                      PARTICIPATION IN THE SITE OR DELETE ANY CONTENT OR
                      INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING,
                      IN OUR SOLE DISCRETION.
                    </p>
                  </section>

                  <section id="contact" className="scroll-mt-24 mt-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                      <span className="inline-block p-1 rounded-md bg-blue-500/10 text-blue-500">
                        <Check className="h-5 w-5" />
                      </span>
                      Contact Us
                    </h2>
                    <p>
                      In order to resolve a complaint regarding the Site or to
                      receive further information regarding use of the Site,
                      please contact us at:
                    </p>

                    <Card className="mt-4 overflow-hidden border-0 shadow-md">
                      <div className="grid sm:grid-cols-2">
                        <CardContent className="p-6 bg-blue-500/5">
                          <h3 className="font-semibold text-lg mb-2">
                            Qemem Devs
                          </h3>
                          <address className="not-italic space-y-1 text-muted-foreground">
                            <p>Gerji Imperial</p>
                            <p>Spokane, WD 94107</p>
                            <p className="flex items-center gap-1.5">
                              <span className="inline-block w-4 h-4 rounded-full bg-green-500/20 border border-green-500/30">
                                <span className="block w-2 h-2 rounded-full bg-green-500 m-0.5"></span>
                              </span>
                              +251 (300) 123-4567
                            </p>
                            <a
                              href="mailto:chefche@qememdevs.com"
                              className="text-blue-500 hover:underline flex items-center gap-1"
                            >
                              chefche@qememdevs.com
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </address>
                        </CardContent>
                        <div className="relative h-48 sm:h-auto bg-gray-100">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center">
                            <div className="text-center p-6">
                              <Shield className="h-12 w-12 mx-auto mb-2 text-blue-500/70" />
                              <h4 className="font-medium">Customer Support</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Available 24/7
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </section>
                </TabsContent>

                <TabsContent value="summary" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                          <Shield className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-lg">
                          Important Notice
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        This is a simplified summary of our Terms of Service for
                        easier reading. The full legal document remains the
                        governing agreement between you and Qemem Devs.
                      </p>

                      <div className="space-y-6 mt-6">
                        {[
                          {
                            title: "What You're Agreeing To",
                            content:
                              "By using our site, you're entering into a legally binding agreement with us. If you don't agree with our terms, please don't use our services.",
                          },
                          {
                            title: "Our Intellectual Property",
                            content:
                              "All content on our site (code, designs, text, graphics, etc.) belongs to us and is protected by copyright laws. You can't use it commercially without our permission.",
                          },
                          {
                            title: "Your Responsibilities",
                            content:
                              "You must be legally able to enter this agreement, not a minor, and you won't use bots or automated means to access our site or use it for illegal purposes.",
                          },
                          {
                            title: "What You Can't Do",
                            content:
                              "Don't scrape our data, trick users, bypass security, harm our reputation, harass others, or upload malicious content.",
                          },
                          {
                            title: "Your Submissions",
                            content:
                              "Any feedback or suggestions you provide become our property, and we can use them without compensating you.",
                          },
                          {
                            title: "Our Rights",
                            content:
                              "We can monitor the site, take legal action against violations, restrict access, and remove content at our discretion.",
                          },
                          {
                            title: "Termination",
                            content:
                              "We can terminate your access at any time without warning for any reason, including violations of these terms.",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="pb-4 border-b last:border-0 last:pb-0"
                          >
                            <h4 className="font-medium text-base mb-1">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {item.content}
                            </p>
                          </div>
                        ))}
                      </div>

                      <Button className="mt-6 w-full" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View Full Terms
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>

      <motion.div
        className="fixed bottom-6 right-6 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          size="icon"
          className="rounded-full shadow-lg h-12 w-12 bg-blue-500 hover:bg-blue-500/90"
        >
          <ArrowLeft className="h-5 w-5 rotate-90" />
        </Button>
      </motion.div>

      <Footer />
    </div>
  );
}
