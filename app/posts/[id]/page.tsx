import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostDetailsClient from './PostDetails.client';
import { fetchPostById } from '@/lib/api';

export default async function PostDetails({params}: {params: Promise<{id:string}>}) {
  const queryClient = new QueryClient();
  const {id} = await params
  await queryClient.prefetchQuery({
    queryKey: ["post", id],
    queryFn:() => fetchPostById(id)
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}
