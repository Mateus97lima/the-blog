import { SinglePost } from '@/components/siglePost';
import { SpinLoader } from '@/components/SpinLoader';
import { findPostBySlugCached } from '@/LIb/post/queries';
import { Metadata } from 'next';
import { Suspense } from 'react';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PostSlugPageProps): Promise<Metadata> {

  const { slug } = await params;

  const post = await findPostBySlugCached(slug);

  return {
    title: post.title,
    description:post.excerpt
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;


  return(
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16'/>}>
       <SinglePost slug={slug}/>
    </Suspense>

  )

}
