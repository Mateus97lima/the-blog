'use server';

import { postRepository } from "@/repositories/Post";
import { asyncDelay } from "../../../utils/async-delay";
import { logColor } from "../../../utils/log-color"
import { drizzleDb } from "@/db/drizzle";
import { postsTable } from "@/db/drizzle/schemas";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";


export async function deletePostAction(id:string) {

await asyncDelay(2000)

    logColor(''+ id);

    if(!id || typeof id !== 'string'){
        return{
            error:'DAdOS inválidos'
        }
    }

    const post = await postRepository.findById(id).catch(()=> undefined);

    if(!post){
       return{
            error:'Post não existir'
        }
    }

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

     revalidateTag('post')
     revalidateTag(`post ${post.slug}`)
    return {
        error:''
    };
}
