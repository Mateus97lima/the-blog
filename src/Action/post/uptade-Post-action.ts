'use server';



import { revalidateTag } from 'next/cache';
import { getZodErrorMessages } from '../../utils/get-zod-error-messagens';
import { PublicPostForApiDto, PublicPostForApiSchema, UpdatePostForApiSchemas } from '@/lib/post/schemas';
import { makeRandomString } from '../../utils/make-random-string';
import { getLoginSessionFormApi} from '@/lib/login/manage_login';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';

type UpdatePostActionState = {
  formState: PublicPostForApiDto;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {

const isAuthenticated = await getLoginSessionFormApi()

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const id = formData.get('id')?.toString() || '';

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['ID inválido'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = UpdatePostForApiSchemas.safeParse(formDataToObj);

  if(!isAuthenticated){
    return{
        formState:PublicPostForApiSchema.parse(formDataToObj),
        errors:['Faça seu login em outra aba antes de salvar.']
    }
}

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: PublicPostForApiSchema.parse(formDataToObj),
    };
  }

  const newPost = zodParsedObj.data;

   const updatePostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/me/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if(!updatePostResponse.success) {
    return {
        formState: PublicPostForApiSchema.parse(formDataToObj),
        errors: updatePostResponse.errors,
    };
  }

  const post = updatePostResponse.data;

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    formState: PublicPostForApiSchema.parse(post),
    errors: [],
    success: makeRandomString(),
  };


}


