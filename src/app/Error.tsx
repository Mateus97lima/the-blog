'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { useEffect } from 'react';

type RootErrorProps = {
    error:Error;
    reset:() => void
}


export default function RootError({error,}:RootErrorProps) {
    useEffect(()=>{
         console.log('error')
    },[error])
  return (
    <>
    <ErrorMessage pageTitle='Error no server' content='ocorreu um erro em nosso server' contentTitle='501'/>

    </>
  );
}
