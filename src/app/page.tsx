"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 !-z-10" style={{ zIndex: -10 }}>
        <video
          key="video-background"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: -10 }}
        >
          <source src="/video.MP4" type="video/mp4" />
        </video>
        {/* Fallback background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" style={{ zIndex: -11 }} />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" style={{ zIndex: -9 }} />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mt-20">
            {/* Welcome Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-white drop-shadow-lg">
                欢迎来到
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white drop-shadow-lg">
                CjhScript 的博客
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-lg md:text-xl text-white/80 mb-12 drop-shadow-md"
            >
              程序员 / 设计师 / 创作者
            </motion.p>

            {/* Navigation Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              {[
                { href: "/blog", label: "博客", desc: "技术文章" },
                { href: "/projects", label: "项目", desc: "作品展示" },
                { href: "/artworks", label: "艺术", desc: "摄影绘画" },
                { href: "/about", label: "关于", desc: "个人简介" },
              ].map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <h3 className="text-base font-semibold mb-1 text-white">{item.label}</h3>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button size="lg" asChild className="rounded-full px-8 bg-white text-gray-900 hover:bg-white/90">
                <Link href="/blog">
                  开始阅读
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-white/30 text-white hover:bg-white/10 bg-transparent">
                <Link href="/about">了解更多</Link>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center gap-4"
            >
              <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-6 w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10">
                <Link href="/contact">
                  <Mail className="h-6 w-6" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
            >
              <motion.div className="w-1 h-2 rounded-full bg-white/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quote Card - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="px-6 py-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
          <p className="text-sm md:text-base font-serif italic tracking-wide text-white drop-shadow-lg">
            Shine through the storm, for the dawn is just ahead.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
