"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, Clock, Tag, ArrowLeft, Share2, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ReadingProgress } from "@/components/layout/reading-progress";
import { ParticleBackground } from "@/components/features/particle-background";
import { ScrollReveal, FadeIn } from "@/components/shared/page-transition";

// 前6篇文章的详细数据
const blogPosts: Record<string, {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  likes: number;
  readingTime: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  cover: string;
}> = {
  "first-blog": {
    id: "1",
    title: "我做了自己的博客网站！",
    content: `
# 我做了自己的博客网站！

大家好！经过几天的努力，我终于完成了我自己的博客网站！心情超级激动！

## 为什么要做博客？

其实很久以前就想有一个属于自己的博客了。每次看到那些技术大牛的博客，觉得特别酷。特别是他们分享自己的学习心得和生活故事，我也想这样做。

### 记录生活

这个博客主要会分享：
- 日常生活中的有趣故事
- 校园生活的点点滴滴
- 喜欢的游戏和动漫
- 学习编程的心得

## 技术栈选择

我选择了 Next.js 来开发这个网站。虽然我现在还在学习阶段，但 Next.js 真的很好用！

### 遇到的问题

在开发过程中也遇到了不少问题：
- 组件的样式怎么调都不对
- 动画效果实现不了
- 适配移动端好麻烦

但是通过查文档、问朋友这些问题都解决啦！

## 写在最后

希望以后能坚持写博客，记录更多美好的瞬间！如果有做得不好的地方，请大家多多包涵！

也欢迎大家留言告诉我你们想看什么内容！
    `,
    excerpt: "花了几天时间，用 Next.js 搭建了自己的博客网站，记录学习和生活。",
    category: "日常",
    tags: ["网站", "Next.js", "编程"],
    date: "2026-03-08",
    likes: 25,
    readingTime: "3分钟",
    author: {
      name: "Jiahong",
      avatar: "",
      bio: "初中生 / 编程爱好者",
    },
    cover: "bg-gradient-to-br from-orange-100 to-amber-100",
  },
  "swift-learning": {
    id: "2",
    title: "从 Swift 开始的编程之路",
    content: `
# 从 Swift 开始的编程之路

今天来聊聊我是怎么开始学编程的～

## 第一次接触编程

记得是小学五年级的时候，我在iPad上下载了Swift Playgrounds，开始了我的编程之旅。

### 为什么会选Swift？

其实当时什么都不懂，就是觉得苹果的东西很酷，而且Swift Playgrounds里面有很多有趣的小游戏可以玩。

## 学习历程

从那以后，我开始接触各种编程语言：

1. **Swift** - 我的启蒙语言
2. **HTML/CSS** - 做网页的基础
3. **JavaScript** - 真正让我觉得编程很有趣的语言
4. **React / Next.js** - 现在正在学习的框架

## 心得体会

学习编程真的很有趣，但也��有挑战性。特别是debug的时候，有时候一个错误要找半天。

不过每当程序跑起来的时候，那种成就感是无法形容的！

## 未来目标

希望以后能做出更多有趣的项目，也希望能够学到更多的知识！
    `,
    excerpt: "回顾学习编程的历程，从小学五年级接触 Swift，到后来学习 JavaScript。",
    category: "日常",
    tags: ["编程", "Swift", "JavaScript"],
    date: "2026-03-05",
    likes: 32,
    readingTime: "4分钟",
    author: {
      name: "Jiahong",
      avatar: "",
      bio: "初中生 / 编程爱好者",
    },
    cover: "bg-gradient-to-br from-blue-100 to-cyan-100",
  },
  "minecraft-redstone": {
    id: "3",
    title: "我的世界红石电路入门",
    content: `
# 我的世界红石电路入门

今天来分享一些红石电路的基础知识！

## 什么是红石？

红石是我的世界里的一个重要元素，可以用来制作各种自动化的装置。

### 基础元件

红石电路主要由以下几部分组成：
- **红石粉** - 传输信号
- **红石火把** - 提供信号源
- **中继器** - 延长信号
- **比较器** - 检测方块状态

## 简单电路分享

### 1. 自动感应门

做一个简单的自动门，需要用到：
- 红石火把
- 红石粉
- 压力板

### 2. 红石自动农场

这是我最近做的自动甘蔗农场，效率很高！

## 进阶技巧

想要做好红石电路，需要注意：
1. 信号强度会衰减，记得用中继器
2. 理解方块更新机制
3. 学会使用命令方块

## 总结

红石真的很有趣！可以做出很多意想不到的装置。大家一起交流呀～
    `,
    excerpt: "学习做红石自动农场，整理了一些简单实用的红石电路设计。",
    category: "游戏",
    tags: ["我的世界", "红石", "游戏"],
    date: "2026-03-01",
    likes: 48,
    readingTime: "5分钟",
    author: {
      name: "Jiahong",
      avatar: "",
      bio: "初中生 / 编程爱好者",
    },
    cover: "bg-gradient-to-br from-green-100 to-emerald-100",
  },
  "anime-2026-winter": {
    id: "4",
    title: "2026年冬季番推荐",
    content: `
# 2026年冬季番推荐

又到了推荐动漫的时间啦！这个冬季番真的有很多好看的！

## 个人推荐

### 1. 《青春的重启》

校园+成长题材，画风超级治愈！每集都看得热泪盈眶。

### 2. 《异世界料理店》

美食+异世界，完美的下饭番！里面的料理看起来太好吃了。

### 3. 《机甲少女》

机战类型，动作戏份超燃！战斗场景做得非常棒。

## 其他在追的作品

- 《日常系的异世界》- 日常系的异世界冒险
- 《音乐天才》- 关于音乐竞技的青春故事
- 《冒险家的日常》- 冒险题材的轻松日常

## 观看感受

这个季度的番剧整体质量很高，特别是原创动画特别多。而且很多都是有深度的作品，不是单纯的爽片。

## 总结

强烈推荐大家看看！有任何想聊的动漫也可以在留言区告诉我哦～
    `,
    excerpt: "整理了最近在追的动漫，强烈推荐这几部！",
    category: "动漫",
    tags: ["动漫", "推荐", "冬季番"],
    date: "2026-02-25",
    likes: 56,
    readingTime: "4分钟",
    author: {
      name: "Jiahong",
      avatar: "",
      bio: "初中生 / 编程爱好者",
    },
    cover: "bg-gradient-to-br from-purple-100 to-pink-100",
  },
  "school-festival": {
    id: "5",
    title: "校园艺术节",
    content: `
# 校园艺术节

上周参加了学校的艺术节，表演了吉他弹唱，超级难忘！

## 准备过程

为了这次表演，我准备了两周时间。选了一首自己很喜欢的歌，然后每天练习。

### 练习中的困难

最大的困难就是时间不够用。每天放学后要写作业，只能利用课余时间练习。

但是想想表演的舞台，再辛苦也值得！

## 表演当天

站在台上的时候其实很紧张，手心都在出汗。但是当音乐响起的时候，就完全沉浸在表演中了。

## 收获与感悟

这次艺术节让我学到了很多：
- 面对观众不再那么紧张
- 学会了更好的时间管理
- 认识了很多有共同爱好的同学

## 写在最后

虽然最后没有拿到名次，但是这次经历比结果更重要！希望以后还能有更多的机会在舞台上表演～
    `,
    excerpt: "参加了学校的艺术节表演吉他弹唱，紧张但很有收获！",
    category: "校园",
    tags: ["校园", "吉他", "表演"],
    date: "2026-02-18",
    likes: 22,
    readingTime: "3分钟",
    author: {
      name: "Jiahong",
      avatar: "",
      bio: "初中生 / 编程爱好者",
    },
    cover: "bg-gradient-to-br from-yellow-100 to-orange-100",
  },
  "weekend-trip": {
    id: "6",
    title: "周末户外骑行",
    content: `
# 周末户外骑行

这个周末和家人一起去郊外骑行，春天风景太好了！

## 骑行路线

我们选择了一条环山骑行路线，沿途的风景超级美！

### 沿途风景

- 大片的油菜花田
- 蜿蜒的小溪
- 茂密的竹林
- 远处的山峰

## 骑行感受

骑行的过程很享受，虽然有点累，但是看到这么美的风景，一切都值了！

### 小插曲

在中途休息的时候，还遇到了同样出来骑行的一家人，大家聊了很久，还交换了联系方式，约好下次一起出来玩。

## 运动收获

这次骑行让我感受到了：
- 大自然的美好
- 运动的快乐
- 亲子时光的幸福

## 总结

周末不要总是宅在家里，出去运动运动真的很好！推荐大家都出去走走～
    `,
    excerpt: "和家人一起去郊外骑行，春天风景太好了！",
    category: "旅行",
    tags: ["骑行", "户外", "周末"],
    date: "2026-02-12",
    likes: 18,
    readingTime: "3分钟",
    author: {
      name: "Jiahong",
      avatar: "",
      bio: "初中生 / 编程爱好者",
    },
    cover: "bg-gradient-to-br from-teal-100 to-cyan-100",
  },
  "first-cook": {
    id: "7",
    title: "第一次下厨做蛋炒饭",
    content: `
# 第一次下厨做蛋炒饭

今天心血来潮想学做饭，结果居然成功了！

## 准备过程

跟着网上的教程，先准备好食材：
- 米饭
- 鸡蛋
- 葱
- 盐和酱油

## 制作过程

1. 先把鸡蛋打散
2. 热锅倒油
3. 放入鸡蛋炒熟
4. 加入米饭翻炒
5. 加盐和酱油调味

## 结果展示

虽然卖相不怎么样，但是味道居然还不错！妈妈尝了也说挺好的。

## 心得体会

做饭看起来简单，但是实际操作起来还是有难度的。火候、调味都需要经验。

不过看到自己做的成品，还是很有成就感的！

## 未来计划

以后要多学几个菜，这样就可以给家人做饭啦～
    `,
    excerpt: "尝试学做蛋炒饭，虽然卖相不怎么样，但味道居然还不错！",
    category: "美食",
    tags: ["美食", "做饭", "蛋炒饭"],
    date: "2026-01-25",
    likes: 28,
    readingTime: "2分钟",
    author: {
      name: "Jiahong",
      avatar: "",
      bio: "初中生 / 编程爱好者",
    },
    cover: "bg-gradient-to-br from-amber-100 to-yellow-100",
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const blogPost = blogPosts[slug] || blogPosts["first-blog"];
  const [activeSection, setActiveSection] = useState(blogPost.title);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ReadingProgress />
      <ParticleBackground />

      {/* Header */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-background to-gray-100 -z-[1]" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回生活记录
              </Link>
            </Button>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="gradient">{blogPost.category}</Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {blogPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {blogPost.readingTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {blogPost.likes} 喜欢
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {blogPost.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={blogPost.author.avatar} />
                    <AvatarFallback>J</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{blogPost.author.name}</p>
                    <p className="text-sm text-muted-foreground">{blogPost.author.bio}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Cover Image */}
            <FadeIn delay={0.4}>
              <div className={`aspect-video ${blogPost.cover} rounded-2xl mb-8`} />
            </FadeIn>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1">
                <ScrollReveal>
                  <article className="prose prose-lg dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, '<br/>').replace(/# /g, '<h2>').replace(/## /g, '<h3>').replace(/```tsx/g, '<pre><code>').replace(/```/g, '</code></pre>') }} />
                  </article>
                </ScrollReveal>

                {/* Tags */}
                <FadeIn delay={0.5}>
                  <div className="flex flex-wrap gap-2 mt-8">
                    {blogPost.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </FadeIn>

                <Separator className="my-8" />

                {/* Author Card */}
                <FadeIn delay={0.6}>
                  <Card className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={blogPost.author.avatar} />
                          <AvatarFallback>J</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{blogPost.author.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {blogPost.author.bio}
                          </p>
                          <Button size="sm" variant="outline">
                            关注作者
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>

                {/* Comments Section */}
                <FadeIn delay={0.7}>
                  <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-6">
                      留言 ({blogPost.likes})
                    </h3>
                    <Card className="border-border/50">
                      <CardContent className="p-6">
                        <textarea
                          placeholder="写下你的留言..."
                          className="w-full min-h-[100px] p-3 rounded-lg border bg-transparent resize-none"
                        />
                        <div className="flex justify-end mt-4">
                          <Button>发表留言</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </FadeIn>
              </div>

              {/* Table of Contents - Hidden for life posts */}
              <div className="hidden lg:block w-64 shrink-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">更多生活记录</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <Card key={i} className="border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">更多生活故事...</h4>
                    <p className="text-sm text-muted-foreground">2026-03-01 · 喜欢</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
