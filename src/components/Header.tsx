import Link from 'next/link';

export default function Header() {
  return (
    <header>
      {/* Banner Image */}
      <div className="w-full">
        <img
          src="/banner.svg"
          alt="Blog banner"
          className="w-full"
          style={{ maxHeight: '180px', objectFit: 'cover' }}
        />
      </div>
      {/* Site Title */}
      <div className="mt-4">
        <h1 className="text-h1 font-heading">
          <Link href="/" className="text-tao-teal hover:underline">
            What's new
          </Link>
        </h1>
        <p className="text-tao-gray italic mt-1" style={{ fontSize: '12.16px' }}>
          Updates on my research and expository papers, discussion of open problems, and other maths-related topics. By Terence Tao
        </p>
      </div>
    </header>
  );
}
