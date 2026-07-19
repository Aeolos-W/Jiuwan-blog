import { getPosts } from '@/lib/supabase';
import PostCard from '@/components/PostCard';

export const revalidate = 60;
export const maxDuration = 60;

export default async function HomePage() {
  const posts = await getPosts(undefined, 10, 0);

  return (
    <div>
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} showFullContent />
      ))}
    </div>
  );
}
