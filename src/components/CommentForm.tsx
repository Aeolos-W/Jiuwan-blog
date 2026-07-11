'use client';

import { useState } from 'react';
import { createComment } from '@/lib/supabase';

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setSubmitting(true);
    setMessage('');

    try {
      const result = await createComment({
        post_id: postId,
        author_name: authorName.trim(),
        author_email: authorEmail.trim() || null,
        content: content.trim(),
        is_approved: false, // 需要审核
      });

      if (result) {
        setMessage('Your comment has been submitted and is awaiting moderation.');
        setAuthorName('');
        setAuthorEmail('');
        setContent('');
      } else {
        setMessage('Failed to submit comment. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h4 className="font-heading text-lg mb-3">Leave a Comment</h4>
      
      {message && (
        <div className={`mb-3 p-2 text-small ${message.includes('submitted') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`} style={{ fontSize: '11px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="authorName" className="block text-small text-tao-gray mb-1" style={{ fontSize: '11px' }}>
            Name *
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            className="w-full border border-tao-border px-2 py-1 text-body focus:outline-none focus:border-tao-teal"
            style={{ fontSize: '12.16px' }}
          />
        </div>
        <div>
          <label htmlFor="authorEmail" className="block text-small text-tao-gray mb-1" style={{ fontSize: '11px' }}>
            Email (will not be published)
          </label>
          <input
            type="email"
            id="authorEmail"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            className="w-full border border-tao-border px-2 py-1 text-body focus:outline-none focus:border-tao-teal"
            style={{ fontSize: '12.16px' }}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-small text-tao-gray mb-1" style={{ fontSize: '11px' }}>
            Comment *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            className="w-full border border-tao-border px-2 py-1 text-body focus:outline-none focus:border-tao-teal resize-vertical"
            style={{ fontSize: '12.16px' }}
          />
          <p className="text-tao-light-gray mt-1" style={{ fontSize: '10px' }}>
            Use $latex {'<Your LaTeX code>'}$ for math. Backslashes need to be doubled.
          </p>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-tao-teal text-white px-4 py-1 text-body hover:opacity-90 disabled:opacity-50"
          style={{ fontSize: '12.16px' }}
        >
          {submitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </div>
  );
}
