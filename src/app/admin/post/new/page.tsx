import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";


export const dynamic = 'force-dynamic';

export default async function AdminNewPage() {
  return (
    <form action='' className="mb-16">
    <div className='flex flex-col gap-5' >
      <InputText labeltext="Nome"  id="Nome" placeholder="Digite seu  nome"/>
      <InputText labeltext="Sobrenome"  id="sobrenome" placeholder="Digite seu Sobrenome" />
      <InputText labeltext="Sobrenome"  id="sobrenome" placeholder="Digite seu Sobrenome" type="password"/>
      <InputCheckbox labeltext="Sobrenome"/>
      <InputText labeltext="Sobrenome"  id="sobrenome" placeholder="Digite seu Sobrenome" readOnly/>
      <InputText labeltext="Sobrenome"  id="sobrenome" placeholder="Digite seu Sobrenome" readOnly/>
      <InputText labeltext="Sobrenome"  id="sobrenome" placeholder="Digite seu Sobrenome" defaultValue='ola mundo' readOnly/>
      <div className="mt-4 py-4 px-6 shadow-2xl">
        <button type="submit" className="text-2xl text-orange-600 transition hover:text-orange-500">Envia</button>
      </div>
    </div>
    </form>
  );
}
