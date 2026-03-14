# DevPortfolio

高端个人技术博客与作品展示平台

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- MDX
- Supabase (Auth + Database)
- Vercel 部署

## 开始

```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 环境变量

复制 `.env.local.example` 到 `.env.local` 并配置:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**部署到 Vercel 时**：在 Vercel 项目 Settings → Environment Variables 中添加上述变量。

## 项目结构

```
src/
├── app/           # Next.js App Router
├── components/   # React 组件
├── hooks/        # 自定义 Hooks
├── lib/          # 工具函数
└── types/        # TypeScript 类型
```

## 部署

### 方式一：推送 GitHub 后在 Vercel 部署（推荐）

1. **推送代码到 GitHub**
   ```bash
   # 初始化 Git（如果还没有）
   git init

   # 添加所有文件
   git add .

   # 提交
   git commit -m "Initial commit"

   # 创建 GitHub 仓库并推送
   # （在 GitHub 网站上创建空仓库，然后）
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git branch -M main
   git push -u origin main
   ```

2. **在 Vercel 部署**
   - 访问 [vercel.com](https://vercel.com)，用 GitHub 登录
   - 点击 "Add New..." → "Project"
   - 选择刚才推送的仓库
   - 点击 "Deploy"

### 方式二：Vercel CLI 本地部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

### 域名绑定

部署完成后绑定自定义域名：

1. **购买域名**
   - 可以在 [GoDaddy](https://www.godaddy.com)、[Namecheap](https://www.namecheap.com)、[腾讯云](https://cloud.tencent.com)、[阿里云](https://www.aliyun.com) 等平台购买
   - 推荐选择 `.com`、`.cn`、`.site` 等常见后缀

2. **在 Vercel 绑定域名**
   - 进入 Vercel 项目 → Settings → Domains
   - 输入你的域名，点击 "Add"
   - 按提示配置 DNS 解析

3. **配置 DNS（以阿里云/腾讯云为例）**
   | 记录类型 | 主机记录 | 记录值 |
   |---------|---------|-------|
   | CNAME | @ | cname.vercel-dns.com |
   | CNAME | www | cname.vercel-dns.com |

4. **等待生效**（通常几分钟到 24 小时）

### 部署注意事项

- `.env.local` 中的环境变量需要在 Vercel 项目设置中重新配置
- 首次部署后，每次推送到 GitHub 会自动触发重新部署
