"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const BackgroundGrid = () => (
  <div className="absolute inset-0 opacity-20 pointer-events-none">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwIDB2NDBNMjAgMHY0ME0zMCAwdjQwTTEwIDBoMzBMMTAgME0xMCAxMGgzME0xMCAyMGgzME0xMCAzMGgzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')] animate-pulse"></div>
  </div>
);

export default function WhyChooseUsSection() {
  const features = [
    {
      title: "Expertise",
      description:
        "Masters of our craft with years of experience at Qmem Tech.",
    },
    {
      title: "Innovation",
      description:
        "Creating trends, not following them, with cutting-edge solutions.",
    },
    {
      title: "Reliability",
      description: "Dependable and consistent, always there for you.",
    },
    {
      title: "Support",
      description: "Guiding you every step to ensure your success.",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-800 to-blue-600 overflow-hidden">
      <BackgroundGrid />
      <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-white tracking-tight">
            Why Choose Qmem Tech?
          </h2>
          <p className="max-w-xl mx-auto mt-6 text-blue-100 text-lg sm:text-xl leading-relaxed font-inter">
            We’re more than a service—we’re a movement, shaping the future with
            innovation and trust.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="relative group bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
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
                <Sparkles className="h-5 w-5" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-poppins font-semibold text-white relative z-10">
                {item.title}
              </h3>
              <p className="text-base text-blue-100 mt-3 relative z-10 font-inter leading-relaxed">
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
            className="bg-white text-blue-800 hover:bg-blue-100 font-semibold py-3 px-8 rounded-full"
          >
            <a href="/about">Discover More</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
