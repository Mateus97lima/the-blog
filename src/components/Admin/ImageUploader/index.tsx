'use client'

import { uploadImageAction } from "@/Action/Upload"
import { Button } from "@/components/Button"
import { IMAGE_UPLOADER_MAX_SIZE } from "@/lib/post/queries/constants"
import { ImagesIcon } from "lucide-react"
import { useRef, useTransition } from "react"
import { toast } from "react-toastify"



export function ImageUploader(){

const fileInputRef = useRef<HTMLInputElement>(null)
const [isUploader, startTransition ] = useTransition()

function handleClick (){
    toast.dismiss(  )
    if(!fileInputRef.current) return;

    return fileInputRef.current.click()

}

function handleCharge(){
    if(!fileInputRef.current)return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0]

    if(!file )return

    if(file.size > IMAGE_UPLOADER_MAX_SIZE) {
const readbleMaxsize = IMAGE_UPLOADER_MAX_SIZE / 1024;

   toast.error(`Imagem muito Grande MAX ${readbleMaxsize}KB.`);

    fileInput.value = '';
    return;
    }
 const formData = new FormData()
 formData.append('file',file);

 startTransition(async() => {
 const result = await uploadImageAction();

  console.log(result)
 });


 console.log(formData.get('file'))

 fileInput.value = '';
}




    return(
        <div className="flex flex-col gap-2 py-4">
  <Button onClick={handleClick} type="button" className="self-start">
      <ImagesIcon/>
    Enviar uma imagem

  </Button>


    <input onChange={handleCharge} ref={fileInputRef} className="hidden" type="file" name="file" accept="image/*" />
        </div>
    )
}
