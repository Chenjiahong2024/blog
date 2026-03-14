# 高端个人博客网站规格文档

## 1. 项目概述

### 项目名称
**DevPortfolio** - 高端个人技术博客与作品展示平台

### 项目定位
- 程序员技术博客
- 个人品牌官网  
- 项目/艺术作品展示平台

### 核心风格
- Apple 风、极简、高级、现代
- 蓝紫渐变主题
- 深色优先，支持暗黑模式切换
- 动画自然流畅、克制高级
- 强调排版、留白、层次感

### 技术栈
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- MDX
- Supabase (Auth + Database)
- Vercel 部署

---

## 2. 项目架构

### 2.1 系统架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                       │
├──────────┬──────────┬──────────┬──────────┬──────────┬───────────┤
│  Pages   │Components│  Hooks   │  Utils   │   Types  │  Config  │
│  /app    │/components│ /hooks  │ /lib    │ /types  │ /configs │
└────┬─────┴────┬─────┴────┬─────┴────┬─────┴────┬─────┴────┬────┘
     │          │          │          │          │          │
     ▼          ▼          ▼          ▼          ▼          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Client-Side Rendering                         │
│  - React Context (Theme, Auth, Music Player)                    │
│  - Local Storage (User Preferences)                              │
│  - Service Workers (Offline Support - Future)                   │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API Layer (Next.js Route Handlers)           │
│  - /api/auth/*       - Authentication endpoints                 │
│  - /api/blogs/*      - Blog CRUD operations                     │
│  - /api/projects/*   - Project CRUD operations                  │
│  - /api/artworks/*   - Artwork CRUD operations                   │
│  - /api/comments/*   - Comment/Guestbook operations              │
│  - /api/users/*      - User profile operations                   │
│  - /api/search/*     - Search functionality                      │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Supabase (Backend-as-a-Service)              │
├──────────┬──────────┬──────────┬──────────┬─────────────────────┤
│  Auth    │ Database │ Storage  │ Realtime │ Edge Functions     │
│  Users   │ Tables   │ Assets   │ Subs     │ (if needed)         │
└──────────┴──────────┴──────────┴──────────┴─────────────────────┘
```

### 2.2 数据流架构

```
User Action → React Component → API Route → Supabase → Response → UI Update
     │                                                    │
     └────────────────── Animation ──────────────────────┘
```

### 2.3 状态管理

| 状态类型 | 方案 | 用途 |
|---------|------|------|
| 全局 UI 状态 | React Context | 主题、语言、音乐播放器 |
| 认证状态 | Supabase Auth + Context | 用户登录状态 |
| 服务端状态 | React Query / SWR | 博客、作品等数据 |
| 本地状态 | useState/useReducer | 表单、交互状态 |

---

## 3. 页面结构

### 3.1 页面清单

| 路径 | 页面名称 | 描述 | 路由方式 |
|------|---------|------|---------|
| `/` | 首页 | 品牌展示 + 最新内容 + 作品预览 | 静态/ISR |
| `/blog` | 博客列表 | 技术文章列表 + 筛选 | 静态/ISR |
| `/blog/[slug]` | 博客详情 | MDX 文章渲染 + 目录 | ISR |
| `/projects` | 项目作品 | 软件项目展示 | 静态/ISR |
| `/projects/[slug]` | 项目详情 | 项目介绍 + 链接 | ISR |
| `/artworks` | 艺术作品 | 摄影/绘画/设计 | 静态/ISR |
| `/artworks/[slug]` | 作品详情 | 作品展示 + 详情 | ISR |
| `/about` | 关于我 | 个人简介 + 技能 | 静态 |
| `/contact` | 联系我 | 联系表单 | 客户端 |
| `/guestbook` | 留言板 | 访客留言 | 动态 |
| `/login` | 登录 | 用户登录 | 客户端 |
| `/register` | 注册 | 用户注册 | 客户端 |
| `/profile` | 个人资料 | 用户信息管理 | 动态 |
| `/admin` | 管理后台 | 内容管理 (预留) | 动态 |

### 3.2 页面布局变体

```
┌─────────────────────────────────────────────────────────────────┐
│                        Main Layout                              │
│  ┌─────────────┐  ┌─────────────────────────────────────────┐  │
│  │  Sidebar    │  │              Content Area               │  │
│  │  (Desktop)  │  │                                         │  │
│  │             │  │  ┌───────────────────────────────────┐  │  │
│  │  - Logo     │  │  │         Page Header               │  │  │
│  │  - Nav      │  │  ├───────────────────────────────────┤  │  │
│  │  - Social   │  │  │                                   │  │  │
│  │  - Music    │  │  │         Main Content              │  │  │
│  │             │  │  │                                   │  │  │
│  │             │  │  │                                   │  │  │
│  │             │  │  └───────────────────────────────────┘  │  │
│  └─────────────┘  └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 响应式断点

| 断点 | 宽度 | 布局 |
|------|------|------|
| sm | 640px | 单列，移动端优化 |
| md | 768px | 双列，侧边栏折叠 |
| lg | 1024px | 标准三列布局 |
| xl | 1280px | 宽屏布局 |
| 2xl | 1536px | 超宽屏布局 |

---

## 4. 目录结构

```
blog/
├── .env.local.example          # 环境变量示例
├── .gitignore
├── next.config.js              # Next.js 配置
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts          # Tailwind 配置
├── tsconfig.json
├── README.md
├── components.json              # shadcn 配置
│
├── public/
│   ├── fonts/                   # 自定义字体
│   ├── images/                  # 静态图片
│   ├── icons/                   # SVG 图标
│   └── music/                   # 背景音乐
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (main)/
│   │   │   ├── layout.tsx       # 主布局
│   │   │   ├── page.tsx         # 首页
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── guestbook/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── admin/           # 管理后台 (预留)
│   │   │       └── page.tsx
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx         # 博客列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # 博客详情
│   │   │
│   │   ├── projects/
│   │   │   ├── page.tsx         # 项目列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # 项目详情
│   │   │
│   │   ├── artworks/
│   │   │   ├── page.tsx         # 艺术作品列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # 艺术作品详情
│   │   │
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── callback/
│   │   │   │       └── route.ts
│   │   │   ├── blogs/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── comments/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── guestbook/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── search/
│   │   │   │   └── route.ts
│   │   │   └── upload/
│   │   │       └── route.ts
│   │   │
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── ui/                   # shadcn/ui 组件
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── progress.tsx
│   │   │   └── switch.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   └── reading-progress.tsx
│   │   │
│   │   ├── features/
│   │   │   ├── music-player.tsx
│   │   │   ├── particle-background.tsx
│   │   │   ├── search-modal.tsx
│   │   │   ├── table-of-contents.tsx
│   │   │   ├── tag-filter.tsx
│   │   │   └── comment-section.tsx
│   │   │
│   │   ├── blog/
│   │   │   ├── blog-card.tsx
│   │   │   ├── blog-list.tsx
│   │   │   ├── blog-header.tsx
│   │   │   ├── blog-toc.tsx
│   │   │   ├── mdx-components.tsx
│   │   │   └── code-block.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── project-card.tsx
│   │   │   ├── project-list.tsx
│   │   │   └── project-gallery.tsx
│   │   │
│   │   ├── artworks/
│   │   │   ├── artwork-card.tsx
│   │   │   ├── artwork-gallery.tsx
│   │   │   ├── artwork-lightbox.tsx
│   │   │   └── artwork-filter.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   ├── user-menu.tsx
│   │   │   └── auth-provider.tsx
│   │   │
│   │   └── shared/
│   │       ├── animated-text.tsx
│   │       ├── fade-in.tsx
│   │       ├── slide-up.tsx
│   │       ├── hover-card.tsx
│   │       ├── lazy-image.tsx
│   │       ├── scroll-reveal.tsx
│   │       └── page-transition.tsx
│   │
│   ├── content/
│   │   ├── blogs/               # MDX 博客文章
│   │   │   ├── hello-world.mdx
│   │   │   └── ...
│   │   └── projects/            # 项目描述 (可选 MDX)
│   │
│   ├── hooks/
│   │   ├── use-theme.ts
│   │   ├── use-auth.ts
│   │   ├── use-scroll.ts
│   │   ├── use-media-query.ts
│   │   ├── use-local-storage.ts
│   │   ├── use-debounce.ts
│   │   └── use-intersection.ts
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Supabase 客户端
│   │   │   ├── server.ts       # SSR 用 Supabase 客户端
│   │   │   └── types.ts        # Supabase 类型定义
│   │   │
│   │   ├── utils.ts            # 通用工具函数
│   │   ├── cn.ts              # classnames 工具
│   │   ├── mdx.ts             # MDX 处理
│   │   ├── seo.ts             # SEO 工具
│   │   └── constants.ts       # 常量定义
│   │
│   ├── types/
│   │   ├── index.ts           # 全局类型定义
│   │   ├── blog.ts
│   │   ├── project.ts
│   │   ├── artwork.ts
│   │   ├── user.ts
│   │   └── comment.ts
│   │
│   └── styles/
│       └── gradients.ts       # 渐变样式定义
│
├── supabase/
│   └── migrations/            # 数据库迁移文件
│
└── .cursor/
    └── rules/                  # Cursor 规则
```

---

## 5. 数据库设计

### 5.1 数据模型概览

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│     profiles     │     │      blogs       │     │    comments      │
├──────────────────┤     ├──────────────────┤     ├──────────────────┤
│ id (UUID, PK)    │     │ id (UUID, PK)    │     │ id (UUID, PK)    │
│ username (UNIQUE)│────▶│ author_id (FK)   │     │ user_id (FK)      │
│ email (UNIQUE)   │     │ title            │     │ target_type       │
│ full_name        │     │ slug (UNIQUE)    │     │ target_id         │
│ avatar_url       │     │ content (MDX)    │     │ content           │
│ bio              │     │ excerpt          │     │ parent_id         │
│ website          │     │ cover_image      │     │ created_at        │
│ github           │     │ tags             │     │ updated_at        │
│ twitter          │     │ category         │     │ is_approved       │
│ linkedin         │     │ published        │     └────────┬─────────┘
│ skills           │     │ published_at     │              │
│ is_admin         │     │ created_at       │              │
│ created_at       │     │ updated_at       │              │
│ updated_at       │     │ views (default 0)│              │
└──────────────────┘     │ likes (default 0)│              │
                         └──────────────────┘              │
                         ┌──────────────────┐              │
                         │     projects     │              │
                         ├──────────────────┤              │
                         │ id (UUID, PK)    │              │
                         │ title            │              │
                         │ slug (UNIQUE)    │              │
                         │ description      │              │
                         │ content (MDX)    │              │
                         │ cover_image      │              │
                         │ tech_stack []    │              │
                         │ github_url       │              │
                         │ demo_url         │              │
                         │ featured         │              │
                         │ order            │              │
                         │ created_at       │              │
                         │ updated_at       │              │
                         └──────────────────┘              │
                         ┌──────────────────┐              │
                         │    artworks      │              │
                         ├──────────────────┤              │
                         │ id (UUID, PK)    │              │
                         │ title            │              │
                         │ slug (UNIQUE)    │              │
                         │ description      │              │
                         │ type (enum)      │              │
                         │ image_url        │              │
                         │ thumbnail_url    │              │
                         │ metadata (JSON)  │              │
                         │ featured         │              │
                         │ order            │              │
                         │ created_at       │              │
                         │ updated_at       │              │
                         └──────────────────┘              │
                         ┌──────────────────┐
                         │   guestbook      │
                         ├──────────────────┤
                         │ id (UUID, PK)    │
                         │ user_id (FK)     │
                         │ content          │
                         │ is_approved      │
                         │ created_at       │
                         └──────────────────┘
```

### 5.2 详细表结构

#### 5.2.1 profiles (用户资料表)

```sql
-- 用户资料扩展表
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  github TEXT,
  twitter TEXT,
  linkedin TEXT,
  skills TEXT[],  -- 数组类型存储技能
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 策略
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 用户可以读取所有资料
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- 用户可以更新自己的资料
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 仅管理员可以更新所有资料
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );
```

#### 5.2.2 blogs (博客文章表)

```sql
-- 博客文章表
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,  -- MDX 内容
  excerpt TEXT,
  cover_image TEXT,
  tags TEXT[],  -- 标签数组
  category TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  reading_time INTEGER,  -- 阅读时间（分钟）
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_blogs_published ON blogs(published) WHERE published = true;
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_author ON blogs(author_id);
CREATE INDEX idx_blogs_tags ON blogs USING GIN(tags);
CREATE INDEX idx_blogs_category ON blogs(category);

-- RLS 策略
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- 所有人都可以读取已发布的博客
CREATE POLICY "Published blogs are viewable by everyone"
  ON blogs FOR SELECT
  USING (published = true OR author_id = auth.uid());

-- 仅作者和管理员可以创建/更新
CREATE POLICY "Users can create blogs"
  ON blogs FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own blogs"
  ON blogs FOR UPDATE
  USING (author_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
```

#### 5.2.3 projects (项目作品表)

```sql
-- 项目作品表
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT,  -- 可选的详细描述
  cover_image TEXT,
  tech_stack TEXT[],  -- 技术栈数组
  github_url TEXT,
  demo_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = true;

-- RLS 策略
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT USING (true);

CREATE POLICY "Owner can manage projects"
  ON projects FOR ALL
  USING (owner_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
```

#### 5.2.4 artworks (艺术作品表)

```sql
-- 艺术作品表
CREATE TYPE artwork_type AS ENUM ('photography', 'painting', 'design', 'illustration', 'other');

-- 艺术作品表
CREATE TABLE artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  type artwork_type NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  metadata JSONB,  -- 存储额外信息: 相机型号, 画材, 尺寸等
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_artworks_slug ON artworks(slug);
CREATE INDEX idx_artworks_type ON artworks(type);
CREATE INDEX idx_artworks_featured ON artworks(featured) WHERE featured = true;

-- RLS 策略
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artworks are viewable by everyone"
  ON artworks FOR SELECT USING (true);

CREATE POLICY "Owner can manage artworks"
  ON artworks FOR ALL
  USING (owner_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
```

#### 5.2.5 comments (评论系统)

```sql
-- 评论表 (通用评论系统)
CREATE TYPE comment_target_type AS ENUM ('blog', 'project', 'artwork');

CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_type comment_target_type NOT NULL,
  target_id UUID NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,  -- 用于回复
  is_approved BOOLEAN DEFAULT true,  -- 需要审核时设为 false
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_comments_target ON comments(target_type, target_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);

-- RLS 策略
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved comments"
  ON comments FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
```

#### 5.2.6 guestbook (留言板)

```sql
-- 留言板表
CREATE TABLE guestbook (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,  -- 允许匿名留言
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_guestbook_approved ON guestbook(is_approved) WHERE is_approved = true;

-- RLS 策略
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved guestbook entries"
  ON guestbook FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Authenticated users can create guestbook entries"
  ON guestbook FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);  -- 也允许匿名

CREATE POLICY "Admins can manage guestbook"
  ON guestbook FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
```

### 5.3 存储桶配置

```sql
-- 创建存储桶
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('avatars', 'avatars', true),
  ('covers', 'covers', true),
  ('artworks', 'artworks', true);

-- 存储策略
-- Avatars
CREATE POLICY "Avatar images are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid() = (storage.foldername(name))[1]::uuid);

-- Covers (博客/项目封面)
CREATE POLICY "Cover images are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'covers');

CREATE POLICY "Authenticated users can upload covers"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'covers' AND auth.role() = 'authenticated');

-- Artworks
CREATE POLICY "Artworks are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'artworks');

CREATE POLICY "Authenticated users can upload artworks"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'artworks' AND auth.role() = 'authenticated');
```

---

## 6. 认证方案

### 6.1 认证流程

```
┌─────────────────────────────────────────────────────────────────┐
│                      Authentication Flow                        │
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Login   │───▶│ Supabase │───▶│  Verify  │───▶│  Create  │  │
│  │  Page    │    │   Auth   │    │  Token   │    │  Profile │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│       │                                                 │        │
│       │    ┌──────────┐    ┌──────────┐               │        │
│       └───▶│ Register │───▶│   Send   │───────────────┘        │
│            │   Page   │    │  Email   │                        │
│            └──────────┘    └──────────┘                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Supabase Auth 配置

支持的认证方式：
1. **邮箱/密码** - 传统注册登录
2. **GitHub OAuth** - 通过 GitHub 登录
3. **Google OAuth** - 通过 Google 登录 (可选)

### 6.3 认证相关 API

```typescript
// 登录
POST /api/auth/login
Body: { email: string, password: string }

// 注册
POST /api/auth/register
Body: { email: string, password: string, username: string }

// OAuth 登录
GET /api/auth/github
GET /api/auth/google

// 登出
POST /api/auth/logout

// 获取当前用户
GET /api/auth/me

// 更新资料
PUT /api/auth/profile
Body: { username: string, full_name: string, bio: string, ... }
```

### 6.4 客户端认证 Hook

```typescript
// useAuth hook 返回值
interface UseAuthResult {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}
```

---

## 7. 评论/留言/评价功能实现

### 7.1 功能架构

```
┌─────────────────────────────────────────────────────────────────┐
│                    Comment/Guestbook System                      │
│                                                                  │
│  ┌──────────────────┐    ┌──────────────────────────────────┐  │
│  │   Comment Type   │    │         Data Flow                 │  │
│  ├──────────────────┤    ├──────────────────────────────────┤  │
│  │ Blog Comments    │───▶│ User posts comment               │  │
│  │ Project Comments │    │     ↓                            │  │
│  │ Artwork Comments │    │ Server validates & saves         │  │
│  │ Guestbook        │    │     ↓                            │  │
│  │ Reviews (Rating) │    │ RLS checks permissions            │  │
│  └──────────────────┘    │     ↓                            │  │
│                          │ Return comment + notify (opt)     │  │
│  ┌──────────────────┘    └──────────────────────────────────┘  │
│  │   Rating System   │                                          │
│  ├──────────────────┤    ┌──────────────────────────────────┐  │
│  │ 5-star rating    │    │ Approval Flow (Admin)            │  │
│  │ Like/like count  │    ├──────────────────────────────────┤  │
│  │ Reaction (emoji) │    │ 1. User submits → is_approved   │  │
│  └──────────────────┘    │    = false (if moderation on)    │  │
│                          │ 2. Admin reviews                 │  │
│                          │ 3. Set is_approved = true       │  │
│                          │ 4. Comment becomes visible       │  │
│                          └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 评论数据结构

```typescript
interface Comment {
  id: string;
  user_id: string;
  user?: Profile;  // 关联的用户资料
  target_type: 'blog' | 'project' | 'artwork';
  target_id: string;
  content: string;
  parent_id?: string;  // 回复的评论
  replies?: Comment[];  // 子评论
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

interface GuestbookEntry {
  id: string;
  user_id?: string;
  user?: Profile;  // 可选的关联用户
  content: string;
  is_approved: boolean;
  created_at: string;
}
```

### 7.3 评论 API

```typescript
// 获取评论列表
GET /api/comments?target_type=blog&target_id={id}&page=1&limit=20

// 创建评论
POST /api/comments
Body: {
  target_type: 'blog' | 'project' | 'artwork',
  target_id: string,
  content: string,
  parent_id?: string  // 回复
}

// 删除评论
DELETE /api/comments/[id]

// 获取留言板
GET /api/guestbook?page=1&limit=20

// 创建留言
POST /api/guestbook
Body: { content: string }

// 审核留言 (管理员)
PUT /api/guestbook/[id]/approve
PUT /api/guestbook/[id]/reject
```

### 7.4 前端组件

- `CommentSection` - 评论区域容器
- `CommentList` - 评论列表
- `CommentItem` - 单条评论
- `CommentForm` - 评论表单
- `Guestbook` - 留言板组件
- `GuestbookEntry` - 留言条目
- `Rating` - 星级评分组件
- `ReactionButton` - 点赞/反应按钮

---

## 8. 动画实现方案

### 8.1 动画策略

| 动画类型 | 库/方案 | 使用场景 |
|---------|---------|---------|
| 页面过渡 | Framer Motion + AnimatePresence | 路由切换 |
| 滚动动画 | Framer Motion + useScroll | 视差、reveal |
| 悬浮效果 | CSS + Framer Motion | 按钮、卡片 |
| 序列动画 | Framer Motion variants | 首页介绍文字 |
| 粒子背景 | Canvas + requestAnimationFrame | 背景装饰 |
| 进度条 | Framer Motion | 阅读进度 |

### 8.2 动画组件

```typescript
// PageTransition - 页面过渡
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
</AnimatePresence>

// ScrollReveal - 滚动揭示
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>

// HoverCard - 悬浮卡片
<motion.div
  whileHover={{ scale: 1.02, y: -5 }}
  transition={{ type: "spring", stiffness: 300 }}
>
```

### 8.3 粒子背景

```typescript
// 粒子配置
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

// 配置
const PARTICLE_CONFIG = {
  count: 50,
  connectDistance: 150,
  mouseDistance: 200,
  colors: ['#6366f1', '#8b5cf6', '#a855f7', '#3b82f6'],
  speed: 0.5,
};
```

---

## 9. 核心组件设计

### 9.1 布局组件

1. **Navbar** - 顶部导航栏
   - Logo
   - 导航链接
   - 搜索按钮
   - 主题切换
   - 音乐播放器控制
   - 用户菜单 (登录/注册/头像)

2. **Sidebar** - 侧边栏 (桌面端)
   - 紧凑版导航
   - 社交链接
   - 快速链接

3. **Footer** - 页脚
   - 版权信息
   - 社交链接
   - 快速链接
   - RSS 订阅

### 9.2 功能组件

1. **MusicPlayer** - 音乐播放器
   - 播放/暂停
   - 上一首/下一首
   - 进度条
   - 音量控制
   - 播放列表

2. **SearchModal** - 搜索弹窗
   - 实时搜索
   - 分类筛选
   - 快捷键 Cmd+K 打开

3. **ReadingProgress** - 阅读进度条
   - 顶部固定
   - 渐变进度

4. **TableOfContents** - 目录导航
   - 自动生成
   - 滚动高亮
   - 悬浮侧边栏

### 9.3 UI 组件 (shadcn/ui)

基于 shadcn/ui 的组件：
- Button, IconButton
- Card, CardHeader, CardContent
- Input, Textarea
- Dialog, Modal
- DropdownMenu
- Select
- Tabs
- Toast
- Avatar
- Badge
- Skeleton
- Separator
- Progress
- Switch
- Checkbox
- Radio

---

## 10. SEO 优化

### 10.1 元数据配置

```typescript
// 每个页面配置
export const metadata: Metadata = {
  title: {
    default: 'DevPortfolio - 高端个人技术博客',
    template: '%s | DevPortfolio',
  },
  description: '程序员技术博客 | 项目作品展示 | 艺术作品集',
  keywords: ['博客', '技术', '编程', '作品集', '摄影'],
  authors: [{ name: 'Your Name', url: 'https://yoursite.com' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://yoursite.com',
    siteName: 'DevPortfolio',
    title: 'DevPortfolio',
    description: '...',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevPortfolio',
    description: '...',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 10.2 结构化数据

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "url": "https://yoursite.com",
  "sameAs": [
    "https://github.com/yourusername",
    "https://twitter.com/yourusername"
  ],
  "jobTitle": "Software Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "Company Name"
  }
}
```

---

## 11. 部署方案

### 11.1 Vercel 部署配置

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "next dev"
}
```

### 11.2 环境变量

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OAuth (可选)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# 网站
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=DevPortfolio
```

### 11.3 部署步骤

1. **GitHub Push**: 将代码推送到 GitHub
2. **Vercel Import**: 在 Vercel 导入项目
3. **环境变量配置**: 设置所有环境变量
4. **数据库迁移**: 运行 Supabase 迁移
5. **部署完成**: Vercel 自动构建和部署

### 11.4 性能优化

- **图片优化**: next/image
- **字体优化**: next/font
- **代码分割**: 自动路由分割
- **预渲染**: ISR/SSG
- **缓存策略**: 合理的缓存头
- **CDN**: Vercel Edge Network

---

## 12. 开发规范

### 12.1 代码风格

- TypeScript 严格模式
- ESLint + Prettier
- 组件文件命名: `ComponentName.tsx`
- 工具函数: `useCamelCase.ts`
- 样式: Tailwind CSS + CSS 变量

### 12.2 Git 提交规范

```
feat: 新功能
fix: Bug 修复
docs: 文档更新
style: 样式调整
refactor: 代码重构
test: 测试相关
chore: 构建/工具
```

### 12.3 组件开发规范

1. 组件必须有 TypeScript 类型
2. 公共组件放在 `components/shared`
3. 页面特定组件放在 `components/[feature]`
4. 使用 Framer Motion 处理动画
5. 使用 Tailwind CSS 处理样式

---

## 13. 总结

本规格文档涵盖了:

1. ✅ 项目架构 - 系统设计、数据流、状态管理
2. ✅ 页面结构 - 完整页面清单和路由
3. ✅ 目录结构 - 标准化项目结构
4. ✅ 数据库设计 - Supabase 表结构和 RLS
5. ✅ 认证方案 - Supabase Auth + OAuth
6. ✅ 评论/留言系统 - 完整的数据模型和 API
7. ✅ 动画方案 - Framer Motion 实现
8. ✅ 组件设计 - 核心组件和 UI 组件
9. ✅ SEO 优化 - 元数据和结构化数据
10. ✅ 部署方案 - Vercel 部署配置

本项目是一个功能完整的个人博客平台,具有现代化的设计和优秀的用户体验。
