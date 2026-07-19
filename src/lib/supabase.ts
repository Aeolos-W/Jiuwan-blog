import { createClient } from '@supabase/supabase-js';
import { Post, Category, Comment, Author, Tag } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  global: {
    fetch: (input: RequestInfo | URL, init?: RequestInit) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);
      return fetch(input, { ...init, signal: controller.signal })
        .finally(() => clearTimeout(timeout));
    },
  },
});

// Posts
export async function getPosts(
  categorySlug?: string,
  limit: number = 10,
  offset: number = 0
): Promise<Post[]> {
  try {
    let query = supabase
      .from('posts')
      .select(`
        *,
        categories!posts_category_id_fkey(*),
        authors!posts_author_id_fkey(*)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (categorySlug) {
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();
      
      if (category) {
        query = query.eq('category_id', category.id);
      }
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('getPosts error:', e);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories!posts_category_id_fkey(*),
        authors!posts_author_id_fkey(*)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) return null;
    return data;
  } catch (e) {
    console.error('getPostBySlug error:', e);
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('slug')
      .eq('status', 'published');

    if (error) throw error;
    return data?.map((p) => p.slug) || [];
  } catch (e) {
    console.error('getAllSlugs error:', e);
    return [];
  }
}

// Top Posts (by comment count)
export async function getTopPosts(limit: number = 5): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories!posts_category_id_fkey(*),
        authors!posts_author_id_fkey(*)
      `)
      .eq('status', 'published')
      .order('comment_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('getTopPosts error:', e);
    return [];
  }
}

// Archives by month
export interface ArchiveMonth {
  year: number;
  month: number;
  month_name: string;
  count: number;
}

export async function getArchives(): Promise<ArchiveMonth[]> {
  try {
    const { data, error } = await supabase
      .rpc('get_archive_months');

    if (error) {
      // Fallback if RPC doesn't exist
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (postsError) throw postsError;

      const archiveMap = new Map<string, ArchiveMonth>();
      posts?.forEach((post: any) => {
        const date = new Date(post.published_at);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year}-${month}`;
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'];

        if (archiveMap.has(key)) {
          archiveMap.get(key)!.count++;
        } else {
          archiveMap.set(key, {
            year,
            month,
            month_name: monthNames[month - 1],
            count: 1,
          });
        }
      });

      return Array.from(archiveMap.values());
    }

    return data || [];
  } catch (e) {
    console.error('getArchives error:', e);
    return [];
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('getCategories error:', e);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) return null;
    return data;
  } catch (e) {
    console.error('getCategoryBySlug error:', e);
    return null;
  }
}

// Comments
export async function getComments(postId: string): Promise<Comment[]> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .eq('is_approved', true)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('getComments error:', e);
    return [];
  }
}

export async function getRecentComments(limit: number = 5): Promise<Comment[]> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        posts!comments_post_id_fkey(title, slug)
      `)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('getRecentComments error:', e);
    return [];
  }
}

export async function createComment(comment: Partial<Comment>): Promise<Comment | null> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert(comment)
      .select()
      .single();

    if (error) return null;
    return data;
  } catch (e) {
    console.error('createComment error:', e);
    return null;
  }
}

// Tags
export async function getTags(): Promise<Tag[]> {
  try {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('getTags error:', e);
    return [];
  }
}

// Posts by archive month
export async function getPostsByArchive(year: number, month: number): Promise<Post[]> {
  try {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endMonth = month === 12 ? 1 : month + 1;
    const endYear = month === 12 ? year + 1 : year;
    const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;

    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories!posts_category_id_fkey(*),
        authors!posts_author_id_fkey(*)
      `)
      .eq('status', 'published')
      .gte('published_at', startDate)
      .lt('published_at', endDate)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('getPostsByArchive error:', e);
    return [];
  }
}

// Search posts
export async function searchPosts(query: string): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories!posts_category_id_fkey(*),
        authors!posts_author_id_fkey(*)
      `)
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('searchPosts error:', e);
    return [];
  }
}

// RSS Feed
export async function getAllPostsForRSS(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories!posts_category_id_fkey(*),
        authors!posts_author_id_fkey(*)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(20);

    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('getAllPostsForRSS error:', e);
    return [];
  }
}
