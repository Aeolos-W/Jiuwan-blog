import { searchPosts } from '@/lib/supabase';
import PostCard from '@/components/PostCard';
import type { Metadata } from 'next';

interface SearchPageProps {
  searchParams: { q?: string };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || '';
  return {
    title: query ? `Search: ${query} | 九畹的博客` : 'Search | 九畹的博客',
  };
}

export const revalidate = 60;
export const maxDuration = 60;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams.q || '').trim();
  const posts = query ? await searchPosts(query) : [];

  return (
    <div>
      <h2 className="font-heading text-h2 mb-4">Search</h2>

      {query ? (
        <>
          <p className="text-tao-gray mb-4" style={{ fontSize: '12.16px' }}>
            Search results for: <strong className="text-tao-dark">{query}</strong>
          </p>
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-tao-gray">No posts found matching your search.</p>
          )}
        </>
      ) : (
        <p className="text-tao-gray">Please enter a search term.</p>
      )}
    </div>
  );
}
