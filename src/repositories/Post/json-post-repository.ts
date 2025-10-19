import { PostModel } from '@/models/post/Post-Model';
import { PostRepository } from './Post-Repository';
import { resolve } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { logColor } from '../../utils/log-color';

const SimulateWaitMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

const Rood_Dir = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  Rood_Dir,
  'src',
  'db',
  'seed',
  'posts.json',
);

export class JsonPostRepository implements PostRepository {
  static findAll() {
    throw new Error('Method not implemented.');
  }
  static findAllPublic() {
    throw new Error('Method not implemented.');
  }
  private async simulateWait() {
    if (SimulateWaitMs <= 0) return;

    await new Promise(resolve => setTimeout(resolve, SimulateWaitMs));
  }

  private async readFromDisk() {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const jsonParsed = JSON.parse(jsonContent);
    const { posts } = jsonParsed;
    return posts;
  }

private async writeToDisk(posts: PostModel[]): Promise<void> {
    const jsonToString = JSON.stringify({ posts }, null, 2);
    await writeFile(JSON_POSTS_FILE_PATH, jsonToString, 'utf-8');
  }

  async findAllPublic(): Promise<PostModel[]> {
    await this.simulateWait();
    logColor('findAllPublic', Date.now())

    const posts = await this.readFromDisk();
    return posts.filter((post: { published: true }) => post.published);
  }

  async findAll(): Promise<PostModel[]> {
    await this.simulateWait();
    logColor('findAll', Date.now())



    const posts = await this.readFromDisk();
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    logColor('findById', Date.now())
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.id === id);


    if (!post) throw new Error('pagina não encontrada para id');
    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    logColor('findBySlugPublic', Date.now())
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.slug === slug);

    if (!post) throw new Error('pagina não encontrada para slug');
    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const posts = await this.findAll();

    if (!post.id || !post.slug) {
      throw new Error('Post sem ID ou Slug');
    }

    const idOrSlugExist = posts.find(
      savedPost => savedPost.id === post.id || savedPost.slug === post.slug,
    );

    if (idOrSlugExist) {
      throw new Error('ID ou Slug devem ser únicos');
    }

    posts.push(post);
    await this.writeToDisk(posts);

    return post;
  }

  async delete(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex < 0) {
      throw new Error('Post não existe');
    }

    const post = posts[postIndex];
    posts.splice(postIndex, 1);
    await this.writeToDisk(posts);

    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const posts = await this.findAll();
    const postIndex = posts.findIndex(p => p.id === id);
    const savedPost = posts[postIndex];

    if (postIndex < 0) {
      throw new Error('Post não existe');
    }

    const newPost = {
      ...savedPost,
      ...newPostData,
      updatedAt: new Date().toISOString(),
    };
    posts[postIndex] = newPost;
    await this.writeToDisk(posts);
    return newPost;
  }

}
