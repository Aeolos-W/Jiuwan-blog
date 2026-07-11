import { getAllPostsForRSS } from '@/lib/supabase';
import RSS from 'rss';

export async function GET() {
  const posts = await getAllPostsForRSS();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const feed = new RSS({
    title: "What's new",
    description: 'Updates on my research and expository papers, discussion of open problems, and other maths-related topics.',
    feed_url: `${siteUrl}/feed/`,
    site_url: siteUrl,
    language: 'en',
    pubDate: new Date().toUTCString(),
  });

  posts.forEach((post: any) => {
    feed.item({
      title: post.title,
      description: post.excerpt || post.content.substring(0, 300),
      url: `${siteUrl}/post/${post.slug}/`,
      date: post.published_at,
      author: post.authors?.name || 'Terence Tao',
      categories: post.tags || [],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
