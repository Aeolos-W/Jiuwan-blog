import { getPosts } from '@/lib/supabase';
import PostCard from '@/components/PostCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career advice | What\'s new',
};

export const revalidate = 60;

export default async function CareerAdvicePage() {
  const posts = await getPosts('career-advice', 10, 0);

  return (
    <div>
      <h2 className="font-heading text-h2 mb-4">Career advice</h2>
      {posts.length > 0 ? (
        posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))
      ) : (
        <p className="text-tao-gray">No posts in this category yet.</p>
      )}
    </div>
  );
}
