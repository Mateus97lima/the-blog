import { PostCoverImagem } from '../PostCoverImage';
import { PostSumary } from '../PostSumaary';
import { findAllPublicPostsFromApiCached } from '@/lib/post/queries/public';

export async function PostsList() {
  const postsRes = await findAllPublicPostsFromApiCached();

  if(!postsRes.success){
    return null;
  }

  const posts = postsRes.data

  if (posts.length < 1) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 gap-5 mb-16 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;

        return (
          <div className='flex flex-col group gap-5  ' key={post.id}>
            <PostCoverImagem
              imageProps={{
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
                alt: post.title,
                priority: true,
              }}
              linkProps={{
                href: postLink,
              }}
            />
            <PostSumary
              postLink={postLink}
              postHeading='h2'
              title={post.title}
              createdAt={post.createdAt}
              excerpt={post.excerpt}
            />
          </div>
        );
      })}
    </div>
  );
}
