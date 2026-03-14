import Link from "next/link";
import { Github, ExternalLink, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/features/particle-background";
import { FadeIn, SlideUp, ScrollReveal } from "@/components/shared/page-transition";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "AI 智能助手",
      description: "基于 GPT-4 的智能对话应用，支持多轮对话、上下文理解和知识库问答。",
      techStack: ["React", "TypeScript", "OpenAI API", "Next.js"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      featured: true,
      image: "",
    },
    {
      id: 2,
      title: "实时协作白板",
      description: "支持多人实时协作的在线白板应用，提供流畅的绘图和标注体验。",
      techStack: ["React", "Node.js", "Socket.io", "Canvas"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      featured: true,
      image: "",
    },
    {
      id: 3,
      title: "电商后台管理系统",
      description: "功能完善的电商后台管理系统，支持商品管理、订单处理、数据分析等。",
      techStack: ["Vue3", "TypeScript", "Element Plus", "Node.js"],
      githubUrl: "https://github.com",
      demoUrl: "",
      featured: false,
      image: "",
    },
    {
      id: 4,
      title: "个人博客系统",
      description: "现代化的个人博客系统，支持 Markdown 编辑、SEO 优化和响应式设计。",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      featured: false,
      image: "",
    },
    {
      id: 5,
      title: "文件分享平台",
      description: "安全的文件分享平台，支持大文件传输、链接有效期和密码保护。",
      techStack: ["React", "Node.js", "AWS S3", "WebSocket"],
      githubUrl: "https://github.com",
      demoUrl: "",
      featured: false,
      image: "",
    },
    {
      id: 6,
      title: "音乐播放器",
      description: "功能丰富的在线音乐播放器，支持歌词显示、播放列表和音效调节。",
      techStack: ["React", "TypeScript", "Web Audio API"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      featured: false,
      image: "",
    },
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

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
                <span className="gradient-text">项目作品</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                用代码构建有趣、有价值的项目
              </p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-16 bg-background relative">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-8">精选项目</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 0.1}>
                  <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30 overflow-hidden">
                    <div className="aspect-video md:aspect-[21/9] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Code2 className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <Button variant="ghost" size="icon" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-5 w-5" />
                              </a>
                            </Button>
                          )}
                          {project.demoUrl && (
                            <Button variant="ghost" size="icon" asChild>
                              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-5 w-5" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="py-16 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-8">所有项目</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.1}>
                <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code2 className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex gap-1">
                        {project.githubUrl && (
                          <Button variant="ghost" size="icon" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {project.demoUrl && (
                          <Button variant="ghost" size="icon" asChild>
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.techStack.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
