
import 'server-only';
import { getLoginSessionFormApi } from '@/lib/login/manage_login';
import { apiRequest, ApiRequestResponse } from './api-request';

export async function authenticatedApiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiRequestResponse<T>> {   // função para fazer a requisição autenticada//
  const jwtToken = await getLoginSessionFormApi(); // obtém o token JWT do login //

  if (!jwtToken) {
    return {
      success: false,
      errors: ['Usuário não autenticado'],
      status: 401,
    };
  }

  const headers = {
    ...options?.headers, // mantém os headers existentes,se houver//
    Authorization: `Bearer ${jwtToken}`,
  };

  return apiRequest<T>(path, {
    ...options,
    headers,
  });
}
