'use client';

import { InputText } from '@/components/InputText';
import clsx from 'clsx';
import { UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../Button';
import { useActionState, useEffect } from 'react';
import { createdUserAction } from '@/Action/user/created-user-action';
import { PublicUserSchema } from '@/lib/user/schemas';
import { toast } from 'react-toastify';
import { HoneypotInput } from '../HoneypotInput';

export function CreateUserForm() {

    const [state, action, isPending] = useActionState(createdUserAction, {
        user: PublicUserSchema.parse({}),
        errors: [],
        success: false,
    });

    useEffect(()=> { // ele esta ouvindo mudanças no estado e está lançado erros/
        toast.dismiss();
        if(state.errors.length > 0){ // ele esta pegando os erros do estado//
            state.errors.forEach((error)=> toast.error(error))// para cada error que tiver no estado ele vai lançar um toast de erro//

        }
    }, [state])

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-md mt-16 mb-32 mx-auto','shadow-lg rounded-lg p-10',
      )}

    >

      <form action={action} className='flex-1 flex flex-col gap-6'>
        <h1 className='text-2xl font-bold mb-5 text-white font-sans'>Criar Conta</h1>
        <InputText
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Seu nome'
          disabled={isPending}
          defaultValue={state.user.name}
          required
        />
        <InputText
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Seu e-mail'
          disabled={isPending}
          defaultValue={state.user.email}
          required
        />
        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Sua senha'
          disabled={isPending}
          required
        />
        <InputText
          type='password'
          name='password2'
          labelText='Repetir senha'
          placeholder='Sua senha novamente'
          disabled={isPending}
          required
        />

        <HoneypotInput/>

        <Button disabled={isPending} type='submit' className='mt-4'>
          <UserRoundIcon />
          {/* mostra o texto dependendo se está já tem login ou não */}
          {!isPending ? 'Criar conta' : 'Criado...'}

        </Button>

        <p className='text-sm/tight text-slate-500 mt-4 hover:text-blue-300 transition'>
          <Link href='/login'>Já tem conta? Entrar</Link>
        </p>
      </form>
    </div>
  );
}
