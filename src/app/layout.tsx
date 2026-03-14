import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
});

export const metadata: Metadata = {
  title: {
    default: "DevPortfolio - 高端个人技术博客",
    template: "%s | DevPortfolio",
  },
  description: "程序员技术博客 | 项目作品展示 | 艺术作品集",
  keywords: ["博客", "技术", "编程", "作品集", "摄影", "设计", "前端", "后端"],
  authors: [{ name: "Developer", url: "https://yoursite.com" }],
  creator: "Developer",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://yoursite.com",
    siteName: "DevPortfolio",
    title: "DevPortfolio - 高端个人技术博客",
    description: "程序员技术博客 | 项目作品展示 | 艺术作品集",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevPortfolio",
    description: "程序员技术博客 | 项目作品展示 | 艺术作品集",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansSC.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
