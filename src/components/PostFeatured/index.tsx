import ErrorMessage from '../ErrorMessage';
import { PostCoverImagem } from '../PostCoverImage';

import { PostSumary } from '../PostSumaary';
import {  findAllPublicPostsFromApiCached } from '@/lib/post/queries/public';

export async function PostFeatured() {
  const postsRes= await findAllPublicPostsFromApiCached();
  const noPostsFound = (
     <ErrorMessage contentTitle='ops 😅' content='ainda não criamos um post' />
  )

   if(!postsRes.success) {
    return noPostsFound
   }


const posts = postsRes.data;

if(posts.length < 0) {  //Existir algum post se não noPostsFound//
    return noPostsFound;
}

const post = posts[0];

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
        excerpt={post.excerpt}
      />
    </section>
  );
}
