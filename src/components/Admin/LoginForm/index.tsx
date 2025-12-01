'use client';

import { loginAction } from "@/Action/Login/login-action";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import clsx from "clsx";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";





export  function LoginForm() {
  const initialState = { username: "", error: "" };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.error) {
      toast.dismiss();
      toast.error(state.error);
      console.error(state.error);
    }
  }, [state]);

  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "text-center max-w-sm mt-18 mb-32 mx-auto"
      )}
    >
      <form action={action} className="flex-1 flex flex-col gap-6 ">
        <InputText
          type="text"
          name="username"
          labelText="Usuário"
          placeholder="Seu usuário"
          defaultValue={state.username}
          disabled={isPending}
        />

        <InputText
          type="password"
          name="password"
          labelText="Senha"
          placeholder="Sua senha"
          disabled={isPending}
        />

        <Button disabled={isPending} type="submit" className="mt-4 w-full">
          <LogInIcon />
          Entrar
        </Button>

        <p className='text-sm/tight'>
          <Link href='/user/new'>Criar minha conta</Link>
        </p>

        {!!state.error && (
          <p className="text-red-600 text-sm">{state.error}</p>
        )}
      </form>
    </div>
  );
}
