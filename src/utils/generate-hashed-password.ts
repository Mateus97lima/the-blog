import { hashPassword } from "@/lib/login/manage_login";

(async () => {
  const minhaSenha = ''; // SUA SENHA AQUI
  const hashDaSuaSenhaEmBase64 = await hashPassword(minhaSenha);

  console.log('=== HASH GERADO ===');
  console.log('Senha:', minhaSenha);
  console.log('Hash Base64:', hashDaSuaSenhaEmBase64);
  console.log('===================');
})();


