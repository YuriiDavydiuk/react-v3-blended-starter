import { fetchPosts } from '@/lib/api';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostsClient from './Posts.client';

export default async function PostsPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const id = slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts', { searchText: '', page: 1, userId: id }],
    queryFn: () => fetchPosts({ searchText: '', page: 1, userId: id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient userId={id} />
    </HydrationBoundary>
  );
}
