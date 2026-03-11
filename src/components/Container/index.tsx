import React from "react"

type ContainerProps ={
    children:React.ReactNode;
}

export function Container ({children}: ContainerProps){
return(
    <div className='text-slate-900 bg-slate-600 min-h-screen  bg-gradient-to-b to-fuchsia-100'>

        <div className='max-w-screen-lg mx-auto px-8'>{children} </div>
        </div>
)
}
