import { Home, BookOpen, Folder, Palette, User, MessageCircle } from "lucide-react";

export const SITE_NAME = "CjhScript";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_DESCRIPTION = "初中生的生活博客 | 记录成长点滴 | 分享有趣故事";
export const SITE_KEYWORDS = [
  "博客",
  "技术",
  "编程",
  "作品集",
  "摄影",
  "设计",
  "前端",
  "后端",
];

export const NAV_ITEMS = [
  { label: "首页", href: "/", icon: Home },
  { label: "生活", href: "/blog", icon: BookOpen },
  { label: "项目", href: "/projects", icon: Folder },
  { label: "艺术", href: "/artworks", icon: Palette },
  { label: "关于", href: "/about", icon: User },
  { label: "留言", href: "/guestbook", icon: MessageCircle },
];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Email", href: "mailto:hello@example.com", icon: "mail" },
];

export const BLOG_CATEGORIES = [
  "前端开发",
  "后端开发",
  "移动开发",
  "DevOps",
  "人工智能",
  "数据分析",
  "设计模式",
  "职业生涯",
];

export const ARTWORK_TYPES = [
  { value: "photography", label: "摄影" },
  { value: "painting", label: "绘画" },
  { value: "design", label: "设计" },
  { value: "illustration", label: "插画" },
  { value: "other", label: "其他" },
];

export const DEFAULT_AVATAR = "/images/default-avatar.png";
export const DEFAULT_COVER = "/images/default-cover.png";
export const DEFAULT_OG_IMAGE = "/images/og-image.jpg";
export const THEME_COOKIE = "theme";
