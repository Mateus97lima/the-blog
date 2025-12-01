'use server'

import { CreateUserSchema, PublicUserDto, PublicUserSchema } from "@/LIb/user/schemas"
import { asyncDelay } from "@/utils/async-delay";
import { getZodErrorMessages } from "@/utils/get-zod-error-messagens";


type CreateUserActionState = {  // estado da ação de criação do usuário
    user: PublicUserDto;
    errors: string [],
    success: boolean
}

export async function createdUserAction(state: CreateUserActionState, formadata: FormData): Promise<CreateUserActionState> {
    if(!(formadata instanceof FormData)){
        return {
            user: state.user,// mantém o usuário atual
            errors: ['Dados inválidos'],
            success: false // falha na criação de usuário
        }



    }
    await asyncDelay(3000)
     const formObject = Object.fromEntries(formadata.entries());
     const parsedFormData = CreateUserSchema.safeParse(formObject);

     if(!parsedFormData.success){
        return {
            user: PublicUserSchema.parse(formObject), // tenta manter os dados publicos do usuário
            errors: getZodErrorMessages(parsedFormData.error.format()),
            success: false
        }
     }

     // ApiFecth para criar o usuário//

     const ApiUrl = process.env.API_URL || 'http://localhost:3001';
     

     try {
          const response = await fetch(`${ApiUrl}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedFormData.data),
     })

     const json = await response.json();

      if(!response.ok){
        console.log(json)
          return {
            user: PublicUserSchema.parse(formObject),// mantém o usuário atual
            errors: json.message || ['Erro ao criar o usuário'],
            success: false // sucesso na criação de usuário
        }
      }
    console.log(json)
        return {
            user: PublicUserSchema.parse(formObject),// mantém o usuário atual
            errors:['Sucesso ao criar o usuário'],
            success: true // sucesso na criação de usuário
        }

     } catch (e) {
        console.log(e);
             return {
            user: PublicUserSchema.parse(formObject),// mantém o usuário atual
            errors: ['Falha ao se conectar com o servidor'],
            success: false // falha na criação de usuário
        }
     }





}
