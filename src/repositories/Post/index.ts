import { JsonPostRepository } from "./json-post-repository";
import { PostRepository } from "./Post-Repository";

export const postRepository: PostRepository = new JsonPostRepository();
