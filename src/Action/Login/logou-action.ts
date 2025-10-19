import { deleteLoginSession } from "@/lib/login/manage_login";
import { asyncDelay } from "../../utils/async-delay";
import { redirect } from "next/navigation";


export async function logouAction(){
    await asyncDelay(3000)
    await deleteLoginSession();
    redirect('/')
}
