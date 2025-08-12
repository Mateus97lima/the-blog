'use client';


import { Button } from "@/components/Button";
import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";

export function ManagePostForm(){

    const [contentValue ,setContentValue] = useState('')

    return(
          <form action='' className="mb-16">
    <div className='flex flex-col gap-6' >

      <InputText labeltext="Nome"  id="Nome" placeholder="Digite seu  nome"/>
      <InputText labeltext="Sobrenome"  id="sobrenome" placeholder="Digite seu Sobrenome" />
       <ImageUploader/>
      <InputText labeltext="Sobrenome"  id="sobrenome" placeholder="Digite seu Sobrenome" type="password"/>
      <InputCheckbox labeltext="Sobrenome"/>
      <InputText labeltext="Sobrenome"  id="sobrenome" placeholder="Digite seu Sobrenome" readOnly/>
      <InputText labeltext="Sobrenome"  id="sobrenome" placeholder="Digite seu Sobrenome" readOnly/>
      <InputText labeltext="Sobrenome"  id="sobrenome" placeholder="Digite seu Sobrenome" defaultValue='ola mundo' readOnly/>
      <MarkdownEditor labelText="Contéudo" disabled={false} textAreaName="Content" value={contentValue} setValue={setContentValue} />
      <div className="mt-4 py-4 px-6 ">
        <Button type="submit" className="text-2xl  ">Enviar</Button>
      </div>
    </div>
    </form>
    )
}
