

// import { DrizzlePostRepository } from "./drizzle-post-repository";
import { DrizzlePostRepository } from "./drizzle-post-repository";



import { PostRepository } from "./Post-Repository";

export const postRepository: PostRepository = new DrizzlePostRepository();
