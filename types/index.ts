// types.ts
export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  profileImage?: string;
  isActive: boolean | true;
}

export interface Notification {
  id: string;
  message: string;
  type: "info" | "warning" | "success";
  scheduled: boolean;
  scheduledDate?: string;
  targetAudience: string[];
  isPriority: boolean;
  creator: User; 
  createdAt: string;
}

export type ProjectType = "website" | "app" | "ui-design";

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  link?: string;
  images: string[];
  projectType: ProjectType;
  testimonial?: string;
  featured: boolean;
  type: string;
  isFeatured: boolean | false;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: SocialLinks;
  skills: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  authorId: string;
  author?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  name: string;
  email: string;
  message: string;
}
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}
