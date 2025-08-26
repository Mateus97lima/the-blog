'use server';

import { makePartialPublicPost, publicPost } from "@/dto/post/dto";
import { PostCreateSchema } from "@/lib/post/validation";
import { getZodErrorMessages } from "../../../utils/get-zod-error-messagens";
import { PostModel } from "@/models/post/Post-Model";
import {v4 as uuidV4} from 'uuid'
import { markeSlugText as makeSlugText } from "../../../utils/marke-slug-text";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { postRepository } from "@/repositories/Post";


type createPostActionState = {
     success?: string;
    formState:publicPost;
    errors:string[];


}

export async function createPostAction(prevState:createPostActionState , formaData:FormData):Promise<createPostActionState> {
//TODO: verificar se o úsuario ta logado

if(!(formaData instanceof FormData)){
     return {
    formState:{...prevState.formState},
    errors:['Dados inválidos'],
}
}

const formDataToObj = Object.fromEntries(formaData.entries()) ;
const zodParsedObj = PostCreateSchema.safeParse(formDataToObj)

if(!zodParsedObj.success){
    const errors = getZodErrorMessages(zodParsedObj.error.format())

    return {
        errors,
        formState:makePartialPublicPost(),
    }
}

const validPostZod = zodParsedObj.data;
const newPost: PostModel ={
    ...validPostZod,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id:uuidV4(),
    slug: makeSlugText(validPostZod.title)


};

try{
    await postRepository.create(newPost)
}catch(e: unknown){
     if (e instanceof Error) {
    return {
        formState:newPost,
        errors:[e.message],
    }
}
return {
    formState:newPost,
    errors:['Error desconhecido']
}

}

console.log('criado com sucesso')
 revalidateTag('post')
 redirect(`/admin/post/${newPost.id}?create=1`)

}










