import { getPostBySlug, getComments } from '@/lib/supabase';
import PostCard from '@/components/PostCard';
import CommentList from '@/components/CommentList';
import CommentForm from '@/components/CommentForm';
import type { Metadata } from 'next';

interface PostPageProps {
  params: { slug: string };
}

// 使用 ISR 而不是 SSG，避免构建时调用 Supabase
// export async function generateStaticParams() {
//   const slugs = await getAllSlugs();
//   return slugs.map((slug) => ({ slug }));
// }

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return {
    title: post ? `${post.title} | 九畹的博客` : 'Post not found',
  };
}

export const revalidate = 60;
export const maxDuration = 60;

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <div>
        <h1 className="font-heading text-h1 mb-4">Error 404</h1>
        <p className="text-tao-gray">
          The page you are looking for does not exist; it may have been moved, or removed altogether.
          You might want to try the search function. Alternatively, return to the{' '}
          <a href="/" className="text-tao-teal hover:underline">front page</a>.
        </p>
      </div>
    );
  }

  const comments = await getComments(post.id);

  return (
    <div>
      <PostCard post={post} showFullContent />
      
      {/* 评论区 */}
      <div id="comments" className="mt-8 pt-6 border-t border-tao-border">
        <h3 className="font-heading text-xl mb-4">
          {comments.length} Comment{comments.length !== 1 ? 's' : ''}
        </h3>
        <CommentList comments={comments} />
        <div className="mt-6">
          <CommentForm postId={post.id} />
        </div>
      </div>
    </div>
  );
}
