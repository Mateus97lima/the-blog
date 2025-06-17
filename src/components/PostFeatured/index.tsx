
import { PostCoverImagem } from '../PostCoverImage';

import { PostSumary } from '../PostSumaary';
import { findAllPublicPosts } from '@/LIb/post/queries';

export async function PostFeatured() {
 const posts = await findAllPublicPosts();
  const post = posts[0]

  const postLink = `/post/${post.slug}`;

  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImagem
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          width: 1200,
          height: 720,
          src: post.coverImageUrl,
          alt: post.title,
          priority: true,
        }}
      />

      <PostSumary
        postLink={postLink}
        postHeading='h1'
        title={post.title}
        createdAt={post.createdAt}
        excerpt={
          post.excerpt
        }
      />
    </section>
  );
}
