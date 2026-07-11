import { Comment } from '@/types';
import { formatDate } from '@/lib/utils';

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <p className="text-tao-gray italic" style={{ fontSize: '12.16px' }}>
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li key={comment.id} className="border-b border-tao-border pb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-bold text-tao-dark" style={{ fontSize: '12.16px' }}>
              {comment.author_name}
            </span>
            <span className="text-tao-light-gray" style={{ fontSize: '11px' }}>
              {formatDate(comment.created_at)}
            </span>
          </div>
          <div 
            className="text-tao-dark" 
            style={{ fontSize: '12.16px', lineHeight: '1.5' }}
            dangerouslySetInnerHTML={{ __html: comment.content.replace(/\n/g, '<br/>') }}
          />
        </li>
      ))}
    </ul>
  );
}
