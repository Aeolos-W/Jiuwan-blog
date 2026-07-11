import Link from 'next/link';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' },
  { name: 'Career advice', href: '/career-advice/' },
  { name: 'On writing', href: '/on-writing/' },
  { name: 'Books', href: '/books/' },
  { name: 'Mastodon+', href: 'https://mathstodon.xyz/@tao' },
  { name: 'Applets', href: '/applets/' },
];

export default function Navigation() {
  return (
    <nav className="nav-menu mt-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-tao-teal hover:underline"
              style={{ fontSize: '12.16px' }}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Link href="/feed/" className="rss-link">
          Subscribe to feed
        </Link>
      </div>
    </nav>
  );
}
