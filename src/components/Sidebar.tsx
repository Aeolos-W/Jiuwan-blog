import { getRecentComments } from '@/lib/supabase';
import Link from 'next/link';

export default async function Sidebar() {
  const recentComments = await getRecentComments(5);

  return (
    <div className="space-y-6">
      {/* Recent Comments Widget */}
      <div>
        <h3 className="widget-title">Recent Comments</h3>
        <ul className="space-y-3">
          {recentComments.map((comment: any) => (
            <li key={comment.id} className="text-small" style={{ fontSize: '11px' }}>
              <span className="text-tao-dark">{comment.author_name}</span>
              <span className="text-tao-gray"> on </span>
              <Link
                href={`/post/${comment.posts?.slug}/`}
                className="text-tao-teal hover:underline"
              >
                {comment.posts?.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Archives Widget */}
      <div>
        <h3 className="widget-title">Archives</h3>
        <ul className="space-y-1">
          <li>
            <Link href="/" className="text-tao-teal hover:underline" style={{ fontSize: '11px' }}>
              July 2026
            </Link>
          </li>
          <li>
            <Link href="/" className="text-tao-teal hover:underline" style={{ fontSize: '11px' }}>
              June 2026
            </Link>
          </li>
          <li>
            <Link href="/" className="text-tao-teal hover:underline" style={{ fontSize: '11px' }}>
              May 2026
            </Link>
          </li>
          <li>
            <Link href="/" className="text-tao-teal hover:underline" style={{ fontSize: '11px' }}>
              April 2026
            </Link>
          </li>
        </ul>
      </div>

      {/* Categories Widget */}
      <div>
        <h3 className="widget-title">Categories</h3>
        <ul className="space-y-1">
          <li>
            <Link href="/career-advice/" className="text-tao-teal hover:underline" style={{ fontSize: '11px' }}>
              Career advice
            </Link>
          </li>
          <li>
            <Link href="/on-writing/" className="text-tao-teal hover:underline" style={{ fontSize: '11px' }}>
              On writing
            </Link>
          </li>
          <li>
            <Link href="/books/" className="text-tao-teal hover:underline" style={{ fontSize: '11px' }}>
              Books
            </Link>
          </li>
          <li>
            <Link href="/applets/" className="text-tao-teal hover:underline" style={{ fontSize: '11px' }}>
              Applets
            </Link>
          </li>
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
