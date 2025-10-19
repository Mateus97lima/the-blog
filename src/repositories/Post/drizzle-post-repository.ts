import { PostModel } from '@/models/post/Post-Model';
import { PostRepository } from './Post-Repository';
import { drizzleDb } from '@/db/drizzle';
import { asyncDelay } from '../../utils/async-delay';
import { postsTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';

const SimulateWaitMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SimulateWaitMs, true);



    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SimulateWaitMs, true);



    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });
    if (!post) throw new Error('pagina não encontrada para slug');
    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SimulateWaitMs, true);



    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SimulateWaitMs, true);


    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });
    if (!post) throw new Error('pagina não encontrada para id');
    return post;
  }
 async create(newPost: PostModel): Promise<PostModel> {
  const postExists = await drizzleDb.query.posts.findFirst({
    where: (posts, { or, eq }) =>
      or(eq(posts.id, newPost.id), eq(posts.slug, newPost.slug)),
    columns: { id: true },
  });

  if (postExists) {
    throw new Error('Post com ID ou Slug já existe na base de dados');
  }

  await drizzleDb.insert(postsTable).values(newPost);
  return newPost;
}


  async delete(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error('Post não existe');
    }

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

    return post;
  }

  async update(id: string, newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<PostModel> {
      const olPost = await drizzleDb.query.posts.findFirst({
        where:(post, {eq}) => eq(post.id,id),
      });
      if(!olPost) {
        throw new Error('Post não existe')
      }
      const updatedAt = new Date().toISOString();
      const postData = {
        author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
      }
      await drizzleDb
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id,id))

      return {
        ...olPost,
        ...postData
      }
  }

}


