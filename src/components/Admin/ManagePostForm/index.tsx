'use client';

import { Button } from '@/components/Button';
import { Inputcheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useActionState } from 'react';
import { useState } from 'react';
import { ImageUploader } from '../ImageUploader';

import { makePartialPublicPost, publicPost } from '@/dto/post/dto';
import { createPostAction } from '@/Action/post/create-post-action';

type ManagePostFormProps = {
  publicPost?: publicPost;
}

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };

  const [state, action, islanding] = useActionState(createPostAction, initialState);
  const { formState } = state;

  const [contentValue, setContentValue] = useState(formState.content || '');

  return (
    <form action={action} className="mb-16">
      <div className="flex flex-col gap-6">
        <InputText
          labeltext="ID"
          name="id"
          placeholder="ID gerado automaticamente"
          type="text"
          defaultValue={formState.id}
          readOnly

        />
        

        <InputText
          labeltext="Slug"
          name="slug"
          placeholder="Slug gerado automaticamente"
          type="text"
          defaultValue={formState.slug}
          readOnly
        />

        <InputText
          labeltext="Autor"
          name="author"
          placeholder="Digite o nome do autor"
          type="text"
          defaultValue={formState.author}
        />

        <InputText
          labeltext="Título"
          name="title"
          placeholder="Digite o título"
          type="text"
          defaultValue={formState.title}
        />

        <InputText
          labeltext="Excerto"
          name="excerpt"
          placeholder="Digite o resumo"
          type="text"
          defaultValue={formState.excerpt}
        />

        <MarkdownEditor
          labelText="Conteúdo"
          disabled={false}
          textAreaName="content"
          value={contentValue}
          setValue={setContentValue}
        />

        <ImageUploader />

        <InputText
          labeltext="URL da imagem de capa"
          name="coverImageUrl"
          placeholder="Digite a URL da imagem"
          type="text"
          defaultValue={formState.coverImageUrl}
        />

        <Inputcheckbox
          labeltext="Publicar?"
          name="published"
          type='Checkbox'
          defaultChecked={formState.published}
        />

        <div className="mt-4 py-4 px-6">
          <Button type="submit" className="text-2xl">
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
