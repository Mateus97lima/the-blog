import { PostModel } from "@/models/post/Post-Model";



export interface PostRepository  {
findAll():Promise<PostModel[]>;
findById(id: string):Promise<PostModel>;
}


