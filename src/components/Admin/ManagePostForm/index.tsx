'use client';

import { Button } from '@/components/Button';
import { Inputcheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useActionState, useEffect } from 'react';
import { useState } from 'react';
import { ImageUploader } from '../ImageUploader';

import { makePartialPublicPost, publicPost } from '@/dto/post/dto';
import { createPostAction } from '@/Action/post/create-post-action';
import { toast } from 'react-toastify';
import { updatePostAction } from '@/Action/post/uptade-Post-action';
import { useRouter, useSearchParams } from 'next/navigation';

type ManagePostUpdateFormProps = {
    mode:'update';
  publicPost?: publicPost;
};

type ManagePostFormCreateProps = {
    mode: 'create';

};

type ManagePostFormProps = ManagePostUpdateFormProps | ManagePostFormCreateProps


export function ManagePostForm(props: ManagePostFormProps) {

     const { mode } = props;
     const searchParams = useSearchParams()
     const created = searchParams.get('created')
     const router = useRouter()

  let publicPost;
  if (mode === 'update') {
    publicPost = props.publicPost;
  }

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };



  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );
  const { formState } = state;

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);

   useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post atualizado com sucesso!');
    }
  }, [state.success]);

  useEffect(() => {
    if (created === '1') {
      toast.dismiss();
      toast.success('Post criado com sucesso!');
      const url = new URL(window.location.href)
      url.searchParams.delete('created')
      router.replace(url.toString())
    }
  }, [created,router]);


  const [contentValue, setContentValue] = useState(formState.content || '');

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='id'
          placeholder='ID gerado automaticamente'
          type='text'
          defaultValue={formState.id}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerado automaticamente'
          type='text'
            disabled={isPending}
          defaultValue={formState.slug}
          readOnly
        />

        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          type='text'
            disabled={isPending}
          defaultValue={formState.author}
        />

        <InputText
          labelText='Título'
          name='title'
          placeholder='Digite o título'
          type='text'
            disabled={isPending}
          defaultValue={formState.title}
        />

        <InputText
          labelText='Excerto'
          name='excerpt'
          placeholder='Digite o resumo'
          type='text'
            disabled={isPending}
          defaultValue={formState.excerpt}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          disabled={isPending}
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
        />

        <ImageUploader disabled={isPending} />

        <InputText
          labelText='URL da imagem de capa'
          name='coverImageUrl'
          placeholder='Digite a URL da imagem'
          type='text'
          defaultValue={formState.coverImageUrl}
            disabled={isPending}
        />

        <Inputcheckbox
          labeltext='Publicar?'
          name='published'
          type='Checkbox'
          defaultChecked={formState.published}
            disabled={isPending}
        />

        <div className='mt-4 py-4 px-6'>
          <Button type='submit' className='text-2xl'   disabled={isPending}>
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
