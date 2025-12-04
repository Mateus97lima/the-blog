'use server';

import { CreatePostForApiSchemas, PublicPostForApiDto, PublicPostForApiSchema } from "@/lib/post/schemas";
import { getZodErrorMessages } from "../../utils/get-zod-error-messagens";
import { getLoginSessionFormApi } from "@/lib/login/manage_login";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";


type createPostActionState = {
     success?: string;
    formState:PublicPostForApiDto;
    errors:string[];


}

export async function createPostAction(prevState:createPostActionState , formaData:FormData):Promise<createPostActionState> {

const isAuthenticated = await getLoginSessionFormApi() //

if(!(formaData instanceof FormData)){
     return {
    formState:{...prevState.formState},
    errors:['Dados inválidos'],
}
}

const formDataToObj = Object.fromEntries(formaData.entries()) ;
const zodParsedObj = CreatePostForApiSchemas.safeParse(formDataToObj)

if(!isAuthenticated){
    return{
        formState:PublicPostForApiSchema.parse(formDataToObj),
        errors:['Faça seu login em outra aba antes de salvar.']
    }
}

if(!zodParsedObj.success){
    const errors = getZodErrorMessages(zodParsedObj.error.format())

    return {
        errors,
        formState:PublicPostForApiSchema.parse(formDataToObj),
    }
}

const newPost = zodParsedObj.data;

  const createPostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/me`,
    {
      method: 'Post',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    },
  );

  if(!createPostResponse.success) {
    return {
        formState: PublicPostForApiSchema.parse(formDataToObj),
        errors: createPostResponse.errors
    };
  }

  const createdPost =createPostResponse.data


console.log('criado com sucesso')
 revalidateTag('post')
 redirect(`/admin/post/${createdPost.id}?create=1`)

}










