"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    if (password.length < 6) {
      setError("密码长度至少为 6 位");
      return;
    }

    if (username.length < 2) {
      setError("用户名至少需要 2 个字符");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(email, password, username);
      
      if (result.error) {
        setError(result.error.message);
      } else if (result.needsEmailConfirmation) {
        // 需要邮箱验证
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        // 不需要邮箱验证，直接跳转到资料完善页面
        router.push("/profile?setup=true");
      }
    } catch (err) {
      setError("注册时发生错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-background to-gray-100" />

      <Card className="w-full max-w-md relative z-10 border-border/50">
        {/* 返回按钮 */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回
        </Button>

        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">注册</CardTitle>
          <CardDescription>
            创建一个新账号
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {success ? (
            <div className="p-4 text-sm text-green-600 bg-green-50 dark:bg-green-950/30 rounded-md text-center">
              注册成功！请前往邮箱验证后登录，页面将自动跳转...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/30 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                type="text"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "注册中..." : "注册"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm text-muted-foreground">
            已有账号?{" "}
            <Link href="/login" className="text-primary hover:underline">
              登录
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
