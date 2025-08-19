'use server';

import { IMAGE_SERVER_URL, IMAGE_UPLOAD_DIRECTORY, IMAGE_UPLOADER_MAX_SIZE } from "@/lib/post/queries/constants";
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

  if (file.size > IMAGE_UPLOADER_MAX_SIZE) {
    return markResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image/')) {
    return markResult({ error: 'Imagem inválida' });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadFullPath = resolve(process.cwd(), 'public', IMAGE_UPLOAD_DIRECTORY);
  await mkdir(uploadFullPath, { recursive: true });

  // Converte o File para Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Salva o arquivo
  const filePath = resolve(uploadFullPath, uniqueImageName);
  await writeFile(filePath, buffer);

  // URL pública para acessar a imagem
  const imageUrl = `${IMAGE_SERVER_URL}/${uniqueImageName}`;

  return markResult({ url: imageUrl });
}
