import { getPosts } from '@/lib/supabase';
import PostCard from '@/components/PostCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'On writing | What\'s new',
};

export const revalidate = 60;

export default async function OnWritingPage() {
  const posts = await getPosts('on-writing', 10, 0);

  return (
    <div>
      <h2 className="font-heading text-h2 mb-4">On writing</h2>
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
