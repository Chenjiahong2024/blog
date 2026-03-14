import { Mail, MapPin, Send, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/features/particle-background";
import { FadeIn, SlideUp, ScrollReveal } from "@/components/shared/page-transition";

export default function ContactPage() {
  const contactInfo = [
    { icon: Mail, label: "邮箱", value: "hello@example.com", href: "mailto:hello@example.com" },
    { icon: MapPin, label: "位置", value: "中国 · 广东", href: "" },
    { icon: Github, label: "GitHub", value: "github.com/yourname", href: "https://github.com" },
    { icon: Twitter, label: "Twitter", value: "@yourname", href: "https://twitter.com" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/yourname", href: "https://linkedin.com" },
  ];

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
                <span className="gradient-text">联系我</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                有任何问题或合作意向，欢迎随时联系我
              </p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <ScrollReveal>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">联系方式</h2>
                    <p className="text-muted-foreground">
                      你可以通过以下方式联系我，我会尽快回复你。
                    </p>
                  </div>

                  <div className="space-y-4">
                    {contactInfo.map((info, i) => (
                      <FadeIn key={info.label} delay={i * 0.1}>
                        <Card className="border-border/50 hover:border-primary/30 transition-colors">
                          <CardContent className="p-4 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <info.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{info.label}</p>
                              {info.href ? (
                                <a
                                  href={info.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium hover:text-primary transition-colors"
                                >
                                  {info.value}
                                </a>
                              ) : (
                                <p className="font-medium">{info.value}</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Contact Form */}
              <ScrollReveal delay={0.2}>
                <Card className="border-border/50">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-semibold mb-6">发送消息</h2>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            姓名
                          </label>
                          <Input id="name" placeholder="你的姓名" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            邮箱
                          </label>
                          <Input id="email" type="email" placeholder="your@email.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          主题
                        </label>
                        <Input id="subject" placeholder="邮件主题" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          消息内容
                        </label>
                        <Textarea
                          id="message"
                          placeholder="写下你想说的话..."
                          className="min-h-[150px]"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        发送消息
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-border/50 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">地图占位</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
