'use server'

import { CreateUserSchema, PublicUserDto, PublicUserSchema } from "@/lib/user/schemas"
import { apiRequest } from "@/utils/api-request";
import { asyncDelay } from "@/utils/async-delay";
import { getZodErrorMessages } from "@/utils/get-zod-error-messagens";
import { redirect } from "next/navigation";



type CreateUserActionState = {  // estado da ação de criação do usuário
    user: PublicUserDto;
    errors: string [],
    success: boolean
}

export async function createdUserAction(state: CreateUserActionState, formdata: FormData): Promise<CreateUserActionState> {
    if(!(formdata instanceof FormData)){
        return {
            user: state.user,// mantém o usuário atual
            errors: ['Dados inválidos'],
            success: false // falha na criação de usuário
        }



    }
    await asyncDelay(3000)
     const formObject = Object.fromEntries(formdata.entries());
     const parsedFormData = CreateUserSchema.safeParse(formObject);

     if(!parsedFormData.success){
        return {
            user: PublicUserSchema.parse(formObject), // tenta manter os dados publicos do usuário
            errors: getZodErrorMessages(parsedFormData.error.format()),
            success: false
        }
     }

     const createResponse = await apiRequest<PublicUserDto>('/user', {  // faz a requisição para criar o usuário//
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
     },
       body: JSON.stringify(parsedFormData.data)


});

if(!createResponse.success){
    return {
        user: PublicUserSchema.parse(formObject), // tenta manter os dados atuais do usuário//
        errors: createResponse.errors,
        success: false
    }
}

redirect('/login?created=1');
}
