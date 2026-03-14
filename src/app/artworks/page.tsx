import Link from "next/link";
import { Camera, Palette, Figma, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/features/particle-background";
import { FadeIn, SlideUp, ScrollReveal } from "@/components/shared/page-transition";

export default function ArtworksPage() {
  const categories = [
    { id: "all", label: "全部", icon: Image },
    { id: "photography", label: "摄影", icon: Camera },
    { id: "painting", label: "绘画", icon: Palette },
    { id: "design", label: "设计", icon: Figma },
  ];

  const artworks = [
    {
      id: 1,
      title: "城市日落",
      type: "photography",
      description: "捕捉城市天际线在夕阳下的美丽时刻",
      tags: ["城市", "日落", "风光"],
      featured: true,
    },
    {
      id: 2,
      title: "抽象色彩",
      type: "painting",
      description: "用大胆的色彩表达内心情感",
      tags: ["抽象", "色彩", "油画"],
      featured: true,
    },
    {
      id: 3,
      title: "App UI 设计",
      type: "design",
      description: "移动应用界面设计作品",
      tags: ["UI", "移动端", "现代"],
      featured: false,
    },
    {
      id: 4,
      title: "星空夜景",
      type: "photography",
      description: "星空下的宁静时刻",
      tags: ["星空", "夜景", "长曝光"],
      featured: false,
    },
    {
      id: 5,
      title: "水彩花卉",
      type: "painting",
      description: "用水彩描绘自然之美",
      tags: ["水彩", "花卉", "自然"],
      featured: false,
    },
    {
      id: 6,
      title: "品牌VI设计",
      type: "design",
      description: "企业品牌视觉识别系统",
      tags: ["VI", "品牌", "商业"],
      featured: false,
    },
    {
      id: 7,
      title: "人像摄影",
      type: "photography",
      description: "人物肖像摄影作品",
      tags: ["人像", "肖像", "室内"],
      featured: false,
    },
    {
      id: 8,
      title: "数字绘画",
      type: "painting",
      description: "数字艺术创作",
      tags: ["数字绘画", "插画", "创意"],
      featured: false,
    },
  ];

  const featuredArtworks = artworks.filter(a => a.featured);
  const otherArtworks = artworks.filter(a => !a.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "photography":
        return Camera;
      case "painting":
        return Palette;
      case "design":
        return Figma;
      default:
        return Image;
    }
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
                <span className="gradient-text">艺术作品</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                用镜头和画笔记录美好瞬间
              </p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, i) => (
              <FadeIn key={category.id} delay={i * 0.05}>
                <Button
                  variant={i === 0 ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.label}
                </Button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      {featuredArtworks.length > 0 && (
        <section className="py-16 bg-background relative">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-8">精选作品</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArtworks.map((artwork, i) => (
                <ScrollReveal key={artwork.id} delay={i * 0.1}>
                  <Link href={`/artworks/${artwork.id}`}>
                    <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300">
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {(() => {
                            const Icon = getTypeIcon(artwork.type);
                            return <Icon className="h-16 w-16 text-muted-foreground/30" />;
                          })()}
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant="gradient">
                            {artwork.type === "photography" && "摄影"}
                            {artwork.type === "painting" && "绘画"}
                            {artwork.type === "design" && "设计"}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {artwork.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {artwork.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {artwork.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Artworks */}
      <section className="py-16 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-8">所有作品</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherArtworks.map((artwork, i) => (
              <ScrollReveal key={artwork.id} delay={i * 0.05}>
                <Link href={`/artworks/${artwork.id}`}>
                  <Card className="group aspect-square overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {(() => {
                          const Icon = getTypeIcon(artwork.type);
                          return <Icon className="h-8 w-8 text-muted-foreground/30" />;
                        })()}
                      </div>
                    </div>
                    <CardContent className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                      <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                        {artwork.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
