import Link from 'next/link';
import { Post } from '@/types';
import { formatDate } from '@/lib/utils';
import MathRenderer from './MathRenderer';

interface PostCardProps {
  post: Post;
  showFullContent?: boolean;
}

export default function PostCard({ post, showFullContent = false }: PostCardProps) {
  return (
    <article className="mb-8">
      {/* 文章标题 */}
      <h2 className="font-heading text-h2 mb-1">
        <Link href={`/post/${post.slug}/`} className="text-tao-dark hover:text-tao-teal">
          <MathRenderer content={post.title} inline />
        </Link>
      </h2>

      {/* 元信息 */}
      <div className="text-small text-tao-gray mb-3" style={{ fontSize: '11px' }}>
        <span>{formatDate(post.published_at)}</span>
        {post.category_id && (
          <>
            <span className="mx-1">in</span>
            <Link href={`/category/${post.categories?.slug}/`} className="text-tao-teal hover:underline">
              {post.categories?.name}
            </Link>
          </>
        )}
        {post.tags && post.tags.length > 0 && (
          <>
            <span className="mx-1">| Tags:</span>
            {post.tags.map((tag: string, index: number) => (
              <span key={tag}>
                <Link href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}/`} className="text-tao-teal hover:underline">
                  {tag}
                </Link>
                {index < post.tags.length - 1 && ', '}
              </span>
            ))}
          </>
        )}
        <span className="mx-1">| by</span>
        <span className="text-tao-dark">{post.authors?.name || 'Terence Tao'}</span>
        <span className="mx-1">|</span>
        <Link href={`/post/${post.slug}/#comments`} className="text-tao-teal hover:underline">
          {post.comment_count} comment{post.comment_count !== 1 ? 's' : ''}
        </Link>
      </div>

      {/* 文章内容 */}
      <div className="entry-content">
        {showFullContent ? (
          <MathRenderer content={post.content} />
        ) : (
          <>
            <MathRenderer content={post.excerpt || post.content.substring(0, 300) + '...'} />
            <p className="mt-2">
              <Link href={`/post/${post.slug}/`} className="text-tao-teal hover:underline">
                Read more &rarr;
              </Link>
            </p>
          </>
        )}
      </div>
    </article>
  );
}
