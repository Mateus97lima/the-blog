'use server'

import {  revalidateTag } from "next/cache"

export async function revalidateExempleActio(formData:FormData){
    const path = formData.get('path') || ''


    console.log('ola path',path)

    revalidateTag('posts')
    revalidateTag('post-rotina-matinal-de-pessoas-altamente-eficazes')//single//
}
