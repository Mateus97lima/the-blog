import { postRepository } from "@/repositories/Post";
import { cache } from "react";

export const findAllPublicPosts = cache( async () =>
await postRepository.findAllPublic(),
);

