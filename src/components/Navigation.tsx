import Link from 'next/link';
import { getCategories } from '@/lib/supabase';

export default async function Navigation() {
  const categories = await getCategories();

  // Only show specific categories in nav
  const allowedSlugs = ['career-advice', 'on-writing', 'books', 'applets'];
  const navCategories = categories
    .filter((cat: any) => allowedSlugs.includes(cat.slug))
    .sort((a: any, b: any) => allowedSlugs.indexOf(a.slug) - allowedSlugs.indexOf(b.slug));

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
