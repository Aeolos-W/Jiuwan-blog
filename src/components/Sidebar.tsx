import { getRecentComments, getTopPosts, getArchives, getCategories } from '@/lib/supabase';
import Link from 'next/link';
import IdenticonAvatar from './IdenticonAvatar';

export default async function Sidebar() {
  const [recentComments, topPosts, archives, categories] = await Promise.all([
    getRecentComments(5),
    getTopPosts(5),
    getArchives(),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      {/* Recent Comments Widget */}
      <div>
        <h3 className="widget-title">Recent Comments</h3>
        <ul className="space-y-3">
          {recentComments.map((comment: any) => (
            <li key={comment.id} className="flex items-start gap-2">
              <IdenticonAvatar
                seed={comment.author_name}
                size={28}
                className="mt-0.5"
              />
              <div className="text-small" style={{ fontSize: '11px', lineHeight: '1.4' }}>
                <span className="text-tao-dark">{comment.author_name}</span>
                <span className="text-tao-gray"> on </span>
                <Link
                  href={`/post/${encodeURIComponent(comment.posts?.slug || '')}/`}
                  className="text-tao-teal hover:underline"
                >
                  {comment.posts?.title}
                </Link>
              </div>
            </li>
          ))}
          {recentComments.length === 0 && (
            <li className="text-tao-gray" style={{ fontSize: '11px' }}>No comments yet.</li>
          )}
        </ul>
      </div>

      {/* Top Posts Widget */}
      <div>
        <h3 className="widget-title">Top Posts</h3>
        <ul className="space-y-2">
          {topPosts.map((post: any) => (
            <li key={post.id}>
              <Link
                href={`/post/${encodeURIComponent(post.slug)}/`}
                className="text-tao-teal hover:underline"
                style={{ fontSize: '11px', lineHeight: '1.4', display: 'block' }}
              >
                {post.title}
              </Link>
            </li>
          ))}
          {topPosts.length === 0 && (
            <li className="text-tao-gray" style={{ fontSize: '11px' }}>No posts yet.</li>
          )}
        </ul>
      </div>

      {/* Archives Widget */}
      <div>
        <h3 className="widget-title">Archives</h3>
        <ul className="space-y-1">
          {archives.map((archive: any) => (
            <li key={`${archive.year}-${archive.month}`}>
              <Link
                href={`/archive/${archive.year}/${String(archive.month).padStart(2, '0')}/`}
                className="text-tao-teal hover:underline"
                style={{ fontSize: '11px' }}
              >
                {archive.month_name} {archive.year} ({archive.count})
              </Link>
            </li>
          ))}
          {archives.length === 0 && (
            <li className="text-tao-gray" style={{ fontSize: '11px' }}>No archives yet.</li>
          )}
        </ul>
      </div>

      {/* Categories Widget */}
      <div>
        <h3 className="widget-title">Categories</h3>
        <ul className="space-y-1">
          {categories.map((category: any) => (
            <li key={category.id}>
              <Link
                href={`/category/${category.slug}/`}
                className="text-tao-teal hover:underline"
                style={{ fontSize: '11px' }}
              >
                {category.name}
              </Link>
            </li>
          ))}
          {categories.length === 0 && (
            <li className="text-tao-gray" style={{ fontSize: '11px' }}>No categories yet.</li>
          )}
        </ul>
      </div>

      {/* Meta Widget */}
      <div>
        <h3 className="widget-title">Meta</h3>
        <ul className="space-y-1">
          <li>
            <Link href="/feed/" className="rss-link" style={{ fontSize: '11px' }}>
              Subscribe to feed
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
