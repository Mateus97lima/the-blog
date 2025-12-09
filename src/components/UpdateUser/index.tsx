import { getPublicUserFromApi } from "@/lib/user/Api/get-user";
import { UpdateUserForm } from "../Admin/UpdateUserForm";
import ErrorMessage from "../ErrorMessage";


export async function UpdateUser () {
    const user = await getPublicUserFromApi();

    if(!user) {
        return (
            <ErrorMessage contentTitle="🫣"
            content= 'você precisa fazer login'
            />
        )
    }

    return <UpdateUserForm user={user}/>
}
