"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [isContentReady, setIsContentReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    // Set content as ready after the loading screen has had time to show
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 2100); // Slightly longer than the loading screen duration

    return () => clearTimeout(timer);
  }, []);

  // Sample blog posts data
  const blogPosts = [
    {
      id: "1",
      title: "The Future of Web Development: Trends to Watch in 2023",
      slug: "future-web-development-trends-2023",
      excerpt:
        "Explore the emerging technologies and methodologies that are shaping the future of web development.",
      content: "",
      coverImage: "/placeholder.svg?height=400&width=800",
      tags: ["Web Development", "Trends", "Technology"],
      published: true,
      publishedAt: "2023-03-15T00:00:00Z",
      author: {
        id: "1",
        name: "Alex Johnson",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "2",
      title: "Building Accessible Web Applications: A Comprehensive Guide",
      slug: "building-accessible-web-applications",
      excerpt:
        "Learn how to create web applications that are accessible to all users, including those with disabilities.",
      content: "",
      coverImage: "/placeholder.svg?height=400&width=800",
      tags: ["Accessibility", "Web Development", "UI/UX"],
      published: true,
      publishedAt: "2023-02-28T00:00:00Z",
      author: {
        id: "2",
        name: "Sarah Chen",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "3",
      title: "Optimizing React Performance: Tips and Best Practices",
      slug: "optimizing-react-performance",
      excerpt:
        "Discover strategies to improve the performance of your React applications and deliver a better user experience.",
      content: "",
      coverImage: "/placeholder.svg?height=400&width=800",
      tags: ["React", "Performance", "JavaScript"],
      published: true,
      publishedAt: "2023-02-10T00:00:00Z",
      author: {
        id: "3",
        name: "Michael Rodriguez",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "4",
      title: "The Role of AI in Modern Web Development",
      slug: "ai-in-modern-web-development",
      excerpt:
        "Explore how artificial intelligence is transforming the way we build and interact with web applications.",
      content: "",
      coverImage: "/placeholder.svg?height=400&width=800",
      tags: ["AI", "Web Development", "Technology"],
      published: true,
      publishedAt: "2023-01-20T00:00:00Z",
      author: {
        id: "1",
        name: "Alex Johnson",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "5",
      title: "Responsive Design in 2023: Beyond Media Queries",
      slug: "responsive-design-beyond-media-queries",
      excerpt:
        "Learn about advanced techniques for creating truly responsive web experiences that go beyond traditional media queries.",
      content: "",
      coverImage: "/placeholder.svg?height=400&width=800",
      tags: ["Responsive Design", "CSS", "UI/UX"],
      published: true,
      publishedAt: "2023-01-05T00:00:00Z",
      author: {
        id: "4",
        name: "Priya Patel",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "6",
      title: "Getting Started with TypeScript in Your Next.js Project",
      slug: "typescript-nextjs-getting-started",
      excerpt:
        "A step-by-step guide to integrating TypeScript into your Next.js projects for improved type safety and developer experience.",
      content: "",
      coverImage: "/placeholder.svg?height=400&width=800",
      tags: ["TypeScript", "Next.js", "JavaScript"],
      published: true,
      publishedAt: "2022-12-15T00:00:00Z",
      author: {
        id: "3",
        name: "Michael Rodriguez",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
  ];

  // Get all unique tags from blog posts
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  // Filter blog posts based on search query and selected tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

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
                Our Blog
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Insights, tutorials, and updates from the Qemem Devs team
              </p>
            </motion.div>
          </div>

          {/* Search and Filter Section */}
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

            {/* Tags */}
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

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href={`/blog/${filteredPosts[0].slug}`}>
                <Card className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={filteredPosts[0].coverImage || "/placeholder.svg"}
                      alt={filteredPosts[0].title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {filteredPosts[0].tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                          <Image
                            src={
                              filteredPosts[0].author.image ||
                              "/placeholder.svg"
                            }
                            alt={filteredPosts[0].author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {filteredPosts[0].author.name}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(
                          filteredPosts[0].publishedAt
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          {filteredPosts.length > 1 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
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
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No posts found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : null}

          {/* Newsletter Signup */}
          <motion.div
            className="mt-20 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="max-w-[600px] mx-auto mb-6 text-gray-500 dark:text-gray-400">
              Stay updated with our latest articles, tutorials, and company news
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                placeholder="Your email address"
                type="email"
                className="flex-1"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
