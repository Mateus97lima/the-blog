import { PostModel } from '@/models/post/Post-Model';
import { PostRepository } from './Post-Repository';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

const Rood_Dir = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  Rood_Dir,
  'src',
  'db',
  'seed',
  'posts.json',
);
const SIMULATE_WAIT_IN_MS = 0;
export class JsonPostRepository implements PostRepository {
    static findAll() {
        throw new Error("Method not implemented.");
    }
    static findAllPublic() {
        throw new Error("Method not implemented.");
    }
  private async simulateWait() {
    if (SIMULATE_WAIT_IN_MS <= 0) return;

    await new Promise(resolve => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
  }

  private async readFromDisk() {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const jsonParsed = JSON.parse(jsonContent);
    const { posts } = jsonParsed;
    return posts;
  }

  async findAllPublic(): Promise<PostModel[]> {
    await this.simulateWait();

    const posts = await this.readFromDisk();
    return posts.filter((post: { published: true; }) => post.published);
  };

   async findAll(): Promise<PostModel[]> {
    await this.simulateWait();

    console.log('\n', 'findAll', '\n')

    const posts = await this.readFromDisk();
    return posts
  };

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.id === id);

    if (!post) throw new Error('pagina não encontrada para id');
    return post;
  };

   async findBySlug(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.slug === slug);

    if (!post) throw new Error('pagina não encontrada para slug');
    return post;
  };
};
