import { getPostsByArchive } from '@/lib/supabase';
import PostCard from '@/components/PostCard';
import type { Metadata } from 'next';

interface ArchivePageProps {
  params: { year: string; month: string };
}

export async function generateMetadata({ params }: ArchivePageProps): Promise<Metadata> {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const monthNum = parseInt(params.month, 10);
  const monthName = monthNames[monthNum - 1] || params.month;
  return {
    title: `${monthName} ${params.year} | 九畹的博客`,
  };
}

export const revalidate = 60;
export const maxDuration = 60;

export default async function ArchivePage({ params }: ArchivePageProps) {
  const year = parseInt(params.year, 10);
  const month = parseInt(params.month, 10);

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    return (
      <div>
        <h1 className="font-heading text-h1 mb-4">Invalid date</h1>
        <p className="text-tao-gray">The archive date you are looking for is invalid.</p>
      </div>
    );
  }

  const posts = await getPostsByArchive(year, month);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const monthName = monthNames[month - 1];

  return (
    <div>
      <h2 className="font-heading text-h2 mb-4">{monthName} {year}</h2>
      {posts.length > 0 ? (
        posts.map((post: any) => (
          <PostCard key={post.id} post={post} showFullContent />
        ))
      ) : (
        <p className="text-tao-gray">No posts in this month yet.</p>
      )}
    </div>
  );
}
