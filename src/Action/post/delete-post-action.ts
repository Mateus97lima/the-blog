'use server';

import { getLoginSessionFormApi } from "@/lib/login/manage_login";
import { PublicPostForApiDto } from "@/lib/post/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";

import { revalidateTag } from "next/cache";


export async function deletePostAction(id:string) {

const isAuthenticated = await getLoginSessionFormApi()

  if(!isAuthenticated){
    return{
      error:'Faça login novamente em outra aba ',
    }
}


    if(!id || typeof id !== 'string'){
        return{
            error:'Dados inválidos'
        }
    }

    const postResponse = await authenticatedApiRequest<PublicPostForApiDto>(
        `/post/me/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },

        }
    )

    if(!postResponse.success) {
        return {
            error: 'Erro ao encontrar post'
        }
    }


  const deletePostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/me/${id}`,
    {
        method: 'DELETE',

        headers: {
            'Content-Type': 'application/json',
        }
    }
  )

  if(!deletePostResponse.success) {
    return {
        error:  'Error ao apagar post'
    }
  }

  revalidateTag('post', 'max-age=0') // ISSO GARANTE QUE A PÁGINA SEJA REVALIDADA IMEDIATAMENTE APÓS A AÇÃO DELETAR O POST
  revalidateTag(`post-${postResponse.data.slug}`, 'max-age=0') // ISSO GARANTE QUE A PÁGINA DE DETALHES DO POST SEJA REVALIDADA IMEDIATAMENTE APÓS A AÇÃO DELETAR O POST, CASO EXISTA;


  return {
    error: ''
  }
}
