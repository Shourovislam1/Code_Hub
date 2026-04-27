// Type definitions for the backend

export interface User {
  id: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  photoURL?: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
  instructorId: string;
  thumbnail?: string;
  price: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  requirements: string[];
  learningObjectives: string[];
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  progress: number;
  completedAt?: Date;
  status: 'active' | 'completed' | 'dropped';
  lastAccessedAt: Date;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'in_progress' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string;
  thumbnail?: string;
  tags: string[];
  category: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  views: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  techStack: string[];
  type: 'Open Source' | 'Competition' | 'Documentation';
  thumbnail?: string;
  githubUrl?: string;
  liveUrl?: string;
  authorId: string;
  authorName: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  useCase: string;
  icon: string;
  gradient: string;
  details: string;
  features: string[];
  pricing: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  code?: number;
}