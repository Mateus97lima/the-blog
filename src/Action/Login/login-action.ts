import { verifyPassword } from '@/lib/login/manage_login';
import { asyncDelay } from '../../../utils/async-delay';

type loginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: loginActionState, formdata: FormData) {
  await asyncDelay(5000);
  if (!(formdata instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }
  // Dados do usúario digitou no form
  const username = formdata.get('username')?.toString().trim() || '';
  const password = formdata.get('password')?.toString().trim() || '';

  if (!username || !password) {
    return {
      username: '',
      error: 'Digite o usuário e a senha',
    };
  }

  //verificar se o usúario existe na base de dados //
  const isUserNameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(password, process.env.LOGIN_PASS || '',)

  if(!isUserNameValid || !isPasswordValid){
    return{
        username,
        error:'Usuário ou Senha inválidos',
    }
  }
// TODO: abaixo
  return {
    username: '',
    error: 'USUÁRIO LOGADO COM SUCESSO',
  };
}
