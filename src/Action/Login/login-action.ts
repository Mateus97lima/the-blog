'use server';

import { createLoginSession, verifyPassword } from '@/lib/login/manage_login';
import { asyncDelay } from '@/utils/async-delay';
import { redirect } from 'next/navigation';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  // === DEBUG - ADICIONE ESTAS LINHAS ===
  console.log('=== DEBUG LOGIN ACTION ===');
  console.log('ALLOW_LOGIN:', process.env.ALLOW_LOGIN);
  console.log('LOGIN_USER:', process.env.LOGIN_USER);
  console.log('LOGIN_PASS exists:', !!process.env.LOGIN_PASS);
  console.log('LOGIN_PASS length:', process.env.LOGIN_PASS?.length);
  // =====================================

  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  // === DEBUG ===
  console.log('Allow login result:', allowLogin);
  // =============

  if (!allowLogin) {
    console.log('🚫 Login blocked by ALLOW_LOGIN');
    return {
      username: '',
      error: 'Login not allowed',
    };
  }

  await asyncDelay(2000); // Reduzi para 2s para testes

  // Dados que o usuário digitou no form
  const username = formData.get('username')?.toString().trim() || '';
  const password = formData.get('password')?.toString().trim() || '';

  // === DEBUG ===
  console.log('Username from form:', username);
  console.log('Password from form:', password);
  // =============

  if (!username || !password) {
    return {
      username,
      error: 'Digite o usuário e a senha',
    };
  }

  // Aqui eu checaria se o usuário existe na base de dados
  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS || '',
  );

  // === DEBUG ===
  console.log('isUsernameValid:', isUsernameValid);
  console.log('isPasswordValid:', isPasswordValid);
  // =============

  if (!isUsernameValid || !isPasswordValid) {
    console.log('❌ Invalid credentials');
    return {
      username,
      error: 'Usuário ou senha inválidos',
    };
  }

  console.log('✅ Login successful! Creating session...');
  await createLoginSession(username);
  redirect('/admin/post');
}
