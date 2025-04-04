"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
      console.log(params.slug);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  const post = {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2023",
    slug: "future-web-development-trends-2023",
    excerpt:
      "Explore the emerging technologies and methodologies that are shaping the future of web development.",
    content: `
      <p>The web development landscape is constantly evolving, with new technologies, frameworks, and methodologies emerging at a rapid pace. As we move through 2023, several key trends are shaping the future of web development and how developers approach building modern web applications.</p>
      
      <h2>1. The Rise of Web Components</h2>
      <p>Web Components represent a set of standardized APIs that allow developers to create reusable, encapsulated components for web applications. As browser support continues to improve, we're seeing increased adoption of Web Components in production environments.</p>
      <p>The ability to create custom elements that work across different frameworks (or with no framework at all) provides a level of interoperability that's becoming increasingly valuable in complex web ecosystems.</p>
      
      <h2>2. Server Components and Hybrid Rendering</h2>
      <p>The line between server-side and client-side rendering continues to blur with the introduction of server components in frameworks like React and Next.js. This hybrid approach allows developers to render components on the server for improved performance and SEO, while maintaining the interactivity of client-side applications.</p>
      <p>This trend represents a shift away from the strict SPA (Single Page Application) model that dominated the last decade, towards a more flexible approach that leverages the strengths of both server and client rendering.</p>
      
      <h2>3. WebAssembly Going Mainstream</h2>
      <p>WebAssembly (Wasm) is enabling high-performance code execution in the browser, allowing developers to run complex applications at near-native speed. As the ecosystem matures, we're seeing WebAssembly being used for everything from gaming and multimedia processing to scientific computing and machine learning directly in the browser.</p>
      <p>The ability to use languages like Rust, C++, and Go in web applications opens up new possibilities for web developers and brings desktop-like performance to web applications.</p>
      
      <h2>4. AI-Assisted Development</h2>
      <p>Artificial intelligence is transforming how developers write code, with tools like GitHub Copilot and similar AI assistants helping to automate repetitive tasks, suggest code completions, and even generate entire functions based on natural language descriptions.</p>
      <p>This trend is not about replacing developers, but rather enhancing their productivity and allowing them to focus on higher-level problems while AI handles more routine aspects of coding.</p>
      
      <h2>5. Edge Computing for Web Applications</h2>
      <p>Edge computing is bringing computation closer to the user, reducing latency and improving performance for web applications. Platforms like Vercel, Cloudflare Workers, and Deno Deploy allow developers to run server-side code at the edge, near the user's location.</p>
      <p>This distributed approach to serving web applications is particularly valuable for global audiences and applications where performance is critical.</p>
      
      <h2>Conclusion</h2>
      <p>The future of web development is exciting, with new technologies and approaches making it possible to build faster, more capable, and more user-friendly web applications. By staying informed about these trends and selectively adopting those that align with project requirements, developers can ensure they're delivering the best possible experience to users while maintaining sustainable and maintainable codebases.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=1200",
    tags: ["Web Development", "Trends", "Technology"],
    published: true,
    publishedAt: "2023-03-15T00:00:00Z",
    author: {
      id: "1",
      name: "Alex Johnson",
      role: "Senior Developer",
      image: "/placeholder.svg?height=100&width=100",
    },
    relatedPosts: [
      {
        id: "2",
        title: "Building Accessible Web Applications: A Comprehensive Guide",
        slug: "building-accessible-web-applications",
        excerpt:
          "Learn how to create web applications that are accessible to all users, including those with disabilities.",
        coverImage: "/placeholder.svg?height=400&width=600",
        publishedAt: "2023-02-28T00:00:00Z",
      },
      {
        id: "3",
        title: "Optimizing React Performance: Tips and Best Practices",
        slug: "optimizing-react-performance",
        excerpt:
          "Discover strategies to improve the performance of your React applications and deliver a better user experience.",
        coverImage: "/placeholder.svg?height=400&width=600",
        publishedAt: "2023-02-10T00:00:00Z",
      },
      {
        id: "4",
        title: "The Role of AI in Modern Web Development",
        slug: "ai-in-modern-web-development",
        excerpt:
          "Explore how artificial intelligence is transforming the way we build and interact with web applications.",
        coverImage: "/placeholder.svg?height=400&width=600",
        publishedAt: "2023-01-20T00:00:00Z",
      },
    ],
  };

  if (!isContentReady) {
    return null; // Return nothing while loading screen is showing
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          <article className="max-w-4xl mx-auto">
            {/* Post Header */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={post.author.image || "/placeholder.svg"}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {post.author.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              className="mb-10 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Post Content */}
            <motion.div
              className="prose prose-blue max-w-none dark:prose-invert mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Section */}
            <motion.div
              className="border-t border-b py-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <Share2 className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium">Share this article</span>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Share on Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Share on Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">Share on LinkedIn</span>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Related Posts */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {post.relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="relative aspect-video">
                        <Image
                          src={relatedPost.coverImage || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <h3 className="font-bold mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
                          {new Date(
                            relatedPost.publishedAt
                          ).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <h2 className="text-2xl font-bold mb-4">Enjoyed this article?</h2>
              <p className="max-w-[600px] mx-auto mb-6 text-gray-500 dark:text-gray-400">
                Subscribe to our newsletter to get the latest insights and
                articles delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
