"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/features/particle-background";
import { FadeIn, SlideUp, ScrollReveal } from "@/components/shared/page-transition";
import { motion } from "framer-motion";

export default function AboutPage() {
  const skills = [
    { category: "正在学习", items: ["HTML", "CSS", "JavaScript", "Python", "Next.js"] },
    { category: "曾经学习", items: ["Swift", "Scratch"] },
    { category: "其他技能", items: ["英语", "数学", "写作", "吉他"] },
  ];

  // 6 个标签均分 360°，间隔 60°，避免重叠
  const profileTags = [
    { label: "天蝎座", angle: -150 },
    { label: "苹果迷", angle: -90 },
    { label: "夜猫子", angle: -30 },
    { label: "咖啡控", angle: 30 },
    { label: "极简主义", angle: 90 },
    { label: "书虫", angle: 150 },
  ];

  const TAG_DISTANCE = 130;

  const timeline = [
    {
      year: "2026",
      title: "初中二年级",
      company: "学校",
      description: "继续学习 Web 开发，建立个人博客",
    },
    {
      year: "2025",
      title: "初中一年级",
      company: "学校",
      description: "开始学习 JavaScript 和 HTML",
    },
    {
      year: "2023",
      title: "小学五年级",
      company: "",
      description: "开始学习 Swift 编程",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ParticleBackground />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-background to-gray-100 -z-[1]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <SlideUp>
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="relative" style={{ width: '380px', height: '320px' }}>
                  <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-primary/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <AvatarImage src="/avatar.jpeg" alt="Profile" />
                    <AvatarFallback className="text-4xl">👨‍💻</AvatarFallback>
                  </Avatar>
                  {/* Profile Tags - Around Avatar */}
                  {profileTags.map((tag, index) => {
                    const radian = (tag.angle * Math.PI) / 180;
                    const offsetX = Math.cos(radian) * TAG_DISTANCE;
                    const offsetY = Math.sin(radian) * TAG_DISTANCE;
                    // 容器中心 (50% of 380=190, 50% of 320=160)
                    const centerX = 190;
                    const centerY = 160;
                    // 直接计算 left/top，不再用 CSS translate
                    const leftPos = centerX + offsetX;
                    const topPos = centerY + offsetY;
                    
                    return (
                      <motion.div
                        key={tag.label}
                        initial={{ left: centerX, top: centerY - 200, opacity: 0 }}
                        animate={{ left: leftPos, top: topPos, opacity: 1 }}
                        transition={{ 
                          delay: 0.1 + index * 0.1, 
                          duration: 0.8,
                          type: "spring",
                          stiffness: 150,
                          damping: 20
                        }}
                        className="absolute px-3 py-1.5 rounded-full text-xs font-medium text-white whitespace-nowrap -translate-x-1/2 -translate-y-1/2"
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {tag.label}
                      </motion.div>
                    );
                  })}
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    你好，我是 <span className="gradient-text">Jiahong</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-4">
                    初二学生 / 编程爱好者 / 科技探索者
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      中国 · 广东
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      14 岁
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      编程 3 年
                    </span>
                  </div>
                </div>
              </div>
            </SlideUp>

            <FadeIn delay={0.2}>
              <div className="flex gap-4 justify-center md:justify-start">
                {socialLinks.map((social) => (
                  <Button key={social.label} variant="outline" size="icon" asChild>
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2>关于我</h2>
                <p>
                  我是一名 14 岁的初中二年级学生，对编程和技术充满热情。
                  虽然学习编程的时间不长，但我已经深深喜欢上了这个充满创造力的世界。
                </p>
                <p>
                  除了编程，我也喜欢玩游戏、看动漫和阅读。我正在学习 HTML、CSS、JavaScript 等前端技术，
                  未来希望能学习 Python 和 AI 相关的知识，创造出有趣的作品。
                </p>
                <p>
                  这是我的个人博客网站，记录我学习和探索技术的过程。
                  如果你也是技术爱好者，或者有任何建议，欢迎留言交流！
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SlideUp>
              <h2 className="text-2xl font-semibold mb-8">技能栈</h2>
            </SlideUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((skillGroup, i) => (
                <ScrollReveal key={skillGroup.category} delay={i * 0.1}>
                  <Card className="border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">{skillGroup.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SlideUp>
              <h2 className="text-2xl font-semibold mb-8">经历</h2>
            </SlideUp>
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.1}>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-20 text-right">
                      <span className="font-bold text-primary">{item.year}</span>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-2 w-3 h-3 rounded-full bg-primary" />
                      <div className="border-l border-border pl-6 pb-8 last:pb-0">
                        <h3 className="font-semibold">{item.title}</h3>
                        {item.company && (
                          <p className="text-sm text-muted-foreground">{item.company}</p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "5+", label: "完成项目" },
                { value: "3+", label: "博客文章" },
                { value: "3+", label: "年学习" },
                { value: "10+", label: "学习技能" },
              ].map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 0.1}>
                  <Card className="border-border/50">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">一起交流进步</h2>
            <p className="text-muted-foreground mb-8">
              欢迎各位技术爱好者留言交流，互相学习！
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/contact">
                  联系我
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/guestbook">
                  留言板
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
