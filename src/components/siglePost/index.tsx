import { findPublicPostBySlugCached } from '@/lib/post/queries/public';
import Image from 'next/image';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';
import { SafeMarkDown } from '../SafeMarkDown';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPublicPostBySlugCached(slug);
  return (
    <article className='mb-16'>
      <header className='group flex flex-col gap-6 mb-4'>
        <Image
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
          className='rounded-xl'
        />
        <PostHeading url={`post/${post.slug}`}>{post.title}</PostHeading>
        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>
      <p className='text-xl mb-6'>{post.excerpt}</p>
      <SafeMarkDown markdown={post.content} />
    </article>
  );
}
