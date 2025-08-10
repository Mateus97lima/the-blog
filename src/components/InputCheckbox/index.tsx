import clsx from "clsx";
import { useId } from "react";

type InputCheckboxProps ={
    labeltext:string;
    type?:'Checkbox'
} & React.ComponentProps<'input'>

export function InputCheckbox({labeltext ='', type = 'Checkbox',...props}:InputCheckboxProps){

    const id = useId();

return(
    <div className="flex items-center  gap-3">

       <input {...props} id={id} type={type} className={clsx('w-5 h-5 outline-none focus:ring-2 focus:ring-orange-500',props.className,)}/>

        {labeltext && <label  htmlFor={id} className="text-sm/normal" >{labeltext}</label>}

    </div>
)
}
