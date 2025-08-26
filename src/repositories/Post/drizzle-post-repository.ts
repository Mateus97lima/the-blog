import { PostModel } from '@/models/post/Post-Model';
import { PostRepository } from './Post-Repository';
import { drizzleDb } from '@/db/drizzle';
import { asyncDelay } from '../../../utils/async-delay';
import { SIMULATE_WAIT_IN_MS } from '@/lib/post/queries/constants';
import { postsTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    console.log('\n', 'findAllPublic', '\n');

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    console.log('\n', 'findBySlugPublic', '\n');

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });
    if (!post) throw new Error('pagina não encontrada para slug');
    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);



    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
      console.log('\n', 'findAll', posts, '\n');
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    console.log('\n', 'findById', '\n');

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });
    if (!post) throw new Error('pagina não encontrada para id');
    return post;
  }
   async create(post:PostModel ):Promise<PostModel> {
  const postExists =  await drizzleDb.query.posts.findFirst({
    where:(post,{or,eq}) =>
        or(eq(post.id, post.id), eq(post.slug,post.slug)),
    columns:{id:true},
  })
  if(!!postExists){
    throw new Error ('Post com ID ou Slug já existe na base de dados')
  }
  await drizzleDb.insert(postsTable).values(post)
  return post;
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


