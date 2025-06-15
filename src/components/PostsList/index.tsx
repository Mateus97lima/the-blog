import { postRepository } from '@/repositories/Post';
import { PostCoverImagem } from '../PostCoverImage';
import { PostHeading } from '../PostHeading';

export async function PostsList() {
  const posts = await postRepository.findAll();

  return (
    <div className='grid grid-cols-1 gap-5  sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map(post => {
        return (
          <div className='flex flex-col group gap-5' key={post.id}>
            <PostCoverImagem
              imageProps={{
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
                alt: post.title,
                priority: true,
              }}
              linkProps={{
                href: `/post/${post.slug}`,
              }}
            />
                  <div className=' flex flex-col gap-4 sm:justify-center'>
                        <time className='text-slate-600 block text-sm/tight' dateTime={post.createdAt}>{post.createdAt}</time>

                      <PostHeading as='h2' url='#'>{post.title}</PostHeading>

                      <p>{post.excerpt}
                      </p>
                    </div>
          </div>
        );
      })}
    </div>
  );
}
