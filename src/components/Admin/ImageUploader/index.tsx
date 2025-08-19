'use client';

import { uploadImageAction } from '@/Action/Upload';
import { Button } from '@/components/Button';
import { IMAGE_UPLOADER_MAX_SIZE } from '@/lib/post/queries/constants';
import { ImagesIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploader, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState('');

  function handleClick() {
    toast.dismiss();
    if (!fileInputRef.current) {
        setImgUrl('');
        return;
    }

    return fileInputRef.current.click();
  }

  function handleCharge() {
    if (!fileInputRef.current) {
      setImgUrl('');
        return;

    };

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
     setImgUrl('');
        return;
    }

    if (file.size > IMAGE_UPLOADER_MAX_SIZE) {
      const readbleMaxsize = IMAGE_UPLOADER_MAX_SIZE / 1024;

      toast.error(`Imagem muito Grande MAX ${readbleMaxsize}KB.`);

      fileInput.value = '';
      setImgUrl('');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);


      if (result.error) {
        toast.error(result.error);
        fileInput.value = '';
        setImgUrl('');

        return;
      }

      setImgUrl(result.url);

      //TODO: continua depois
      toast.success('Imagem enviada');
    });

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-2 py-4'>
      <Button
        onClick={handleClick}
        disabled={isUploader}
        type='button'
        className='self-start'
      >
        <ImagesIcon />
        Enviar uma imagem
      </Button>
      {!!imgUrl && (
        <div className='flex flex-col gap-4'>
          <p>
            <b>URL:</b>
            {imgUrl}
          </p>
          {/*eslint-disable-next-line */}
          <img className='rounded-lg' src={imgUrl} />
        </div>
      )}

      <input
        onChange={handleCharge}
        disabled={isUploader}
        ref={fileInputRef}
        className='hidden'
        type='file'
        name='file'
        accept='image/*'
      />
    </div>
  );
}
