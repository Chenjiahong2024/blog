"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, Profile } from "@/types";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;

    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        
        if (!isMounted) return;
        
        setUser(user ?? null);
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          
          if (isMounted) {
            setProfile(profile ?? null);
          }
        } else {
          if (isMounted) setProfile(null);
        }
      } catch (error) {
        console.error("Error getting user:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getUser();

    // 超时保护：若 getUser 过久未返回，也结束 loading，避免一直显示占位
    const timeout = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 3000);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!isMounted) return;
        
        setUser(session?.user ?? null);
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          
          if (isMounted) {
            setProfile(profile);
          }
        } else {
          if (isMounted) {
            setProfile(null);
          }
        }
        if (isMounted) {
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
        emailRedirectTo: `${location.origin}/profile`,
      },
    });

    // 如果有错误，直接返回
    if (error) {
      return { error };
    }

    // 检查是否需要邮箱验证
    if (data.user && !data.session) {
      // 需要邮箱验证，返回一个特殊错误来告知前端
      return { 
        error: null, 
        needsEmailConfirmation: true,
        message: "注册成功！请前往邮箱验证后登录" 
      };
    }

    // 不需要邮箱验证（auto-confirm 开启），自动创建 profile
    if (!error && data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        username,
        email,
      });
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    });
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithGithub,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
