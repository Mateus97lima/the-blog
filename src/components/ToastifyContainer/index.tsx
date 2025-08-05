'use client'

import { Bounce, ToastContainer } from "react-toastify";

type ToastyContainerProps={
    className?:string
}


export function ToastyContainer ({className}:ToastyContainerProps){
    return  (
        <ToastContainer
position='top-center'
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={true}
rtl={false}
pauseOnFocusLoss
pauseOnHover
theme="light"
transition={Bounce}
className={className}
 />
    )
}
