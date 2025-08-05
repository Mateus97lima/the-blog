import { PostModel } from '@/models/post/Post-Model';
import { PostRepository } from './Post-Repository';
import { drizzleDb } from '@/db/drizzle';
import { asyncDelay } from '../../../utils/async-delay';
import { SIMULATE_WAIT_IN_MS } from '@/lib/post/queries/constants';

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
}

//  (async () =>{
//  const repo = new DrizzlePostRepository();
//  const posts = await repo.findAll();

//  posts.forEach(post => console.log(post.slug, post.published))
//  })();
