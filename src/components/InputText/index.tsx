import clsx from "clsx";
import { useId } from "react";

type InputTextProps ={
    labeltext:string;
} & React.ComponentProps<'input'>

export function InputText({labeltext ='', ...props}:InputTextProps){

    const id = useId();

return(
    <div className="flex flex-col gap-8">
        {labeltext && <label  htmlFor={id} className="text-sm" >{labeltext}</label>}
        <input {...props} id={id} className={clsx( 'text-base/tight bg-white outline-0','ring-2 ring-slate-400 rounded','py-2 px-5 transition focus:ring-orange-500 placeholder:text-slate-500','disabled:bg-orange-400 disabled:placeholder:text-slate-600','read-only:bg-slate-100' ,props.className,)}/>
    </div>
)
}
