'use client';

import clsx from 'clsx';
import { CircleXIcon,  FileType2Icon, HouseIcon, MenuIcon, PlugIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function MenuAdmin() {
  const [isOpen, setIsOnp] = useState(false);
  const pathaname = usePathname()

  useEffect(()=>{
    setIsOnp(false)
  },[pathaname])

  const navClasses = clsx(
    'bg-slate-900 text-slate-100 rounded-lg',
    'flex flex-col  mb-8',
    'sm:flex-row sm:flex-wrap',
    !isOpen && 'h-10',
    !isOpen && 'overflow-hidden',
    'sm:overflow-visible sm:h-auto'
  );
  const linkClasses = clsx(
    '[&>svg]:w-[16px] [&>svg]:h-[16px] px-4',
    'flex items-center justify-start gap-2',
    'transition hover:bg-slate-800 rounded-lg',
    'h-10',
    'shrink-0 cursor-pointer',
  );

  const openClosseBtnClasses = clsx(linkClasses, linkClasses,
    'text-blue-200 italic',
    'sm:hidden',)
  return (
    <nav className={navClasses}>

   <button onClick={()=> setIsOnp(s=> !s)} className={openClosseBtnClasses} >
    {!isOpen && (<>
      <MenuIcon />
        Menu
    </>)}

    {!isOpen && (<>
   <CircleXIcon/>
   fechar

    </>)}
   </button>

      <a className={linkClasses} href='/' target='_blank'>
        <HouseIcon />
        Home
      </a>

      <Link className={linkClasses} href='/admin/post'>
        <FileType2Icon />
        Posts
      </Link>

      <Link className={linkClasses} href='/admin/post'>
        <PlugIcon/>
        Criar Post
      </Link>




    </nav>
  );
}
