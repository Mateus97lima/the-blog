import { PostModel } from '@/models/post/Post-Model';

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
}
