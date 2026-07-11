import { redirect } from 'next/navigation';

export default function FeedPage() {
  redirect('/api/rss');
}
