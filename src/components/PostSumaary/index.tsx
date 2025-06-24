

import { PostDate } from '../PostDate';
import { PostHeading } from '../PostHeading';

type PostSumaryProps = {
  postHeading: 'h1' | 'h2';
  postLink: string;
  title: string;
  createdAt: string;
  excerpt: string;
};

export function PostSumary({
  postHeading,
  postLink,
  createdAt,
  title,
  excerpt,
}: PostSumaryProps) {
  return (
    <div className=' flex flex-col gap-4 sm:justify-center'>
      <PostDate dateTime={createdAt}/>

      <PostHeading as={postHeading} url={postLink}>
        {title}
      </PostHeading>

      <p>{excerpt}</p>
    </div>
  );
}
