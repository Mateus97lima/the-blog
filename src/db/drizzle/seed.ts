import { JsonPostRepository } from "@/repositories/Post/json-post-repository";
import { drizzleDb } from ".";
import { postsTable } from "./schemas";





(async () =>{
    const jsonPostRepository = new JsonPostRepository
    const posts = await jsonPostRepository.findAll()

    try {
        await drizzleDb.delete(postsTable);
         await drizzleDb.insert(postsTable).values(posts);

    } catch(e){
        console.log(e,'error......')
    } ;


})();
