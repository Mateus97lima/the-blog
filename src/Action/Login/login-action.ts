'use server';




import { createLoginSessionFromApi } from '@/lib/login/manage_login';
import { loginSchema } from '@/lib/login/schemas';  
import { apiRequest } from '@/utils/api-request';
import { asyncDelay } from '@/utils/async-delay';
import { getZodErrorMessages } from '@/utils/get-zod-error-messagens';
import { redirect } from 'next/navigation'



type LoginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(state: LoginActionState, formData: FormData) {

  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    console.log('🚫 Login blocked by ALLOW_LOGIN');
    return {
      email: '',
      errors: ['Login not allowed'],
    };
  }

  await asyncDelay(2000); // Reduzi para 2s para testes

  if(!(formData instanceof FormData)){
    return {
        email: '',
        errors: ['Dados do formulários inválidos'],
    }
}

  // validar//
   const formObject = Object.fromEntries(formData.entries());
   const formEmail = formObject?.email?.toString() || '';
       const parsedFormData = loginSchema.safeParse(formObject);

       if(!parsedFormData.success){
          return {
              email: formEmail, // tenta manter os dados publicos do usuário
              errors: getZodErrorMessages(parsedFormData.error.format()),

          }
       }

 // fetch para verificar o login //
      const loginResponse = await apiRequest<{accessToken: string}>('/auth/login', {  // faz a requisição para criar o usuário//
         method: 'POST',
         headers: {
             'content-type' : 'application/json'
      },
        body: JSON.stringify(parsedFormData.data)


 });

 if(!loginResponse.success){
     return {
         email: formEmail, // tenta manter os dados publicos do usuário//
         errors: loginResponse.errors,

     }
 }

 console.log(loginResponse.data);

  await createLoginSessionFromApi(loginResponse.data.accessToken);
  redirect('/admin/post');

}
