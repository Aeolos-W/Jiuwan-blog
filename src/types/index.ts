export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published_at: string;
  updated_at: string;
  author_id: string;
  category_id: string | null;
  tags: string[];
  comment_count: number;
  status: 'published' | 'draft';
  // 关联数据（从 Supabase join 查询返回）
  categories?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  authors?: {
    id: string;
    name: string;
    email: string;
    avatar_url: string | null;
  } | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
}

export interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string | null;
  author_url: string | null;
  content: string;
  created_at: string;
  parent_id: string | null;
  is_approved: boolean;
  // 关联数据
  posts?: {
    title: string;
    slug: string;
  } | null;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface NavItem {
  name: string;
  href: string;
}
