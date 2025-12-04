'use server';


import { getLoginSessionFormApi} from "@/lib/login/manage_login";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(formData: FormData): Promise<UploadImageActionResult> {
  const makResult = ({ url = '', error = '' }) => ({ url, error });

  const isAuthenticated = await getLoginSessionFormApi()

    if(!isAuthenticated){
    return makResult({error:'faça login novamente'})
}

  if (!(formData instanceof FormData)) {
    return makResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makResult({ error: 'Arquivo inválido' });
  }

      const uploadMaxSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;

  if (file.size > uploadMaxSize) {
    return makResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image/')) {
    return makResult({ error: 'Imagem inválida' });
  }

 const uploadResponse = await authenticatedApiRequest<{ url: string }>(
    `/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  if(!uploadResponse.success) {
    return makResult({ error: uploadResponse.errors[0]})
  }

  const url = `${process.env.IMAGE_SERVER_URL}${uploadResponse.data.url}`;

  return makResult({ url })


}
