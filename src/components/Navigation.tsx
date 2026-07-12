import Link from 'next/link';
import { getCategories } from '@/lib/supabase';

export default async function Navigation() {
  const categories = await getCategories();

  // Exclude 'Uncategorized' from nav; keep About at the end
  const navCategories = categories.filter((cat: any) => cat.slug !== 'uncategorized');

  return (
    <nav className="nav-menu mt-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-tao-teal hover:underline"
            style={{ fontSize: '12.16px' }}
          >
            Home
          </Link>
          {navCategories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}/`}
              className="text-tao-teal hover:underline"
              style={{ fontSize: '12.16px' }}
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/about/"
            className="text-tao-teal hover:underline"
            style={{ fontSize: '12.16px' }}
          >
            About
          </Link>
        </div>
        <Link href="/feed/" className="rss-link">
          Subscribe to feed
        </Link>
      </div>
    </nav>
  );
}
