'use client';

import { deletePostAction } from '@/Action/post/delete-post-action';
import { Dialog } from '@/components/Dialog';

import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';

import { useState, useTransition } from 'react';

type adminButtonDeleteProps = {
  id: string;
  title: string;

};

export function AdminButtonDelete({ id, title }: adminButtonDeleteProps) {
  const [isPending, startTransition] = useTransition();
const [showDialog, setShowDialog] = useState(false)

   function handleClick() {
setShowDialog(true)

//
  }

  function handleConfirm (){
startTransition(async () => {
     const result = await deletePostAction(id);
       alert(` o result e : ${result}`);
     });
     setShowDialog(false)
  }
  return (
    <>
    <button
      aria-label={`Apagar post: ${title}`}
      title={`Apagar post: ${title}`}
      className={clsx(
        'py-3 px-3 cursor-pointer text-red-500 hover:scale-125 hover:text-red-900  transition',
        'disabled:text-slate-600 cursor-not-allowed',
      )}
      onClick={handleClick}
      disabled={isPending}
    >
      <Trash2Icon />
    </button>
    {showDialog && <Dialog isVisible={showDialog} title='apagar post?' content={`tem certeza que deseja apagar o post: ${title}`} onCancel={()=> setShowDialog(false)} onConfirm={handleConfirm} disabled={ isPending}/>}
    </>
  );
}
