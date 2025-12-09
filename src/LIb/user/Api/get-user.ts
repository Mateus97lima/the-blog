import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { PublicUserDto, PublicUserSchema } from "../schemas";


export async function getPublicUserFromApi () {
    const useResponse = await authenticatedApiRequest<PublicUserDto>(
        `/user/me`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

    if(!useResponse.success) {
        return undefined
    }

    return PublicUserSchema.parse(useResponse.data)
}
