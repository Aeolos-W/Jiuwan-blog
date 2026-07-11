import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-10 pt-6 border-t border-tao-border">
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-tao-dark mb-2" style={{ fontSize: '12.16px' }}>
            FOR COMMENTERS
          </h3>
          <p className="text-tao-gray" style={{ fontSize: '11px', lineHeight: '1.4' }}>
            To enter in LaTeX in comments, use <code className="bg-gray-100 px-1">$latex {'<Your LaTeX code>'}$</code>{' '}
            (without the {'<'} and {'>'} signs, of course; in fact, these signs should be avoided as they can cause formatting errors). Also, backslashes \ need to be doubled as \\. See the{' '}
            <Link href="/about/" className="text-tao-teal hover:underline">
              about page
            </Link>{' '}
            for details and for other commenting policy.
          </p>
        </div>
        <div className="pt-4 border-t border-tao-border">
          <p className="text-tao-light-gray" style={{ fontSize: '11px' }}>
            Blog powered by Next.js + Supabase. Theme inspired by{' '}
            <Link href="https://terrytao.wordpress.com/" className="text-tao-teal hover:underline" target="_blank" rel="noopener noreferrer">
              九畹的博客
            </Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
