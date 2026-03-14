"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Search, Music, Plus, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/providers/auth-provider";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 判断是否为浅色模式
  const isLight = theme === "light";
  
  // 计算颜色方案：基于主题和滚动状态
  // 深色模式+未滚动 = 白色文字，深色模式+滚动 = 保持深色
  // 浅色模式 = 始终深色
  const getColorScheme = () => {
    if (isLight) {
      return {
        text: "text-gray-800",
        textMuted: "text-gray-600",
        textHover: "hover:text-gray-900",
        activeBg: "bg-gray-200",
        activeText: "text-gray-900",
        tabBg: "bg-black/10",
        tabHoverBg: "hover:bg-black/10",
        tabActiveBg: "bg-gray-300",
      };
    }
    // 深色模式（无论滚动与否都保持深色）
    return {
      text: "text-white",
      textMuted: "text-white/70",
      textHover: "hover:text-white",
      activeBg: "bg-white/20",
      activeText: "text-white",
      tabBg: "bg-black/30",
      tabHoverBg: "hover:bg-white/10",
      tabActiveBg: "bg-white/20",
    };
  };

  const colors = getColorScheme();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500",
        isLight && "bg-white/80 backdrop-blur-md"
      )}
      style={{
        background: isLight ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0) !important',
        boxShadow: 'none',
        borderBottom: 'none',
      }}
    >
      <div className="container mx-auto px-4 relative h-full">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className={cn("text-lg font-semibold", colors.text)}>{SITE_NAME}</span>
          </Link>

          {/* 导航 - 带简洁背景 */}
          <nav className="flex items-center justify-center">
            <div 
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-500",
                isLight ? colors.tabBg : "bg-black/30"
              )}
              style={{
                boxShadow: isLight ? 'inset 0 1px 0 rgba(0,0,0,0.05)' : 'inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link key={item.href} href={item.href} className="relative">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors relative z-10",
                        isActive
                          ? cn(colors.activeBg, colors.activeText, "shadow-sm")
                          : cn(colors.textMuted, colors.textHover, colors.tabHoverBg)
                      )}
                    >
                      <Icon className={cn("h-4 w-4", isActive && "scale-110")} />
                      <span className="text-xs font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-9 w-9", colors.textMuted, colors.textHover)}
            >
              <Search className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn("h-9 w-9", colors.textMuted, colors.textHover)}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-9 w-9", colors.textMuted, colors.textHover)}
            >
              <Music className="h-4 w-4" />
            </Button>

            {/* 未登录显示登录/注册；已登录显示头像。加载中时也先显示按钮，避免空白头像 */}
            {!authLoading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="relative h-8 w-8 rounded-full hover:bg-transparent focus:outline-none flex items-center justify-center"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={profile?.avatar_url || ""} 
                        alt={profile?.username || "用户"} 
                        className="object-cover"
                      />
                      <AvatarFallback className="text-xs">
                        {(profile?.username || user.email?.slice(0, 2) || "用户").slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56" 
                  align="end" 
                  sideOffset={8}
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile?.full_name || profile?.username || "用户"}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">个人资料</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/guestbook">留言板</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild 
                  className={cn("h-9", colors.textMuted, colors.textHover)}
                >
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-1" />
                    登录
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  asChild 
                  className={cn("h-9", isLight ? "bg-gray-800 text-white hover:bg-gray-900" : "bg-white text-gray-900 hover:bg-white/90")}
                >
                  <Link href="/register">
                    <Plus className="h-4 w-4 mr-1" />
                    注册
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
