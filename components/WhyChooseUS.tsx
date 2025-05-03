"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Handshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

export default function WhyChooseUsSection() {
  const features = [
    {
      title: "Expertise",
      description:
        "Masters of our craft with years of experience at Qmem Tech.",
      icon: Trophy,
    },
    {
      title: "Innovation",
      description:
        "Creating trends, not following them, with cutting-edge solutions.",
      icon: Lightbulb,
    },
    {
      title: "Reliability",
      description: "Dependable and consistent, always there for you.",
      icon: ShieldCheck,
    },
    {
      title: "Trust",
      description: "We believe in transparency and open communication.",
      icon: Handshake,
    },
  ];

  return (
    <section className="relative py-20 bg-transparent rounded-lg overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10 max-w-7xl  mx-auto">
        <motion.div
          className="text-center "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-blue-600 tracking-tight">
            Why Choose Qmem Tech?
          </h2>
          <p className="max-w-xl mx-auto mt-6 text-gray-600 text-lg sm:text-xl leading-relaxed font-inter">
            We are more than a service we are a movement, shaping the future
            with innovation and trust.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="relative group bg-white dark:bg-blue-900 border-gray-300 border backdrop-blur-md p-6 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              viewport={{ once: true }}
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
              {/* Border Animation */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-300 transition-all duration-1000 ease-in-out pointer-events-none"></div>
              <motion.div
                className="absolute top-2 right-2 text-blue-200 opacity-0 group-hover:opacity-100"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
                transition={{ duration: 1, repeat: 0 }}
              >
                <Sparkles className="h-5 w-5" color="blue" />
              </motion.div>
              <div className="flex items-center justify-start mb-4">
                <item.icon className="h-8 w-8 text-blue-600 dark:text-white " />
              </div>
              <h3 className="text-xl sm:text-2xl font-poppins font-semibold text-blue-600 dark:text-white relative z-10">
                {item.title}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300 mt-3 relative z-10 font-inter leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            className="bg-white dark: text-blue-800 hover:bg-blue-100 font-semibold py-3 px-8 rounded-full"
          >
            <a href="/about">Discover More</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
