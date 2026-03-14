export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  github: string | null;
  twitter: string | null;
  linkedin: string | null;
  skills: string[] | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  author_id: string;
  author?: Profile;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  tags: string[] | null;
  category: string | null;
  published: boolean;
  published_at: string | null;
  featured: boolean;
  views: number;
  likes: number;
  reading_time: number | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  owner_id: string;
  owner?: Profile;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  cover_image: string | null;
  tech_stack: string[] | null;
  github_url: string | null;
  demo_url: string | null;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export type ArtworkType = "photography" | "painting" | "design" | "illustration" | "other";

export interface Artwork {
  id: string;
  owner_id: string;
  owner?: Profile;
  title: string;
  slug: string;
  description: string | null;
  type: ArtworkType;
  image_url: string;
  thumbnail_url: string | null;
  metadata: Record<string, unknown> | null;
  tags: string[] | null;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export type CommentTargetType = "blog" | "project" | "artwork";

export interface Comment {
  id: string;
  user_id: string;
  user?: Profile;
  target_type: CommentTargetType;
  target_id: string;
  content: string;
  parent_id: string | null;
  replies?: Comment[];
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface GuestbookEntry {
  id: string;
  user_id: string | null;
  user?: Profile | null;
  content: string;
  is_approved: boolean;
  created_at: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface SearchResult {
  type: "blog" | "project" | "artwork";
  id: string;
  title: string;
  description: string;
  url: string;
}
