"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/components/layout/navbar";
import { useAuth } from "@/components/providers/auth-provider";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: string;
  user_id: string;
  user: { username: string; avatar_url: string };
  content: string;
  position: { x: number; y: number };
  delay: number;
  created_at: string;
}

// 预定义的随机位置（网格分布，避免重叠）
const POSITIONS = [
  { x: 5, y: 20 }, { x: 15, y: 20 }, { x: 25, y: 20 }, { x: 35, y: 20 },
  { x: 5, y: 35 }, { x: 15, y: 35 }, { x: 25, y: 35 }, { x: 35, y: 35 },
  { x: 5, y: 50 }, { x: 15, y: 50 }, { x: 25, y: 50 }, { x: 35, y: 50 },
  { x: 5, y: 65 }, { x: 15, y: 65 }, { x: 25, y: 65 }, { x: 35, y: 65 },
  { x: 5, y: 80 }, { x: 15, y: 80 }, { x: 25, y: 80 }, { x: 35, y: 80 },
  { x: 55, y: 20 }, { x: 65, y: 20 }, { x: 75, y: 20 }, { x: 85, y: 20 },
  { x: 55, y: 35 }, { x: 65, y: 35 }, { x: 75, y: 35 }, { x: 85, y: 35 },
  { x: 55, y: 50 }, { x: 65, y: 50 }, { x: 75, y: 50 }, { x: 85, y: 50 },
  { x: 55, y: 65 }, { x: 65, y: 65 }, { x: 75, y: 65 }, { x: 85, y: 65 },
  { x: 55, y: 80 }, { x: 65, y: 80 }, { x: 75, y: 80 }, { x: 85, y: 80 },
];

export default function GuestbookPage() {
  const { user, profile } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // 获取留言
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;

      // 为每条留言分配位置（循环使用预定义位置）
      const mapped = (data || []).map((msg, index) => ({
        ...msg,
        user: { username: msg.username || "访客", avatar_url: msg.avatar_url || "" },
        position: POSITIONS[index % POSITIONS.length],
        delay: 0,
      }));

      setMessages(mapped);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // 实时订阅留言更新
  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel("guestbook")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          const newMsg = payload.new as any;
          const newMessage: Message = {
            ...newMsg,
            user: { username: newMsg.username || "访客", avatar_url: newMsg.avatar_url || "" },
            position: POSITIONS[Math.floor(Math.random() * POSITIONS.length)],
            delay: 0,
          };
          setMessages((prev) => [newMessage, ...prev].slice(0, 50));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      const { error } = await supabase.from("guestbook").insert({
        user_id: user.id,
        username: profile?.username || "访客",
        avatar_url: profile?.avatar_url || "",
        content: newMessage.trim(),
      });

      if (error) throw error;
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("发送失败，请重试");
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <Navbar />
      
      {/* 背景图片 - 使用渐变作为默认背景 */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        }}
      />
      
      {/* 装饰性光效 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl" />
      </div>

      {/* 弹幕容器 */}
      <div ref={containerRef} className="absolute inset-0 pt-16 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/60">加载中...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/40 text-lg">暂无留言，快来抢沙发吧~</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="absolute animate-float-in"
              style={{
                left: `${message.position.x}%`,
                top: `${message.position.y}%`,
                animationDelay: `${message.delay}s`,
              }}
            >
              <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-default whitespace-nowrap hover:bounce-effect">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={message.user.avatar_url} />
                  <AvatarFallback className="text-xs bg-gradient-to-br from-gray-600 to-gray-800 text-white">
                    {message.user.username?.slice(0, 1) || "游"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700 dark:text-gray-200 max-w-[200px] truncate">
                  {message.content}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 中间输入框 */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: '15%' }}>
        <div className="relative z-10 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <div className={`relative rounded-full transition-all duration-300 ${newMessage.trim() ? 'input-glow active' : 'input-glow'}`}>
              <Input
                type="text"
                placeholder="输入弹幕内容..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className={`w-64 md:w-80 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 rounded-full px-5 pr-12 text-gray-700 dark:text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 hover:scale-105 focus:scale-105`}
              />
            </div>
            <Button 
              type="submit" 
              size="lg"
              className="h-12 px-6 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/30 active:scale-95"
            >
              <Send className="h-5 w-5 mr-2" />
              发射
            </Button>
          </form>
          
          {!user && (
            <div className="text-center mt-4 fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-white/80 text-sm mb-2">登录后即可发送弹幕</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm" className="rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30" asChild>
                  <Link href="/login">登录</Link>
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30" asChild>
                  <Link href="/register">注册</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 样式 */}
      <style jsx global>{`
        @keyframes float-in {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          70% {
            transform: scale(1.1) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-float-in {
          animation: float-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
        
        @keyframes gentle-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        .animate-float-in:hover {
          animation: gentle-float 2s ease-in-out infinite;
        }
        
        @keyframes border-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
          }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        @keyframes flowing-border {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .input-glow {
          position: relative;
          background: linear-gradient(#fff 0 0) padding-box, linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6, #ec4899) border-box;
          border: 2px solid transparent;
          background-size: 100% 100%, 300% 100%;
          transition: all 0.3s ease;
        }
        
        .input-glow.active {
          animation: flowing-border 2s linear infinite;
        }
        
        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-5px) scale(1.02);
        }
      `}</style>
    </div>
  );
}
