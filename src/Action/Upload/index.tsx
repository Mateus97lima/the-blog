'use server';


import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(formData: FormData): Promise<UploadImageActionResult> {
  const markResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return markResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return markResult({ error: 'Arquivo inválido' });
  }

      const uploadMaxSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;

  if (file.size > uploadMaxSize) {
    return markResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image/')) {
    return markResult({ error: 'Imagem inválida' });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;
  const imgServerUrlDirectory = (process.env.IMAGE_UPLOAD_DIRECTORY) || 'uploads';

  const uploadFullPath = resolve(process.cwd(), 'public', imgServerUrlDirectory);
  await mkdir(uploadFullPath, { recursive: true });

  // Converte o File para Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Salva o arquivo
  const filePath = resolve(uploadFullPath, uniqueImageName);
  await writeFile(filePath, buffer);

  // URL pública para acessar a imagem
  const imgServerUrl = (process.env.IMAGE_SERVER_URL) || 'http://localhost:3000/uploads';
  const imageUrl = `${imgServerUrl}/${uniqueImageName}`;

  return markResult({ url: imageUrl });
}
