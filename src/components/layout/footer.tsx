import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SOCIAL_LINKS, SITE_NAME } from "@/lib/constants";

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  mail: Mail,
};

export function Footer() {
  return (
    <footer className="border-t bg-background/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">{SITE_NAME}</h3>
            <p className="text-sm text-muted-foreground">
              简洁的个人技术博客与作品展示平台
            </p>
            <div className="flex space-x-2">
              {SOCIAL_LINKS.map((link) => {
                const Icon = socialIcons[link.icon] || Mail;
                return (
                  <Button key={link.label} variant="ghost" size="icon" asChild>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  技术博客
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  项目作品
                </Link>
              </li>
              <li>
                <Link
                  href="/artworks"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  艺术作品
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  关于我
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">资源</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/guestbook"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  留言板
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  联系我
                </Link>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  RSS 订阅
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">订阅更新</h4>
            <p className="text-sm text-muted-foreground mb-4">
              订阅以获取最新文章和项目更新
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button type="submit" size="sm">
                订阅
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              隐私政策
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              服务条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
