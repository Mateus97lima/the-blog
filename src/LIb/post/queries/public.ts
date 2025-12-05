import { PostModelFromApi } from '@/models/post/Post-Model';
import { postRepository } from '@/repositories/Post';
import { apiRequest } from '@/utils/api-request';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPublicPostsCached =  cache(
    unstable_cache(
 (async () => {
    return await postRepository.findAllPublic();
  }),
  ['posts'],
  {
    tags: ['posts'],
  },
));

export const findAllPublicPostsFromApiCached = cache(async () => {
const postResponse = await apiRequest<PostModelFromApi[]>(
    `/post`,
    {
        next: {
            tags: ['posts'],
            revalidate: 86400,
        },
    },
);

return postResponse

})

export  const findPublicPostBySlugCached = cache( (slug: string) => {
    return unstable_cache(
        async(slug:string) =>{
            const post = await postRepository
            .findBySlugPublic(slug)
            .catch(() => undefined)

            if(!post) notFound();

            return post
        },
        [`post-${slug}`],
        {tags:[`post-${slug}`]},
    )(slug);
    })
//aqui e onde eu modifiquei //
    export const findPublicPostBySlugFromApi = cache (async (slug: string) => {
        const postResponse = await apiRequest<PostModelFromApi>(
            `/post/${slug}`,
            {
                next: {
                    tags: [`post-${slug}`],
                    revalidate: 86400,
                },
            },
        );

        return postResponse
    })



