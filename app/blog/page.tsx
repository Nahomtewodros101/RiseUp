"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Search, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  published: boolean;
  publishedAt: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
}

export default function BlogPage() {
  const [isContentReady, setIsContentReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  const blogPosts = [
    {
      id: "1",
      title: "The Future of Web Development: Trends to Watch in 2025",
      slug: "future-web-development-trends-2025",
      excerpt:
        "Explore the emerging technologies and methodologies that are shaping the future of web development.",
      content: "",
      coverImage: "/website.jpg",
      tags: ["Web Development", "Trends", "Technology"],
      published: true,
      publishedAt: "2025-03-15T00:00:00Z",
      author: {
        id: "1",
        name: "Nahom Tewodros",
        image: "/user.png",
      },
    },
    {
      id: "2",
      title: "Building Accessible Web Applications: A Comprehensive Guide",
      slug: "building-accessible-web-applications",
      excerpt:
        "Learn how to create web applications that are accessible to all users, including those with disabilities.",
      content: "",
      coverImage: "/app.jpg",
      tags: ["Accessibility", "Web Development", "UI/UX"],
      published: true,
      publishedAt: "2025-02-28T00:00:00Z",
      author: {
        id: "2",
        name: "Abenezer Wasihun",
        image: "/user.png",
      },
    },
    {
      id: "3",
      title: "Optimizing React Performance: Tips and Best Practices",
      slug: "optimizing-react-performance",
      excerpt:
        "Discover strategies to improve the performance of your React applications and deliver a better user experience.",
      content: "",
      coverImage: "/react.png",
      tags: ["React", "Performance", "JavaScript"],
      published: true,
      publishedAt: "2025-02-10T00:00:00Z",
      author: {
        id: "3",
        name: "Beka Dessalegn",
        image: "/user.png",
      },
    },
    {
      id: "4",
      title: "The Role of AI in Modern Web Development",
      slug: "ai-in-modern-web-development",
      excerpt:
        "Explore how artificial intelligence is transforming the way we build and interact with web applications.",
      content: "",
      coverImage: "/ai.jpg",
      tags: ["AI", "Web Development", "Technology"],
      published: true,
      publishedAt: "2025-01-20T00:00:00Z",
      author: {
        id: "1",
        name: "Estifanos Neway",
        image: "/user.png",
      },
    },
    {
      id: "5",
      title: "Responsive Design in 2025: Beyond Media Queries",
      slug: "responsive-design-beyond-media-queries",
      excerpt:
        "Learn about advanced techniques for creating truly responsive web experiences that go beyond traditional media queries.",
      content: "",
      coverImage: "/res.png",
      tags: ["Responsive Design", "CSS", "UI/UX"],
      published: true,
      publishedAt: "2025-01-05T00:00:00Z",
      author: {
        id: "4",
        name: "Kaleab Taye",
        image: "/user.png",
      },
    },
    {
      id: "6",
      title: "Getting Started with TypeScript in Your Next.js Project",
      slug: "typescript-nextjs-getting-started",
      excerpt:
        "A step-by-step guide to integrating TypeScript into your Next.js projects for improved type safety and developer experience.",
      content: "",
      coverImage: "/ts.jpg",
      tags: ["TypeScript", "Next.js", "JavaScript"],
      published: true,
      publishedAt: "2022-12-15T00:00:00Z",
      author: {
        id: "3",
        name: "Nebiyu Yohhanes",
        image: "/user.png",
      },
    },
  ];

  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

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
              <h1 className="text-3xl font-bold text-blue-600 tracking-tighter sm:text-5xl">
                Our Blog
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Insights, tutorials, and updates from the Qemem Devs team
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0">
                <Button
                  variant={selectedTag ? "outline" : "default"}
                  className={
                    !selectedTag ? "bg-blue-600 hover:bg-blue-700" : ""
                  }
                  onClick={() => setSelectedTag(null)}
                >
                  All Topics
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {allTags.map((tag, index) => (
                <Badge
                  key={index}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedTag === tag ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                  onClick={() =>
                    setSelectedTag(tag === selectedTag ? null : tag)
                  }
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => setSelectedBlog(post)}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-video">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                          <div className="relative h-6 w-6 rounded-full overflow-hidden mr-2">
                            <Image
                              src={post.author.image || "/placeholder.svg"}
                              alt={post.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {post.author.name}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full p-6 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-4 z-50 right-4 bg-white rounded-lg text-black hover:text-black dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setSelectedBlog(null)}
              >
                <X className="h-6 w-6" />
              </button>
              <div className="relative w-full h-64 mb-6">
                <Image
                  src={selectedBlog.coverImage || "/placeholder.svg"}
                  alt={selectedBlog.title}
                  layout="fill"
                  className="object-cover rounded-lg"
                />
              </div>
              <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {selectedBlog.content || selectedBlog.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                    <Image
                      src={selectedBlog.author.image || "/placeholder.svg"}
                      alt={selectedBlog.author.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedBlog.author.name}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(selectedBlog.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
