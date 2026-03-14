"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Camera, Save, User, Link as LinkIcon, Github, Twitter, Globe, SkipForward, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/features/particle-background";
import { FadeIn, SlideUp } from "@/components/shared/page-transition";
import { useAuth } from "@/components/providers/auth-provider";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSetup = searchParams.get("setup") === "true";
  
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // 检查是否是新用户（没有资料）
  const isNewUser = user && (!profile?.username || profile?.username.length === 0);

  // Form state
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check auth - 未登录时跳转到登录页
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Load existing profile data
  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setFullName(profile.full_name || "");
      setBio(profile.bio || "");
      setWebsite(profile.website || "");
      setGithub(profile.github || "");
      setTwitter(profile.twitter || "");
      setSkills(profile.skills || []);
    }
  }, [profile]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("请选择图片文件");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("图片大小不能超过 2MB");
      return;
    }

    setError("");
    setAvatarFile(file);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !user) return null;

    setUploadingAvatar(true);
    try {
      const supabase = createClient();

      // Generate unique filename
      const fileExt = avatarFile.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, { upsert: true });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error("Avatar upload error:", err);
      setError("头像上传失败，请重试");
      return null;
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSkip = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      await supabase.from("profiles").upsert({
        id: user?.id,
        username: username.trim() || `user_${user?.id?.slice(0, 8)}`,
        email: user?.email,
        updated_at: new Date().toISOString(),
      });
      router.push("/");
    } catch (err) {
      router.push("/");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    if (!username.trim()) {
      setError("用户名不能为空");
      setSaving(false);
      return;
    }

    try {
      const supabase = createClient();

      // 先上传头像（如果有选择新头像）
      let avatarUrl = profile?.avatar_url;
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar();
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .upsert({
          id: user?.id,
          username: username.trim(),
          full_name: fullName.trim(),
          bio: bio.trim(),
          website: website.trim(),
          github: github.trim(),
          twitter: twitter.trim(),
          skills: skills,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess(true);
        if (isNewUser || isSetup) {
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        }
      }
    } catch (err) {
      setError("保存时发生错误");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ParticleBackground />

      {/* Header */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-background to-gray-100 -z-[1]" />
        <div className="container mx-auto px-4 relative z-10">
          <SlideUp>
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="gradient-text">
                  {isNewUser ? "欢迎加入！" : "个人资料"}
                </span>
              </h1>
              <p className="text-muted-foreground">
                {isNewUser ? "完善你的个人资料，让别人更好地了解你" : "更新你的个人信息"}
              </p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Profile Form */}
      <section className="py-8 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <form onSubmit={handleSubmit}>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      基本信息
                    </CardTitle>
                    <CardDescription>
                      {isNewUser ? "这是你首次登录，让我们认识一下" : "编辑你的基本信息"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage 
                            src={avatarPreview || profile?.avatar_url || ""} 
                            alt={username}
                          />
                          <AvatarFallback className="text-2xl">
                            {username ? username.slice(0, 2).toUpperCase() : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingAvatar}
                        >
                          {uploadingAvatar ? (
                            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Camera className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/30 rounded-md">
                        {error}
                      </div>
                    )}

                    {success && (
                      <div className="p-3 text-sm text-green-500 bg-green-50 dark:bg-green-950/30 rounded-md">
                        {isNewUser ? "保存成功！正在跳转..." : "保存成功！"}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">用户名 *</Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="yourname"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">显示名称</Label>
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="你的名字"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">个人简介</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="介绍一下你自己..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LinkIcon className="h-5 w-5" />
                      社交链接（可选）
                    </CardTitle>
                    <CardDescription>
                      让别人可以找到你的其他社交账号
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">
                        <Globe className="h-4 w-4 inline mr-1" />
                        个人网站
                      </Label>
                      <Input
                        id="website"
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://yoursite.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="github">
                          <Github className="h-4 w-4 inline mr-1" />
                          GitHub
                        </Label>
                        <Input
                          id="github"
                          value={github}
                          onChange={(e) => setGithub(e.target.value)}
                          placeholder="username"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter">
                          <Twitter className="h-4 w-4 inline mr-1" />
                          Twitter
                        </Label>
                        <Input
                          id="twitter"
                          value={twitter}
                          onChange={(e) => setTwitter(e.target.value)}
                          placeholder="@username"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 mt-6">
                  <CardHeader>
                    <CardTitle>技能标签（可选）</CardTitle>
                    <CardDescription>
                      添加你的技能标签，方便别人了解你的专长
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="添加技能..."
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                      />
                      <Button type="button" onClick={handleAddSkill} variant="outline">
                        添加
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveSkill(skill)}>
                          {skill} ×
                        </Badge>
                      ))}
                      {skills.length === 0 && (
                        <span className="text-sm text-muted-foreground">暂无技能标签</span>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between gap-4 mt-6">
                  <div className="flex gap-2">
                    {isNewUser && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleSkip}
                        disabled={saving}
                      >
                        <SkipForward className="mr-2 h-4 w-4" />
                        跳过
                      </Button>
                    )}
                    {!isNewUser && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        退出登录
                      </Button>
                    )}
                  </div>
                  <Button type="submit" disabled={saving} className="min-w-[120px]">
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "保存中..." : "保存"}
                  </Button>
                </div>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
