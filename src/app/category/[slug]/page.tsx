import { getPosts, getCategoryBySlug } from '@/lib/supabase';
import PostCard from '@/components/PostCard';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  return {
    title: category ? `${category.name} | What's new` : 'Category not found',
  };
}

export const revalidate = 60;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  const posts = await getPosts(params.slug, 10, 0);

  if (!category) {
    return (
      <div>
        <h1 className="font-heading text-h1 mb-4">Category not found</h1>
        <p className="text-tao-gray">
          The category you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-h2 mb-4">{category.name}</h2>
      {category.description && (
        <p className="text-tao-gray mb-4" style={{ fontSize: '12.16px' }}>
          {category.description}
        </p>
      )}
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
