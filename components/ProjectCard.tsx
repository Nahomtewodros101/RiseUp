"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/";

export default function ProjectCard({
  title,
  description,
  thumbnail,
  techStack,
  link,
  projectType,
  testimonial,
  featured,
}: Project) {
  return (
    <Card className="overflow-hidden group w-full max-w-[600px] mx-auto opacity-100 transition-opacity duration-300 ease-in-out">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          width={600}
          height={180}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {description}
        </p>

        {featured && (
          <Badge
            variant="outline"
            className="mb-2 text-yellow-600 dark:text-yellow-400 text-xs"
          >
            Featured
          </Badge>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {techStack?.map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text_xs"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {testimonial && (
          <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 italic">
            <blockquote>"{testimonial}"</blockquote>
          </div>
        )}

        {projectType && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Type:</strong> {projectType}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <a
          className="gap-1 p-0 h-auto font-medium text-blue-600 dark:text-blue-400 inline-flex items-center text-sm"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </CardFooter>
    </Card>
  );
}
