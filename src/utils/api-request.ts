


type ApiRequestError = { // resposta de erro
    errors: string[];
    success: false;
    status: number;
}

type ApiRequestSuccess<T> = {  // resposta de sucesso genérica//
    data: T;
    success: true;
    status: number;
}

export type ApiRequestResponse<T> = ApiRequestError | ApiRequestSuccess<T>; // resposta de requisição para API//

 // ApiFecth para criar o usuário//

  export const ApiUrl = process.env.API_URL || 'http://localhost:3001';

export async function apiRequest <T>(path: string, options?: RequestInit): Promise<ApiRequestResponse<T>> {  // função para fazer requisições para Api//

    const fullUrl = `${ApiUrl}${path}`;

    // validação da url para evitar error//
    try {
        const response = await fetch(fullUrl, options);
        const json = await response.json().catch(() => null); // tenta parsear o json da resposta //

        if(!response.ok){

          const errors = Array.isArray(json?.message) ? json.message : [json?.message || 'Erro inesperado']; // extrai as mensagens de erro e garante que seja um array//
            return {
                errors,
                success: false,
                status: response.status
            };

        }

               return {
                data: json,
                success: true,
                status: response.status
            };

    } catch (error) {
        console.log(error);
        return {
            errors:['Erro de rede ou URL inválida'],
            success: false,
            status: 500,
        }
    }
}
