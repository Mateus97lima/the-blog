'use server';

import { publicPost } from "@/dto/post/dto";


type createPostActionState = {
    formState:publicPost;
    errors:string[];


}

export async function createPostAction(prevState:createPostActionState , formaData:FormData):Promise<createPostActionState> {

    const title = formaData.get('title')?.toString()|| '';
 return {
    formState:{...prevState.formState,title},
    errors:[],
}
}
