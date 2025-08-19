import { PostModel } from '@/models/post/Post-Model';


export type publicPost = Omit<PostModel, 'updatedAt'>;

export const makePartialPublicPost = (post?: Partial<PostModel>): publicPost => {
  return {
    id: post?.id ||'',
    slug: post?.slug || '',
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    author: post?.author || '',
    content: post?.content || '',
    coverImageUrl: post?.coverImageUrl || '',
    createdAt: post?.createdAt || '',
    published: post?.published || false,
  };
};
export const makePublicPostFromDb = (post: PostModel): publicPost => {
  return makePartialPublicPost(post);
};
