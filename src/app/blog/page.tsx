"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Tag, Calendar, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/features/particle-background";
import { FadeIn, SlideUp, ScrollReveal } from "@/components/shared/page-transition";

const POSTS_PER_PAGE = 2;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const categories = [
    "全部",
    "日常",
    "校园",
    "旅行",
    "美食",
    "游戏",
    "动漫",
  ];

  const posts = [
    {
      id: 1,
      slug: "first-blog",
      title: "我做了自己的博客网站！",
      excerpt: "花了几天时间，用 Next.js 搭建了自己的博客网站，记录学习和生活。",
      category: "日常",
      tags: ["网站", "Next.js", "编程"],
      date: "2026-03-08",
      likes: 25,
      cover: "bg-gradient-to-br from-orange-100 to-amber-100",
    },
    {
      id: 2,
      slug: "swift-learning",
      title: "从 Swift 开始的编程之路",
      excerpt: "回顾学习编程的历程，从小学五年级接触 Swift，到后来学习 JavaScript。",
      category: "日常",
      tags: ["编程", "Swift", "JavaScript"],
      date: "2026-03-05",
      likes: 32,
      cover: "bg-gradient-to-br from-blue-100 to-cyan-100",
    },
    {
      id: 3,
      slug: "minecraft-redstone",
      title: "我的世界红石电路入门",
      excerpt: "学习做红石自动农场，整理了一些简单实用的红石电路设计。",
      category: "游戏",
      tags: ["我的世界", "红石", "游戏"],
      date: "2026-03-01",
      likes: 48,
      cover: "bg-gradient-to-br from-green-100 to-emerald-100",
    },
    {
      id: 4,
      slug: "anime-2026-winter",
      title: "2026年冬季番推荐",
      excerpt: "整理了最近在追的动漫，强烈推荐这几部！",
      category: "动漫",
      tags: ["动漫", "推荐", "冬季番"],
      date: "2026-02-25",
      likes: 56,
      cover: "bg-gradient-to-br from-purple-100 to-pink-100",
    },
    {
      id: 5,
      slug: "school-festival",
      title: "校园艺术节",
      excerpt: "参加了学校的艺术节表演吉他弹唱，紧张但很有收获！",
      category: "校园",
      tags: ["校园", "吉他", "表演"],
      date: "2026-02-18",
      likes: 22,
      cover: "bg-gradient-to-br from-yellow-100 to-orange-100",
    },
    {
      id: 6,
      slug: "weekend-trip",
      title: "周末户外骑行",
      excerpt: "和家人一起去郊外骑行，春天风景太好了！",
      category: "旅行",
      tags: ["骑行", "户外", "周末"],
      date: "2026-02-12",
      likes: 18,
      cover: "bg-gradient-to-br from-teal-100 to-cyan-100",
    },
    {
      id: 7,
      slug: "first-cook",
      title: "第一次下厨做蛋炒饭",
      excerpt: "尝试学做蛋炒饭，虽然卖相不怎么样，但味道居然还不错！",
      category: "美食",
      tags: ["美食", "做饭", "蛋炒饭"],
      date: "2026-01-25",
      likes: 28,
      cover: "bg-gradient-to-br from-amber-100 to-yellow-100",
    },
  ];

  const filteredPosts =
    selectedCategory === "全部"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ParticleBackground />

      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-background to-gray-100 -z-[1]" />
        <div className="container mx-auto px-4 relative z-10">
          <SlideUp>
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">生活点滴</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                记录生活中的美好瞬间和有趣故事
              </p>
            </div>
          </SlideUp>

          {/* Search */}
          <SlideUp delay={0.1}>
            <div className="max-w-xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="搜索生活记录..."
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, i) => (
              <FadeIn key={category} delay={i * 0.05}>
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentPosts.length === 0 ? (
                <div className="col-span-full text-center py-16 text-muted-foreground">
                  <p className="text-lg">该分类暂无文章，换个分类看看吧～</p>
                </div>
              ) : (
                currentPosts.map((post, i) => (
                  <ScrollReveal key={post.id} delay={i * 0.1}>
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30">
                        <div className={`aspect-video ${post.cover} rounded-t-xl relative overflow-hidden`}>
                          <Badge className="absolute top-3 left-3" variant="secondary">
                            {post.category}
                          </Badge>
                          {post.featured && (
                            <Badge className="absolute top-3 right-3" variant="gradient">
                              精选
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-6 flex flex-col h-[calc(100%-40%)]">
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {post.likes}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </ScrollReveal>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                上一页
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                下一页
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
