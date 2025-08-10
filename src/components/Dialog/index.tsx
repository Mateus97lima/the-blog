

import clsx from 'clsx';
import { Button } from '../Button';

type DialogProps = {
    isVisible?:boolean;
    title:string,
    content:React.ReactNode
     onConfirm:()=>void;
     onCancel:()=> void;
     disabled:boolean

}

export function Dialog({ isVisible = false,title,content,onCancel,onConfirm,disabled }:DialogProps) {
    if(!isVisible)  return null;

    function handlCancel (){
        if(disabled) return

        onCancel();
    }

  return (
    <div
      className={clsx(
        'fixed z-50 bg-black/50 inset-0 backdrop-blur-[0.2rem]  flex items-center justify-center',
      )}
    onClick={handlCancel}>
      <div
        className={clsx(
          'bg-slate-200 p-6 rounded-lg max-w-3xl mx-6',
          'flex flex-col gap-6 shadow-lg shadow-black/20 text-center',
        )}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
       onClick={e => e.stopPropagation()}>
        <h3 id='dialog-title' className='text-center text-2xl font-extrabold'>
          {title}
        </h3>
        <div id='dialog-description' className='text-left'>
         {content}
        </div>
        <div className='flex items-center justify-around'>
          <Button variant='ghost'
            autoFocus
            onClick={handlCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button variant='default'
            autoFocus
            onClick={onConfirm}
            disabled={disabled}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
