import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

export function LoginInic() {
  return (
    <div className='flex justify-end items-center mb-14  top-6  right-0 p-4'>
      <Link
        href='/admin/user'
        className='flex absolute items-center gap-1 text-sm font-medium bg-slate-500  text-slate-100 justify-center top-30 right-60rem shadow-neutral-600 rounded-lg px-4 py-2 transition hover:shadow-neutral-400/50 hover:shadow-lg'
      >
        <LogInIcon size={20} />
        <span>Login</span>
      </Link>
    </div>
  );
}
