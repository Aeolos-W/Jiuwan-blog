# What's new - 陶哲轩风格博客

一个复刻陶哲轩 WordPress 博客风格的现代博客系统，使用 Next.js + Supabase 构建。

## 特性

- **完全复刻**陶哲轩博客的配色、UI和网页逻辑
- **深青色(#006a80)**主题配色，白色背景，简洁学术风格
- **两栏布局**：左侧边栏(200px) + 主内容区(500px)
- **LaTeX 数学公式**支持（KaTeX）
- **评论系统**（带审核功能）
- **RSS 订阅**
- **分类页面**：Career advice, On writing, Books, Applets
- **响应式设计**
- **Supabase 后端**：PostgreSQL 数据库，RLS 安全策略

## 技术栈

- **前端**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **后端**: Supabase (PostgreSQL + 实时订阅)
- **数学渲染**: KaTeX
- **RSS**: rss 库

## 快速开始

### 1. 克隆项目

```bash
cd /workspace/tao-blog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 Supabase

#### 3.1 创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com) 并注册/登录
2. 点击 "New Project" 创建新项目
3. 等待项目初始化完成（约2分钟）

#### 3.2 获取连接信息

进入项目后，在左侧菜单点击 **Project Settings** → **API**，获取：

- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` API key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role secret` API key → `SUPABASE_SERVICE_ROLE_KEY`（仅在服务端使用）

#### 3.3 配置环境变量

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. 初始化数据库

在 Supabase Dashboard 中：

1. 点击左侧菜单 **SQL Editor**
2. 点击 **New query**
3. 复制 `supabase/schema.sql` 的内容粘贴进去
4. 点击 **Run** 执行
5. 再新建一个查询，复制 `supabase/seed.sql` 的内容
6. 点击 **Run** 执行（插入初始数据）

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 6. 构建生产版本

```bash
npm run build
```

## 项目结构

```
tao-blog/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # 首页
│   │   ├── layout.tsx          # 根布局
│   │   ├── about/              # 关于页面
│   │   ├── career-advice/      # 职业建议分类
│   │   ├── on-writing/         # 写作建议分类
│   │   ├── books/              # 书籍页面
│   │   ├── applets/            # 工具页面
│   │   ├── post/[slug]/        # 文章详情页
│   │   ├── category/[slug]/    # 分类页面
│   │   └── api/rss/            # RSS API
│   ├── components/             # React 组件
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── Sidebar.tsx
│   │   ├── PostCard.tsx
│   │   ├── CommentList.tsx
│   │   ├── CommentForm.tsx
│   │   ├── MathRenderer.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── supabase.ts         # Supabase 客户端和 API
│   │   └── utils.ts            # 工具函数
│   └── types/
│       └── index.ts            # TypeScript 类型定义
├── supabase/
│   ├── schema.sql              # 数据库结构
│   └── seed.sql                # 初始数据
├── public/
│   └── banner.svg              # 顶部横幅
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── .env.local.example
```

## 部署到服务器

### 方案一：Docker 部署（推荐）

#### 1. 创建 Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### 2. 构建并运行

```bash
# 构建 Docker 镜像
docker build -t tao-blog .

# 运行容器
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key \
  -e NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  --name tao-blog \
  tao-blog
```

### 方案二：Vercel 部署（最简单）

1. 将代码推送到 GitHub
2. 访问 [https://vercel.com](https://vercel.com)
3. 导入项目
4. 添加环境变量（在 Vercel Dashboard → Settings → Environment Variables）
5. 部署

### 方案三：传统 Linux 服务器部署

#### 前置要求

- Node.js 20+
- PM2（进程管理）
- Nginx（反向代理）

#### 1. 安装 Node.js 和 PM2

```bash
# 安装 Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2
npm install -g pm2
```

#### 2. 上传项目

```bash
# 在服务器上
mkdir -p /var/www/tao-blog
cd /var/www/tao-blog

# 上传代码后
npm install
npm run build
```

#### 3. 配置 PM2

创建 `ecosystem.config.js`：

```javascript
module.exports = {
  apps: [
    {
      name: 'tao-blog',
      cwd: '/var/www/tao-blog',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_SUPABASE_URL: 'https://your-project.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'your-anon-key',
        NEXT_PUBLIC_SITE_URL: 'https://your-domain.com',
      },
    },
  ],
};
```

启动：

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 4. 配置 Nginx

```bash
sudo nano /etc/nginx/sites-available/tao-blog
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/tao-blog /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. 配置 HTTPS（Let's Encrypt）

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 自定义横幅

替换 `public/banner.svg` 为你自己的横幅图片。建议尺寸：720x180 像素。

## 数据库管理

### 添加新文章

直接在 Supabase Dashboard 的 Table Editor 中添加，或通过 SQL：

```sql
INSERT INTO posts (title, slug, content, excerpt, author_id, category_id, tags, status)
VALUES (
  'New Post Title',
  'new-post-title',
  'Post content here...',
  'Excerpt here...',
  'your-author-id',
  'your-category-id',
  ARRAY['tag1', 'tag2'],
  'published'
);
```

### 审核评论

```sql
-- 查看待审核评论
SELECT * FROM comments WHERE is_approved = false;

-- 批准评论
UPDATE comments SET is_approved = true WHERE id = 'comment-id';
```

## 维护

### 更新依赖

```bash
npm update
```

### 重启服务

```bash
# PM2
pm2 restart tao-blog

# Docker
docker restart tao-blog
```

## 许可证

MIT
